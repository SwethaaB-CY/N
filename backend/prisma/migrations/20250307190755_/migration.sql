/*
  Warnings:

  - You are about to drop the column `collegeName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "collegeName",
DROP COLUMN "gender",
DROP COLUMN "phoneNumber",
DROP COLUMN "profilePicture";
