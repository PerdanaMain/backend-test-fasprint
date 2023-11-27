/*
  Warnings:

  - You are about to drop the column `id_kategori` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the column `id_status` on the `produk` table. All the data in the column will be lost.
  - Added the required column `kategoriId` to the `Produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Produk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_id_kategori_fkey`;

-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `Produk_id_status_fkey`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `id_kategori`,
    DROP COLUMN `id_status`,
    ADD COLUMN `kategoriId` INTEGER NOT NULL,
    ADD COLUMN `statusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_kategoriId_fkey` FOREIGN KEY (`kategoriId`) REFERENCES `Kategori`(`id_kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD CONSTRAINT `Produk_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `Status`(`id_status`) ON DELETE RESTRICT ON UPDATE CASCADE;
