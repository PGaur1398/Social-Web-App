{
    console.log('hellow');
    let createText = function(){
        let updateText = $('#update-form');
        updateText.submit(function(e){
            e.preventDefault();
        let aboutMe = $('#text-update').val();
           $.ajax({
               type : 'post',
               url : updateText.prop('action'),
               data : {
                   about : aboutMe,
               },
               success: function(data){
                $('#updated').text(data.data.info);
                $('#exampleModal').modal('hide');
               },
               error: function(error){
                   console.log(error.responseText);
               }
               
        });
});
}
createText();
}