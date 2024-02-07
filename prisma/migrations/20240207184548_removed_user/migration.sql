/*
  Warnings:

  - You are about to drop the column `addToUserID` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_addToUserID_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `addToUserID`;
