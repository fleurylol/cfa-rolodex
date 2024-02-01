/*
  Warnings:

  - Made the column `image` on table `Contact` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contact` MODIFY `image` VARCHAR(191) NOT NULL;
