A Real Time Chatting App Backend - Implemented WebSockets


End Poin Urls

# USER
Register User: POST /api/user/register 
Login: POST /api/session/login
Fetch All User: GET/api/user/
Update Profile Picture:PATCH /api/user/update/:userId/profile
Update User Password: POST/api/user/update/:accId/password
Refresh Access Token: http://localhost:2001/api/session/refreshAccToken
Delete User Ac:  http://localhost:2001/api/user/delete/:userId

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
Leave Room: http://localhost:2001/api/roomMember/leave/:roomId
Fetch All Me Joined Rooms: http://localhost:2001/api/roomMember/room
Join Room: http://localhost:2001/api/roomMember/join/:roomId/room

