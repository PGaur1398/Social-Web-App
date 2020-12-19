{
let createComment = function(ele){
    let newComment = $(ele);
    newComment.submit(function(e){
       e.preventDefault();
       $.ajax({
           type : 'post',
           url : '/comments/create',
           data : newComment.serialize(),
           success : function(data){
               let new_comment = newCommentDom(data.data.comment);
               $('#comments-list-container').prepend(new_comment);
           },
           error : function(err){
               console.log(err,responseText);
           }

       })
    });
}
let newCommentDom = function(comment){
    return $(`<div class="bg-white p-2 fs-12">
    <div class="d-flex flex-row user-info"><img class="rounded-circle" src="https://imgur.com/NkPeQtx.jpg" width="20">
    <div class="d-flex flex-column justify-content-start ml-2">
    <span class="d-block font-weight-bold name"> ${comment.user.name}</span>
    <span class="date text-black-50">${comment.createdAt}</span></div>
    </div>
    <div class="mt-2">
    <p class = "fs-10">${comment.content}</p>
    </div>
    </div>`);
}
$('#comment-form').each(function(){
   let self = this;
   createComment(self);
});
}