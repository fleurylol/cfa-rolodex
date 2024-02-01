/*
  Warnings:

  - Added the required column `contactId` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Images` ADD COLUMN `contactId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
