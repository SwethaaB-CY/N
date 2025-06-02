/*
  Warnings:

  - You are about to drop the column `timeTaken` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "timeTaken",
ADD COLUMN     "time" INTEGER;
