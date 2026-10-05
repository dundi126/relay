import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { eventNames } from 'process';

import { db } from '@/lib/db';


export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || '';

    if (!WEBHOOK_SECRET) {
        throw new Error('CLERK_WEBHOOK_SECRET is not defined in the environment variables');
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id') || '';
    const svix_timestamp = headerPayload.get('svix-timestamp') || '';
    const svix_signature = headerPayload.get('svix-signature') || '';

    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Response('Missing required Svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        throw new Response('Invalid webhook signature', { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === 'user.created') { 
        await db.user.create({
            data: {
                externalUserId: payload.data.id,
                userName: payload.data.username,
                image_url: payload.data.profile_image_url,

            },
        } 
        )
    }

    if (eventType === 'user.updated') { 
        const currentUser = await db.user.findUnique({
            where: {
                externalUserId: payload.data.id,
            }
        })
        if (!currentUser) { 
            throw new Response('User not found', { status: 404 });
        } 

        await db.user.update({
            where: {
                externalUserId: payload.data.id,
            },
            data: {
                userName: payload.data.username,
                image_url: payload.data.profile_image_url,
            }
        })
    }



        return new Response('Webhook received', { status: 200 });

}
