/*
  Warnings:

  - You are about to drop the `ComponentOnProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ComponentOnProduct` DROP FOREIGN KEY `ComponentOnProduct_componentId_fkey`;

-- DropForeignKey
ALTER TABLE `ComponentOnProduct` DROP FOREIGN KEY `ComponentOnProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- AlterTable
ALTER TABLE `Category` ADD COLUMN `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Component` ADD COLUMN `brandId` INTEGER NOT NULL,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `isOptional` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `seriesId` INTEGER NOT NULL,
    ADD COLUMN `type` ENUM('MAIN', 'ADDITIONAL') NOT NULL,
    ADD COLUMN `typeId` INTEGER NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `ComponentOnProduct`;

-- DropTable
DROP TABLE `Product`;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Brand_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BusbarType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BusbarType_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Series` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `brandId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Series_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Busbar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `amperage` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `specs` JSON NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `brandId` INTEGER NOT NULL,
    `typeId` INTEGER NOT NULL,
    `seriesId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Busbar_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BusbarComponents` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BusbarComponents_AB_unique`(`A`, `B`),
    INDEX `_BusbarComponents_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Series` ADD CONSTRAINT `Series_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Busbar` ADD CONSTRAINT `Busbar_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Busbar` ADD CONSTRAINT `Busbar_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Busbar` ADD CONSTRAINT `Busbar_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `BusbarType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Busbar` ADD CONSTRAINT `Busbar_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `BusbarType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_seriesId_fkey` FOREIGN KEY (`seriesId`) REFERENCES `Series`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BusbarComponents` ADD CONSTRAINT `_BusbarComponents_A_fkey` FOREIGN KEY (`A`) REFERENCES `Busbar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BusbarComponents` ADD CONSTRAINT `_BusbarComponents_B_fkey` FOREIGN KEY (`B`) REFERENCES `Component`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
