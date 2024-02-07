/*
  Warnings:

  - Added the required column `userEmail` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
