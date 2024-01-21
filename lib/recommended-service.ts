import { db } from '@/lib/db';
import { getSelf } from './auth-service';

export const getRecommended = async () => {
	let userId;

	try {
		const self = await getSelf();
		userId = self.id;
	} catch (error) {
		userId = null;
	}

	let users = [];

	if (userId) {
		users = await db.user.findMany({
			orderBy: {
				createAt: 'desc',
			},
			where: {
				NOT: {
					id: userId,
				},
			},
		});
	} else {
		users = await db.user.findMany({
			orderBy: {
				createAt: 'desc',
			},
		});
	}

	return users;
};
