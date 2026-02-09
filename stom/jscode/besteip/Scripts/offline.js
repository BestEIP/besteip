/*無輸入秒數則為0秒後執行*/
/*網路測試，有轉動圖示*/
function offline(time) {
    time = $.isNumeric(time) ? time : 0;
    $('#offline').hide();
    $('i.fa-spinner.fa-spin').show();
    $('#ldig').show().css('cursor', 'wait');
    //$('#ldig').on('click', function () { $('#ldig').show(); });
    //onlinetest(time);
    var bCont = onlinetest2(time);
    return bCont;
}

function offline2(bcont, time) {
    time = $.isNumeric(time) ? time : 0;
    $('#offline').hide();
    $('i.fa-spinner.fa-spin').show();
    $('#ldig').show().css('cursor', 'wait');
    $('#ldig').on('click', function () { $('#ldig').show(); });
    onlinetest2(time);
}

/*網路連線測試(無轉動圖示)*/
function onlinetest(time) {
    time = $.isNumeric(time) ? time : 0;
    setTimeout(function () {
        if (!navigator.onLine) {
            $('#ldig').css('cursor', 'default');
            $('#offline').show();
            $('i.fa-spinner.fa-spin').hide();
            $('#ldig').on('click', function () { $(this).hide(); $(this).unbind('click'); });
        }
        else
            $('#ldig').hide();
    }, time * 1000);
}

function onlinetest2(time) {
    time = $.isNumeric(time) ? time : 0;
    var bCont = false;
    $.ajax({
        url: '/Shared/Connect',
        type: 'post',
        async: false,
        success: function (result) { bCont = result; },
        complete: function () {
            setTimeout(function () {
                if (!bCont) {
                    $('#ldig').css('cursor', 'default');
                    $('#offline').show();
                    $('i.fa-spinner.fa-spin').hide();
                    $('#ldig').on('click', function () { $(this).hide(); $(this).unbind('click'); });
                }
                else
                    $('#ldig').hide();
            }, time * 1000);
        }
    });
    return bCont;
}

/*出現轉動圖示(模擬Loading)*/
function showLoading(dtime) {
    var time = $.isNumeric(dtime) ? dtime : 30;
    $('#loadp_close').addClass('hide');
    $('#loadp').on('click', function () { $('#loadp').show(); });
    $('i.fa-spinner.fa-pulse').show();
    $('#loadp').show();
    clearTimeout(window.myTimer);
    window.myTimer = setTimeout(timerFired, time * 1000);
    /*setTimeout(function () {
        $('#loadp_close').removeClass('hide');
    }, time * 1000);*/
}

window.timerFired = function (dtime) {
    var time = $.isNumeric(dtime) ? dtime : 30;
    $('#loadp_close').removeClass('hide');
    window.myTimer = setTimeout(timerFired, time * 1000);
}


/*隱藏轉動圖示*/
function hideLoading(dtime) {
    var time = $.isNumeric(dtime) ? dtime : 0;
    setTimeout(function () {
        $('#loadp').hide();
    }, time * 1000);
}