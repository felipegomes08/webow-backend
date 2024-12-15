/*
  Warnings:

  - You are about to drop the `request_status` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_status_id_fkey";

-- DropTable
DROP TABLE "request_status";

-- CreateTable
CREATE TABLE "transaction_status" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "transaction_status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "transaction_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
