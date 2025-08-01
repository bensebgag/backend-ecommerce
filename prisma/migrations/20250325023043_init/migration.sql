/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `Clerkid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bill` DROP FOREIGN KEY `bill_userId_fkey`;

-- DropForeignKey
ALTER TABLE `chart` DROP FOREIGN KEY `chart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_userId_fkey`;

-- DropIndex
DROP INDEX `bill_userId_fkey` ON `bill`;

-- DropIndex
DROP INDEX `chart_userId_fkey` ON `chart`;

-- DropIndex
DROP INDEX `review_userId_fkey` ON `review`;

-- DropIndex
DROP INDEX `user_email_key` ON `user`;

-- AlterTable
ALTER TABLE `bill` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `chart` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `password`,
    ADD COLUMN `Clerkid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`Clerkid`);

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`Clerkid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `bill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`Clerkid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chart` ADD CONSTRAINT `chart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`Clerkid`) ON DELETE RESTRICT ON UPDATE CASCADE;
