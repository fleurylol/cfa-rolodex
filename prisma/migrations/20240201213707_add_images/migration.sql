/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_contactId_fkey`;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `image` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Images`;
