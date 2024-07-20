import { db } from ".";

// export async function updateStreak(userId: string) {
//   const today = new Date();
//   const yesterday = new Date();
//   yesterday.setDate(today.getDate() - 1);

//   const latestSubmission = await db.mCQSubmission.findFirst({
//     where: { userId },
//     orderBy: { createdAt: 'desc' },
//   });

//   if (!latestSubmission) {
//     console.log('No submissions found for this user.');
//     return;
//   }

//   const streak = await db.streak.findUnique({
//     where: { userId },
//   });

//   if (!streak) {
//     await db.streak.create({
//       data: {
//         userId,
//         currentStreak: 1,
//         lastActivity: latestSubmission.createdAt,
//       },
//     });
//   } else {
//     if (latestSubmission.createdAt.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)) {
//       // Already updated today
//       return;
//     }

//     if (latestSubmission.createdAt.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)) {
//       // Continue the streak
//       await db.streak.update({
//         where: { userId },
//         data: {
//           currentStreak: streak.currentStreak + 1,
//           lastActivity: latestSubmission.createdAt,
//         },
//       });
//     } else {
//       // Streak broken
//       await db.streak.update({
//         where: { userId },
//         data: {
//           currentStreak: 0,
//           lastActivity: latestSubmission.createdAt,
//         },
//       });
//     }
//   }
// }



export async function updateStreak(userId: string) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const latestSubmission = await db.mCQSubmission.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!latestSubmission) {
    console.log('No submissions found for this user.');
    return;
  }

  const streak = await db.streak.findUnique({
    where: { userId },
  });

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
    if (latestSubmission.createdAt.toISOString().slice(0, 10) === today.toISOString().slice(0, 10)) {
      // Already updated today
      return;
    }

    if (latestSubmission.createdAt.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10)) {
      // Continue the streak
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
    } else {
      // Streak broken
      await db.streak.update({
        where: { userId },
        data: {
          currentStreak: 0,
          lastActivity: latestSubmission.createdAt,
        },
      });
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