-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_userId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- DropForeignKey
ALTER TABLE "ItemBasket" DROP CONSTRAINT "ItemBasket_basketId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_fkey";

-- AlterTable
ALTER TABLE "Basket" ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "totalPrice" SET DATA TYPE TEXT,
ALTER COLUMN "totalCount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "userId" SET DATA TYPE TEXT;
