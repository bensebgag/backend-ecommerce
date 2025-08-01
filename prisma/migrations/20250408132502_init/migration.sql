/*
  Warnings:

  - You are about to drop the column `size` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `size`;

-- CreateTable
CREATE TABLE `product_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `price` DOUBLE NULL,

    UNIQUE INDEX `product_size_productId_size_key`(`productId`, `size`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_size` ADD CONSTRAINT `product_size_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
