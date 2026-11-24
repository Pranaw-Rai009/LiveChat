A Real Time Chatting App Backend - Implemented WebSockets


End Poin Urls

# USER
Register User: POST /api/user/register 
Login: POST /api/session/login
Fetch All User: GET/api/user/
Update Profile Picture:PATCH /api/user/update/:userId/profile
Update User Password: POST/api/user/update/:accId/password
Refresh Access Token: POST /api/session/refreshAccToken
Delete User Ac:  http://localhost:2001/api/user/delete/:userId // not verified

# ROOM
Create Room: POST /api/room/create
Fetch A Room: GET /api/room/fetch/:roomId
Update Room Admin: http://localhost:2001/api/room/update/:roomId/admin
Delete Room: http://localhost:2001/api/room/delete/:roomId  // Not verified

# ROOM MEMBERS
List All Room Members: GET /api/roomMember/list/:roomId
Add User to Room: POST /api/roomMember/add/:roomId/member
Remove User From A Room: http://localhost:2001/api/roomMember/delete/:roomId/member/5 // Not verified
Fetch All Me Joined Rooms: GET /api/roomMember/room
Leave Room: http://localhost:2001/api/roomMember/leave/:roomId // Not verified
Join Room: POST/api/roomMember/join/:roomId

