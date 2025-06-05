-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_user_id_fkey";

-- AlterTable
ALTER TABLE "Url" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Url" ADD CONSTRAINT "Url_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
