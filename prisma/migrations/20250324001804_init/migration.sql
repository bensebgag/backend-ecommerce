/*
  Warnings:

  - You are about to drop the column `countrate` on the `product` table. All the data in the column will be lost.
  - Made the column `size` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `countrate`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0,
    MODIFY `size` INTEGER NOT NULL;
