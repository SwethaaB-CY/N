/*
  Warnings:

  - You are about to drop the column `github` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `linkedIn` on the `StudentDetails` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `StudentDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentDetails" DROP COLUMN "github",
DROP COLUMN "linkedIn",
DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
