/*
  Warnings:

  - You are about to drop the column `contact` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_contact_key";

-- DropIndex
DROP INDEX "Teacher_contact_key";

-- DropIndex
DROP INDEX "User_contact_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "contact",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "contact",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contact",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
