-- CreateTable
CREATE TABLE "StreakDate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "StreakDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StreakDate_userId_date_key" ON "StreakDate"("userId", "date");

-- AddForeignKey
ALTER TABLE "StreakDate" ADD CONSTRAINT "StreakDate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
