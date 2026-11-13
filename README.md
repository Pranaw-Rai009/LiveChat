A Real Time Chatting App Backend - Implemented WebSockets


End Poin Urls

# USER
Register User: http://localhost:2001/api/user/register
Login: http://localhost:2001/api/session/login
Fetch All User: http://localhost:2001/api/user/fetchAllUser
Update Profile Picture: http://localhost:2001/api/user/updateProfilePicture/:userId
Update User Password: http://localhost:2001/api/user/updatePassword/:userId
Refresh Access Token: http://localhost:2001/api/session/refreshAccToken

# ROOM
Create Room: http://localhost:2001/api/room/create
Fetch All Rooms: http://localhost:2001/api/room/fetch
Fetch A Room: http://localhost:2001/api/room/fetchA/:roomId
Update Room Admin: http://localhost:2001/api/room/updateAdmin/:roomId
Delete Room: http://localhost:2001/api/room/delete/:roomId  // Not completed

# ROOM MEMBERS
List All Room Members: http://localhost:2001/api/roomMember/list/:roomId/members
Add User to Room: http://localhost:2001/api/roomMember/add/:roomId/member
Remove User From A Room: http://localhost:2001/api/roomMember/delete/:roomId/member/5


