-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `addToUserID` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_addToUserID_fkey` FOREIGN KEY (`addToUserID`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
