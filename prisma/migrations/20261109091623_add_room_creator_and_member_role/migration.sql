/*
  Warnings:

  - Added the required column `creatorId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `RoomMember` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roomRole" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "creatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RoomMember" ADD COLUMN     "role" "roomRole" NOT NULL;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
