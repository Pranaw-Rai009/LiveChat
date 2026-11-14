/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "globalRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "globalRole" "globalRole" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "userRole";
