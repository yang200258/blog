$(function(){
    $('#form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/register',
            dataType: 'json',
            data: $('#form').serialize(),
            success: function(data) {
                console.log(data);
                if(data.status == '200') {
                    location.href('/login');
                } else {
                    alert(data.msg);
                }
            }
        });
    });
});