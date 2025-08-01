/*
  Warnings:

  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `size` DROP FOREIGN KEY `size_productId_fkey`;

-- DropTable
DROP TABLE `size`;
