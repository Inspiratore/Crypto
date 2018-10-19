$(document).ready(function() {
    
    /*===================  API links  ====================*/

    $('#nat_curr option[value="usd"]').val('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD');
    $('#nat_curr option[value="eur"]').val('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR');
    $('#nat_curr option[value="rub"]').val('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCRUB');
    $('#nat_curr option[value="gbp"]').val('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCGBP');

    /*===================  Ethereum  =====================*/  
    
    function checkEth(){
        $.ajax({
            type: 'GET',
            url: $('#nat_curr option:selected').val(),         
            success: function(response){

                var switchBtn = $('#ethereum .b1'),
                    price     = $('#ethereum .price').val(response.last),
                    hour      = $('#ethereum .hour_change'),
                    day       = $('#ethereum .day_change'),
                    week      = $('#ethereum .week_change'),
                    month     = $('#ethereum .month_change'),
                    mainVars  = [price, hour, day, week, month];

                function percent(){
                    if(switchBtn.hasClass('switch-on') && switchBtn.hasClass('b1')){
                        hour.val(response.changes.percent.hour);
                        day.val(response.changes.percent.day);
                        week.val(response.changes.percent.week);
                        month.val(response.changes.percent.month);
                    } 
                    else {
                        hour.val(response.changes.price.hour);
                        day.val(response.changes.price.day);
                        week.val(response.changes.price.week);
                        month.val(response.changes.price.month);
                    }

                    for(i=0; i<mainVars.length; i++){
                        if(mainVars[i].val() < 0){
                            $(mainVars[i]).addClass('decrease');
                        } else
                        if(mainVars[i].val() > 0){
                            $(mainVars[i]).removeClass('decrease');
                        } 
                        else{}
                    }
                }

                percent();

                switchBtn.on('click', function(){
                    percent();
                });
            },  
            error: function(){
                console.log('download error');
            }
        });
    }

    setInterval(checkEth, 3241);


        /*===================  Litcoin  =====================*/  
    
    function checkLit(){
        $.ajax({
            type: 'GET',
            url: $('#nat_curr option:selected').val(),         
            success: function(response){

                var switchBtn = $('#litecoin .b2'),
                    price     = $('#litecoin .price').val(response.last),
                    hour      = $('#litecoin .hour_change'),
                    day       = $('#litecoin .day_change'),
                    week      = $('#litecoin .week_change'),
                    month     = $('#litecoin .month_change'),
                    mainVars  = [price, hour, day, week, month];

                function percent(){
                    if(switchBtn.hasClass('switch-on') && switchBtn.hasClass('b2')){
                        hour.val(response.changes.percent.hour);
                        day.val(response.changes.percent.day);
                        week.val(response.changes.percent.week);
                        month.val(response.changes.percent.month);
                    } 
                    else {
                        hour.val(response.changes.price.hour);
                        day.val(response.changes.price.day);
                        week.val(response.changes.price.week);
                        month.val(response.changes.price.month);
                    }

                    for(i=0; i<mainVars.length; i++){
                        if(mainVars[i].val() < 0){
                            $(mainVars[i]).addClass('decrease');
                        } else
                        if(mainVars[i].val() > 0){
                            $(mainVars[i]).removeClass('decrease');
                        } 
                        else{}
                    }
                }

                percent();

                switchBtn.on('click', function(){
                    percent();
                });
            },  
            error: function(){
                console.log('download error');
            }
        });
    }

    setInterval(checkLit, 3677);


    /*====================  Bitcoin  =====================*/

    function checkBit(){
        $.ajax({
            type: 'GET',
            url: $('#nat_curr option:selected').val(),         
            success: function(response){

                var switchBtn = $('.b3'),
                    price     = $('#bitcoin .price').val(response.last),
                    hour      = $('#bitcoin .hour_change'),
                    day       = $('#bitcoin .day_change'),
                    week      = $('#bitcoin .week_change'),
                    month     = $('#bitcoin .month_change'),
                    mainVars  = [price, hour, day, week, month];

                function percent(){
                    if(switchBtn.hasClass('switch-on') && switchBtn.hasClass('b3')){
                        hour.val(response.changes.percent.hour);
                        day.val(response.changes.percent.day);
                        week.val(response.changes.percent.week);
                        month.val(response.changes.percent.month);
                    } 
                    else {
                        hour.val(response.changes.price.hour);
                        day.val(response.changes.price.day);
                        week.val(response.changes.price.week);
                        month.val(response.changes.price.month);
                    }

                    for(i=0; i<mainVars.length; i++){
                        if(mainVars[i].val() < 0){
                            $(mainVars[i]).addClass('decrease');
                        } else
                        if(mainVars[i].val() > 0){
                            $(mainVars[i]).removeClass('decrease');
                        } 
                        else{}
                    }
                }

                percent();

                switchBtn.on('click', function(){
                    percent();
                });
            },  
            error: function(){
                console.log('download error');
            }
        });
    }

    setInterval(checkBit,2947);

      
    
    /*======  Settings for Opera and Firefox Browsers  ======*/
    function get_name_browser(){  
        if (navigator.userAgent.search(/Chrome/) > 0) return 'Google Chrome';
        if (navigator.userAgent.search(/Safari/) > 0) return 'Safari';
        if (navigator.userAgent.search(/Firefox/) > 0) return 'Firefox';
        return 'Undefined';
    }
    var browser = get_name_browser();
    if(browser === 'Safari'){
        var docWidth = $(document).width();
        // alert(docWidth);
    }

    /*======  Persent/Absolute values switcher  ======*/
    $('.switch-btn').on('click', function(){
        $(this).toggleClass('switch-on');
    });

});
