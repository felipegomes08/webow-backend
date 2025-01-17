-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_support_id_fkey";

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "support_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_support_id_fkey" FOREIGN KEY ("support_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
