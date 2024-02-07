/*
  Warnings:

  - Made the column `addToUserID` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_addToUserID_fkey`;

-- DropIndex
DROP INDEX `Comment_userId_fkey` ON `Comment`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `addToUserID` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_addToUserID_fkey` FOREIGN KEY (`addToUserID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
