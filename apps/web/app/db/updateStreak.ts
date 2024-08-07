import { db } from ".";
import { startOfDay } from 'date-fns';

export async function updateStreak(userId: string) {
  const today = startOfDay(new Date());
  const yesterday = startOfDay(new Date(today));
  yesterday.setDate(today.getDate() - 1);

  const latestSubmission = await db.mCQSubmission.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!latestSubmission) {
    return;
  }

  const streak = await db.streak.findUnique({
    where: { userId },
  });

  const latestSubmissionDate = startOfDay(latestSubmission.createdAt);

  if (!streak) {
    await db.streak.create({
      data: {
        userId,
        currentStreak: 1,
        lastActivity: latestSubmission.createdAt,
      },
    });

    await db.streakDate.create({
      data: {
        date: latestSubmission.createdAt,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } else {
    if (latestSubmissionDate.getTime() === today.getTime()) {
      await db.streak.update({
        where: { userId },
        data: {
          lastActivity: latestSubmission.createdAt,
        },
      });

      const alreadyRecordedToday = await db.streakDate.findFirst({
        where: {
          userId,
          date: today,
        },
      });

      if (!alreadyRecordedToday) {
        await db.streakDate.create({
          data: {
            date: latestSubmission.createdAt,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });
        console.log('Streak updated for today');
      } else {
        console.log('Already updated today');
      }
    } else if (latestSubmissionDate.getTime() === yesterday.getTime()) {
      await db.streak.update({
        where: { userId },
        data: {
          currentStreak: streak.currentStreak + 1,
          lastActivity: latestSubmission.createdAt,
        },
      });

      await db.streakDate.create({
        data: {
          date: latestSubmission.createdAt,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      console.log('Streak continued');
    } else {
      // Streak broken
      await db.streak.update({
        where: { userId },
        data: {
          currentStreak: 1, // Reset streak
          lastActivity: latestSubmission.createdAt,
        },
      });

      await db.streakDate.create({
        data: {
          date: latestSubmission.createdAt,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
      console.log('Streak broken and restarted');
    }
  }
}

export async function getStreak(userId: string) {
  const streak = await db.streak.findUnique({
    where: { userId },
  });
  return streak;
}

export async function getStreakDates(userId: string) {
  const streakDates = await db.streakDate.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
  });
  return streakDates;
}