require(['jquery'], function($){
    
    $(function(){
        var name = prompt('what is your name?');

        $('.name').text(name);
    });

});
