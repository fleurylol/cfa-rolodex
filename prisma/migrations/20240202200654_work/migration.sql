/*
  Warnings:

  - You are about to drop the column `imageurl` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `image` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `imageurl`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;
