/*
  Warnings:

  - You are about to drop the column `affiliate_action` on the `affiliate_earnings` table. All the data in the column will be lost.
  - You are about to drop the `transaction_requests` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `action` to the `affiliate_earnings` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pixel` on the `configurations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `interface` on the `configurations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `system` on the `configurations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `pix_key` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transaction_requests" DROP CONSTRAINT "transaction_requests_status_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_requests" DROP CONSTRAINT "transaction_requests_transaction_type_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_requests" DROP CONSTRAINT "transaction_requests_user_id_fkey";

-- AlterTable
ALTER TABLE "affiliate_earnings" DROP COLUMN "affiliate_action",
ADD COLUMN     "action" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "configurations" DROP COLUMN "pixel",
ADD COLUMN     "pixel" JSONB NOT NULL,
DROP COLUMN "interface",
ADD COLUMN     "interface" JSONB NOT NULL,
DROP COLUMN "system",
ADD COLUMN     "system" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "pix_key" TEXT NOT NULL,
ADD COLUMN     "status_id" UUID NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP NOT NULL;

-- DropTable
DROP TABLE "transaction_requests";

-- CreateTable
CREATE TABLE "tickets" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "support_id" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_messages" (
    "id" UUID NOT NULL,
    "ticket_id" UUID NOT NULL,
    "sender_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticket_messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "request_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_support_id_fkey" FOREIGN KEY ("support_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_messages" ADD CONSTRAINT "ticket_messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
