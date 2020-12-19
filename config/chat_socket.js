module.exports.chatSockets = function(socketServer){
   let io = require('socket.io')(socketServer);
   var users = {};
   io.sockets.on('connection',function(socket){
      
    socket.on('disconnect',function(){
        console.log('socket Disconnected');
    });
    socket.on('new_user',function(data){
        users[data] = socket.id;
        console.log('new connection received',socket.id);
    })
    socket.on('friendRequest',(data) =>{
        console.log(data.fromUser + ' has sent a friend request to ' + data.toUser);
        io.to(users[data.toUser]).emit('newFriendRequest', {
            from: data.fromUser,
            to: data.toUser
        });
    });
    socket.on('send_message', function(data){
        io.in(data.chatroom).emit('receive_message', data);
    });

   })
}