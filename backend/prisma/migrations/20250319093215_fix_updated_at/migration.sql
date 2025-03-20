/*
  Warnings:

  - You are about to drop the column `eventName` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Achievement` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `desiredRole` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `interestedDomain` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `resumeFile` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `selfDescription` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the `SemesterMarks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `StudentDetails` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event` to the `Achievement` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Achievement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Certification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `studentId` on table `Skill` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `branch` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `degree` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `StudentDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SemesterMarks" DROP CONSTRAINT "SemesterMarks_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_studentId_fkey";

-- DropForeignKey
ALTER TABLE "StudentDetails" DROP CONSTRAINT "StudentDetails_userId_fkey";

-- DropIndex
DROP INDEX "StudentDetails_userId_key";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "eventName",
DROP COLUMN "fileUrl",
ADD COLUMN     "event" TEXT NOT NULL,
ADD COLUMN     "file" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "fileUrl",
ADD COLUMN     "file" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "fileUrl",
ADD COLUMN     "file" TEXT,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "studentId" SET NOT NULL;

-- AlterTable
ALTER TABLE "StudentDetails" DROP COLUMN "desiredRole",
DROP COLUMN "interestedDomain",
DROP COLUMN "resumeFile",
DROP COLUMN "selfDescription",
DROP COLUMN "userId",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "degree" TEXT NOT NULL,
ADD COLUMN     "portfolioLink" TEXT,
ADD COLUMN     "resume" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "SemesterMarks";

-- CreateIndex
CREATE UNIQUE INDEX "StudentDetails_user_id_key" ON "StudentDetails"("user_id");

-- AddForeignKey
ALTER TABLE "StudentDetails" ADD CONSTRAINT "StudentDetails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
