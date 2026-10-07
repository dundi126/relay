import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { LiveBadge } from './live-badge'
import { Skeleton } from './ui/skeleton'

interface UserAvatarProps
    extends VariantProps<typeof avatarSize>{
    username: string,
    imageUrl: string,
    isLive?: boolean,
    showBadge?:boolean
    
}

interface UserAvatarSkeletonProps
    extends VariantProps<typeof avatarSize> { };

const avatarSize = cva(
    "",
    {
        variants: {
            size: {
                default: 'h-8 w-8',
                lg: 'h-14 w-14',
                xl:'h-20 w-20'
            }
        },
        defaultVariants: {
            size:"default"
        }
    }
)

export const UserAvatar = ({username,imageUrl,isLive,showBadge,size}:UserAvatarProps) => {
    
    const canShowBadge = showBadge && isLive    
    
    return (
        <div className='relative'>
            <Avatar
                className={cn(
                    isLive && 'ring-2 ring-rose-500 border border-background',
                    avatarSize({size})
                )}
            >
                <AvatarImage src={imageUrl} className={'object-cover'} />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length-1]}
                </AvatarFallback>
            </Avatar>
            {
                canShowBadge && (
                    <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2'>
                        <LiveBadge/>
                    </div>
                )
            }
            User Avatar
        </div>
    )
}

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton
            className={cn(
                'rounded-full',
                avatarSize({size})
            )}
        />
    )
}
