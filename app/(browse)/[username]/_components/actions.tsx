'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';

interface ActionsProps {
	isFollowing: boolean;
	userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
	const [isPending, startTransition] = useTransition();

	const handleFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then((data) =>
					toast.success(`Your are now following ${data.following.username}`)
				)
				.catch(() => toast.error('Failed to follow the user'));
		});
	};

	const handleunfollow = () => {
		startTransition(() => {
			onUnfollow(userId)
				.then((data) =>
					toast.success(`Your have unfollowed ${data.following.username}`)
				)
				.catch(() => toast.error('Failed to unfollow the user'));
		});
	};

	const onClick = isFollowing ? handleunfollow : handleFollow;

	return (
		<Button disabled={isPending} variant="primary" onClick={onClick}>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	);
};
