$(function(){
    $.ajax({
        type: 'get',
        url: '/www',
        dataType: 'json',
        success: function(data) {
            alert(data);
        }
    })
})