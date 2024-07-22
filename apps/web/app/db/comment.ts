import { db } from ".";

export async function getComments (mcqId:any){
    const comments = await db.comment.findMany({
        where: { 
          mcqProblem: {
            id: mcqId,
          },
          MCQProblemId: mcqId,
        },
        include: {
          user: true,
        },
      });
    return comments;
}