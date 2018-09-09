$(function(){
    $('#form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/login',
            dataType: 'json',
            data: $('#form').serialize(),
            success: function(data) {
                if(data.status == '200') {
                    location.href = "/"
                } else {
                    alert(data.msg);
                }
            }
        });
    });
});