/*
  Warnings:

  - Added the required column `userId` to the `StudentGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentGroup" ADD COLUMN     "userId" INTEGER NOT NULL;
