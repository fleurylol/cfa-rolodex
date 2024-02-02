/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageurl` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_contactId_fkey`;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `imageurl` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Image`;
