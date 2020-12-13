
{
 function toggle(self){
  $(self).click(function(e){
      e.preventDefault();
      console.log($(self).attr('href'));
      $.ajax({
          type : 'post',
          url : $(self).attr('href'),
          success : function(data){
            let cnt = parseInt($(self).attr('data-likes'));
        if(data.data.deleted == true){
              cnt -=1;
          }
          else{
              cnt +=1;
          }
            $(self).attr('data-likes',cnt);
            $(self).text(` ${cnt} Likes`);
          },
           error : function(err){
            console.log(err);
           }
      });
  });
}
$('.toggle-like').each(function(){
    toggle(this);
 });
}