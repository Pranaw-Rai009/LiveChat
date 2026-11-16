-- CreateEnum
CREATE TYPE "globalStatus" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "globalStatus" "globalStatus" NOT NULL DEFAULT 'ENABLED';
