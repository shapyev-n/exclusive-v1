/*
  Warnings:

  - The `totalPrice` column on the `Basket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Basket" DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
