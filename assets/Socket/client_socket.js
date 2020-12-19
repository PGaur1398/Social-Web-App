class chatEngine{
    constructor(name){
        this.name = name;
        this.socket = io.connect('http://localhost:5000');
        if(this.name){
            this.connectionHandler();
        }
    }
  connectionHandler(){
      let self = this;
      this.socket.on('connect',function(){
          console.log('Connection Established');
      self.socket.emit('new_user',self.name);
        let requests = $('.friend-request');
        for(let i = 0;i<requests.length;i++){
       $(requests[i]).click(function(e){
        e.preventDefault();
        self.socket.emit('friendRequest',{
            fromUser : self.name,
            toUser : $(requests[i]).attr('email')
           });
        $.ajax({
            type : 'post',
            url : $(requests[i]).attr('href'),
            success : function(data){
                $('request[i]').replaceWith(function(){
                    var link = $("<a>");
                    link.attr("href","#");
                    link.attr("type","button");
                    link.text("Pending");
                    link.prepend("<i class='fa fa-pause' aria-hidden='true'></i>")
                     link.addClass("btn btn-secondary");
                     return link;
                });
            },
             error : function(err){
              console.log(err);
             }
        });
          
       });
        }

     $('#send-message').click(function(){
         let msg = $('#chat-msg-input').val();
         if(msg != ''){ 
             self.socket.emit('send_message',{
            message : msg,
            username : self.name,
            chatroom: 'educational'
         });
        }
     });
     self.socket.on('receive_message', function(data){
        console.log('message received', data.message);


        let newMessage = $('<li>');

        let messageType = 'other-message';

        if (data.user_email == self.userEmail){
            messageType = 'self-message';
        }

        newMessage.append($('<span>', {
            'html': data.message
        }));

        newMessage.append($('<sub>', {
            'html': data.user_email
        }));

        newMessage.addClass(messageType);

        $('#chat-messages-list').append(newMessage);
    })
     
  });
}
}
