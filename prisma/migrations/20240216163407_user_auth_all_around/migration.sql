/*
  Warnings:

  - Added the required column `userEmail` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Business` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Contact` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;
