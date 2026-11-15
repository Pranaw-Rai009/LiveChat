-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_roomMemberId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_roomMemberId_fkey" FOREIGN KEY ("roomMemberId") REFERENCES "RoomMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
