import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LiveBadge } from '@/components/live-badge';

const avatarSizes = cva('', {
	variants: {
		size: {
			default: 'w-8 h-8',
			lg: 'h-14 w-14',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface userAvatarProps extends VariantProps<typeof avatarSizes> {
	username: string;
	imageUrl: string;
	isLive?: boolean;
	showBadge?: boolean;
}

export const UserAvatar = ({
	username,
	imageUrl,
	isLive,
	showBadge,
	size,
}: userAvatarProps) => {
	const canShowBadge = isLive && showBadge;

	return (
		<div className="relative">
			<Avatar
				className={cn(
					isLive && 'ring-2 ring-rose-500 border border-background',
					avatarSizes({ size })
				)}
			>
				<AvatarFallback>
					{username[0]}
					{username[username.length - 1]}
				</AvatarFallback>
				<AvatarImage src={imageUrl} className="object-cover" alt={username} />
			</Avatar>
			{canShowBadge && (
				<div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
					<LiveBadge />
				</div>
			)}
		</div>
	);
};

interface userAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: userAvatarSkeletonProps) => {
	return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />;
};
