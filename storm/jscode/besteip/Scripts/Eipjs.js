$.fn.center = function () {
    var maxw = $(window).width(), maxh = $(window).height();
    var top = (maxh - this.height()) / 2;
    var left = (maxw - this.width()) / 2;

    if (top < 5)
        top = 5;
    if (left < 5)
        left = 5;
    top += $(window).scrollTop();
    left += $(window).scrollLeft();

    if ($('body').width() > maxw)
        maxw = $('body').width();
    if ($('body').height() > maxh)
        maxh = $('body').height();

    if ((top + this.height()) > maxh) {
        top = 'auto';
        this.css("bottom", 5);
    }
    this.css({ position: 'absolute', left: left, top: top });
    this.css("max-width", maxw - 10);
    this.css("max-height", maxh - 10);
    return this;
}

$.fn.MyFun = function () {

    // Access object with 'this'
    console.log('++++++++++++++++++++++++++++++++++++++++++++');
    console.log('Farmer MyFun 001 Currnet Object :');
    console.log(this);
    console.log("selector:"+this.selector);

    console.log('This id=' + this.prop('id'));
    var $CurrentDiv = this;
    //$(this).css({ position: 'fixed', top: '2vh', left: 0, width: "100%" });

    console.log('$CurrentDiv id=' + $CurrentDiv.prop('id'));
    var $parent = $('.ui-widget-overlay').parent();
    console.log('Parent node=' + $parent.prop('id'));
    var $parent2 = $CurrentDiv.parent();
    console.log('Parent2 node=' + $parent2.prop('id'));


    // Use jQuery methods
    //this.attr('id', 'MyFunNEW_ID123');
    //$('.ui-widget-overlay').css("background-color", '0,0,0,0.4');

    var $divs = $('.ui-widget-overlay');
    console.log('Get ui-overlay length=' + $divs.length);
    // Loop through each div
    $divs.each(function (index) {

        // Print information about this element 
        console.log("======== Div " + index);
        console.log("HTML: " + this.outerHTML);
        console.log("Classes: " + this.className);

        console.log("ID: " + this.id);
        $(this).attr('id', 'myId' + index);
       $(this).append($CurrentDiv);


        // Print stored jQuery data
        console.log("Data: " + JSON.stringify($(this).data()));

    });

};


$.fn.jqWcenter = function () {
    var windWid = $(window).width();
    var top = -41;
    for (var i = 0; i < $(this).length; i++) {
        var PopWindow = $(this[i]);
       
        if (PopWindow.parents('.jqmWindow').length == 0) {
            if (windWid < 768)
                PopWindow.css({ left: 5, width: '100%' });
            else
                PopWindow.css({ left: '', width: '80%' });
        }
        else
            PopWindow.css({ left: 0, width: '100%' });

        if (windWid > 950 || $('#topbar').css('display') != 'none')
            top -= $('#topbar').height();
        //windWid -= 10 * ($(this).parents('.jqmWindow').length + 1);

        PopWindow.css({ position: 'absolute', top: PopWindow.parents('.jqmWindow').length == 0 ? top : 0, "max-width": windWid - 10 });
    }
    return this;
    // $(this).jqWcenterEQ();
    // return this;
}


$.fn.jqWcenterEQ = function () {
    $(this).removeClass('jqmEQ').addClass('jqmEQ');
    $($(this).find('.widget-body')[0]).removeClass('jqmEQ').addClass('jqmEQ');
    $(this).css({ position: '', 'z-index': '', left: '', top: '', width: '' });
    return this;
}


/*隨著內容改變跳出大小位置設定*/
$.fn.jqWcenterN = function () {
    var windWid = $(window).width();
    var top = -41;
    for (var i = 0; i < $(this).length; i++) {
        var PopWindow = $(this[i]);
        var wCon = $(PopWindow.find('.widget-body')[0]);
        var mCon = $(wCon.find('.widget-main')[0]);

        if (PopWindow.parents('.jqmWindow').length == 0) {
            if (windWid < 768)
                PopWindow.css({ left: 5, width: '100%' });
            else
                PopWindow.css({ left: '', width: 'auto' });
        }
        else
            PopWindow.css({ left: 0, width: '100%' });

        if (windWid > 950 || $('#topbar').css('display') != 'none')
            top -= $('#topbar').height();

        PopWindow.css({ position: 'absolute', top: PopWindow.parents('.jqmWindow').length == 0 ? top : 0, "max-width": windWid - 10 });//, width: '100%'
        var jwwidth = mCon.width() == null ? wCon.width() : mCon.width();
        jwwidth += 240;
        wCon.css({ padding: '0 10px' });

        if (jwwidth >= windWid) {
            jwwidth = windWid - 1;
        }
        else {
            if (jwwidth < 800)
                jwwidth = 800;
        }
        PopWindow.css({ width: jwwidth });
        PopWindow.css({ left: 'calc(50% - ' + jwwidth / 2 + 'px)' });
    }
    return this;
}

$.fn.jqWstdcenter = function () {
    var windWid = $(window).width();
    var top = -100;

    for (var i = 0; i < $(this).length; i++) {
        var PopWindow = $(this[i]);
        if (windWid < 768)
            PopWindow.css({ left: PopWindow.parents('.jqmWindow').length == 0 ? 5 : 0 });
        else
            PopWindow.css({ left: '' });

        if (windWid > 950 || $('#topbar').css('display') != 'none') {
            top -= $('#topbar').height();
        } else if (windWid < 534 && windWid > 456) {
            top -= 40;
        } else if (windWid <= 456) {
            top -= 57;
        }

        PopWindow.css({ position: 'absolute', top: PopWindow.parents('.jqmWindow').length == 0 ? top : 0, "max-width": windWid - 10 });
    }
    return this;
}

$.fn.setgridform = function () {
    var maxw = $(window).width(), maxh = $(window).height();

    if ($('body').width() > maxw)
        maxw = $('body').width();
    if ($('body').height() > maxh)
        maxh = $('body').height();

    this.css("max-width", maxw - 12);
    this.css("max-height", maxh - 100);
    return this;
}

/*重設下拉*/
$.fn.chosenReset = function (data) {
    var options = $(this);
    var default_set = {
        data_placeholder: '請選擇',
        search_ajax_searchid: '',
        search_ajax_secondvalue: '',
        default_option_value: '',
        allow_search_ajax: false,
        selectval: '',
        search_limit: 20,
        //allow_single_deselect: true,
        //search_ajax_secondvalue: null,
        //disable_search_threshold: 0,
        //disable_search: false,
        //enable_split_word_search: true,
        //display_selected_options: true
    };
    var himy = $.extend(true, default_set, data);
    options.chosen('destroy');
    options.find('option').remove();
    options.attr('data-placeholder', himy.data_placeholder).addClass('chosen-select form-control').append('<option></option>');
    options.chosen({ search_ajax_searchid: himy.search_ajax_searchid, search_ajax_secondvalue: himy.search_ajax_secondvalue, default_option_value: himy.default_option_value, allow_search_ajax: himy.allow_search_ajax, search_limit: himy.search_limit });
    options.next().css('width', '100%');
    options.val(himy.selectval).trigger("chosen:updated");
    options.next().css('width', '100%');
    return options;
}

/*bool判斷*/
function ObjTobool(Obj) {
    try { return Obj.toString().toUpperCase() === 'TRUE'; } catch (e) { return false; }
}

/*數字轉換千分位*/
function SeparateNumber(val) {
    val = val || val == 0 ? val.toString().replace(/,/g, '') : '';
    var fval = val.split(".")[0], bval = val.split(".")[1];
    while (/(\d+)(\d{3})/.test(fval.toString())) {
        fval = fval.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    bval = bval ? '.' + bval : '';
    return fval + bval;
}

/*確認訊息框*/
function EipConfirm(parm) {
    var bDel = false;
    var options = this;
    var default_set = {
        message: '確定刪除?',
        Delevent: null,
        ConfirmText: 'OK',
        ConfirmClass: 'ibbtn btn-danger',
        ConfirmIcon: 'ace-icon fa fa-check',
        CancelText: 'Cancel',
        CancelClass: 'ibbtn btn-warning',
        CancelIcon: 'ace-icon fa fa-times',
        Cancelevent: null
    };
    var himy = $.extend(true, default_set, parm);

    if (himy.message.indexOf('放棄新增資料') >= 0 || himy.message.indexOf('放弃新增资料') >= 0) {
        if (himy.Delevent != null)
            himy.Delevent.call(this, null);
    } else {
        bootbox.dialog({
            message: '<div class="bigger-120 text-center">' + himy.message + '</div>',
            buttons:
            {
                Confirm:
                 {
                     label: '<i class="' + himy.ConfirmIcon + '"></i>' + himy.ConfirmText,
                     className: himy.ConfirmClass,
                     callback: function (e) {
                         if (himy.Delevent != null)
                             himy.Delevent.call(this, e);
                     }
                 },
                Cancel:
                {
                    label: '<i class="' + himy.CancelIcon + '"></i>' + himy.CancelText,
                    className: himy.CancelClass,
                    callback: function (e) {
                        if (himy.Cancelevent != null)
                            himy.Cancelevent.call(this, e);
                    }
                }
            }
        });
        $('.bootbox-close-button.close').remove();
        $('.bootbox .modal-dialog').css({ 'z-index': 1041 });
    }
}

/*提示訊息框*/
function EipAlert(parm) {
    var options = this;
    var default_set = {
        message: '訊息',
        Alertevent: null,
        AlertText: 'OK',
        AlertClass: 'ibbtn btn-success',
        AlertIcon: 'ace-icon fa fa-check',
        showtime: 1
    };
    var himy = $.extend(true, default_set, parm);
    if (himy.message == '' || himy.message == null)
        himy.message = '訊息';
    if (himy.message.indexOf('成功') >= 0 || himy.message.indexOf('存檔完成') >= 0 || himy.message.indexOf('存盘完成') >= 0
        || himy.message == '文件已鎖定' || himy.message == '文件已解除鎖定!' || himy.message == '呈核已送出!'
        || himy.message == '文件已锁定' || himy.message == '文件已解除锁定!') {
        SuccessAlert({ message: himy.message, showtime: himy.showtime });
    } else {
        bootbox.dialog({
            message: '<div class="bigger-120 text-center">' + himy.message + '</div>',
            buttons:
            {
                Alert:
                 {
                     label: '<i class="' + himy.AlertIcon + '"></i>' + himy.AlertText,
                     className: himy.AlertClass,
                     callback: function (e) {
                         if (himy.Alertevent != null)
                             himy.Alertevent.call(this, e);
                     }
                 }
            }
        });
        $('.bootbox .modal-dialog').css({'top': '30%', 'z-index': 1041 });
    }
}

/*顯示成功訊息(預設顯示一秒)*/
function SuccessAlert(parm) {
    var options = this;
    var default_set = {
        message: '成功!',
        showtime: 1
    };
    var himy = $.extend(true, default_set, parm);
    var showtime = $.isNumeric(himy.showtime) ? himy.showtime * 1000 : 1000;
    var msghtml = '<div id="alert" class="eipalert">';
    msghtml += '    <div>';
    msghtml += '        <div class="alert alert-success alert-dismissable fade" style="width: 90%;max-width: 500px;margin: 0 auto;min-height: 60px;padding: 0;">';
    msghtml += '            <a href="#" class="close" data-dismiss="alert" aria-label="close" style="font-size: x-large;position: static;padding: 0 5px;"><i class="fa fa-times"></i></a>';
    msghtml += '            <div style="padding: 20px;font-size: large;word-break: break-all;">' + himy.message + '</div>';
    msghtml += '        </div>';
    msghtml += '    </div>';
    msghtml += '</div>';
    $('body').append(msghtml);

    $('[data-dismiss="alert"]').on('click', function () {
        $('[id="alert"].eipalert .alert.fade.in').removeClass('in');
        setTimeout(function () { $('[id="alert"].eipalert').remove(); }, 150);
    });
    setTimeout(function () {
        $('[id="alert"].eipalert .alert.fade').addClass('in');
        setTimeout(function () {
            $('[id="alert"].eipalert .alert.fade.in').removeClass('in');
            setTimeout(function () { $('[id="alert"].eipalert').remove(); }, 150);
        }, showtime);
    }, 200);
}

/*兩數相加*/
function PlusCount(num1, num2) {
    num1 = num1 ? num1.toString().replace(/,/g, '') : 0;
    num2 = num2 ? num2.toString().replace(/,/g, '') : 0;
    var p01 = 0, p02 = 0;
    try {
        if (num1.split(".").length < 3) {
            num1 = num1.split(".")[0] + '.' + ((num1.split(".")[1]) ? num1.split(".")[1] : '');
            p01 = num1.split(".")[1].length + 1;
        }
        else { num1 = 0; }
    } catch (e) { }
    try {
        if (num2.split(".").length < 3) {
            num2 = num2.split(".")[0] + '.' + ((num2.split(".")[1]) ? num2.split(".")[1] : '');
            p02 = num2.split(".")[1].length + 1;
        }
        else { num2 = 0; }
    } catch (e) { }
    pd = Math.pow(p01, p02);
    num1 = Math.round(num1 * Math.pow(10, pd));
    num2 = Math.round(num2 * Math.pow(10, pd));
    var Plusnum = isNaN(num1 + num2) ? 0 : ((num1 + num2) / Math.pow(10, pd));
    return Plusnum;
}

/*兩數相減*/
function MinutCount(num1, num2) {
    num1 = num1 ? num1.toString().replace(/,/g, '') : 0;
    num2 = num2 ? num2.toString().replace(/,/g, '') : 0;
    var p01 = 0, p02 = 0;
    try {
        if (num1.split(".").length < 3) {
            num1 = num1.split(".")[0] + '.' + ((num1.split(".")[1]) ? num1.split(".")[1] : '');
            p01 = num1.split(".")[1].length + 1;
        }
        else { num1 = 0; }
    } catch (e) { }
    try {
        if (num2.split(".").length < 3) {
            num2 = num2.split(".")[0] + '.' + ((num2.split(".")[1]) ? num2.split(".")[1] : '');
            p02 = num2.split(".")[1].length + 1;
        }
        else { num2 = 0; }
    } catch (e) { }
    pd = Math.pow(p01, p02);
    num1 = Math.round(num1 * Math.pow(10, pd));
    num2 = Math.round(num2 * Math.pow(10, pd));
    var Minutnum = isNaN(num1 - num2) ? 0 : (num1 - num2) / Math.pow(10, pd);
    return Minutnum;
}

/*兩數相乘*/
function MulCount(num1, num2) {
    num1 = num1 ? num1.toString().replace(/,/g, '') : 0;
    num2 = num2 ? num2.toString().replace(/,/g, '') : 0;
    var p01 = 0, p02 = 0;
    try {
        if (num1.split(".").length < 3) {
            num1 = num1.split(".")[0] + '.' + ((num1.split(".")[1]) ? num1.split(".")[1] : '');
            p01 = num1.split(".")[1].length + 1;
        }
        else { num1 = 0; }
    } catch (e) { }
    try {
        if (num2.split(".").length < 3) {
            num2 = num2.split(".")[0] + '.' + ((num2.split(".")[1]) ? num2.split(".")[1] : '');
            p02 = num2.split(".")[1].length + 1;
        }
        else { num2 = 0; }
    } catch (e) { }
    num1 = Math.round(num1 * Math.pow(10, p01));
    num2 = Math.round(num2 * Math.pow(10, p02));
    var Mulnum = isNaN(num1 * num2) ? 0 : (num1 * num2) / Math.pow(10, p01 + p02);
    return Mulnum;
}

/*Form轉JSON*/
function getFormDataToJSON(form) {
    var unindexed_array = $(form).serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

/*QRCode產生*/
$.fn.showQRCode = function (data) {
    let qrbtn = $(this);
    let qrid = $(this).data('qr');
    var default_set = {
        width: 100,
        height: 100,
        text: '',
        render: 'canvas',
        typeNumber: 4,
        correctLevel: 3,/*0~3*/
        background: "#ffffff",
        foreground: "#000000"
    };
    var himy = $.extend(true, default_set, data);
    let qrhtm = '<div class="qrpoo" data-qrid="' + qrid + '"><div><div id="' + qrid + '" class="qrimg"><button class="close qrclose" type="button" data-cid="' + qrid + '"><i class="ace-icon fa fa-times"></i></button></div></div></div>';
    if (qrid) {
        $('[data-qrid="' + qrid + '"]').remove();
        $(this).after(qrhtm);
        $(this).unbind('click').on('click', function (event) {
            $('#' + qrid).find('canvas').remove();
            $('#' + qrid).qrcode(himy);
            $('[data-qrid="' + qrid + '"]').addClass('open');
        });
        $('[data-cid="' + qrid + '"]').unbind('click').on('click', function (event) {
            $('[data-qrid="' + qrid + '"]').removeClass('open');
        });
    }
}

/*往前移*/
$.fn.moveBefore = function () {
    $(this).prev().before($(this));
    return $(this);
}

/*往後移*/
$.fn.moveAfter = function () {
    $(this).next().after($(this));
    return $(this);
}

/*地圖設置*/
$.fn.setMap = function (data) {
    let oMap = $(this);
    var default_set = {
        lat: 25,
        lng: 121,
        zoom: 14,
        marker: false,
        mapTypeControl: true,
        zoomControl: true,
        scaleControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        disableDefaultUI: false,
        disableAllUI: false,
        draggable: true,
        omap: null,
        omarker: null,
        markericon: '/images/location.png'
    };
    var himy = $.extend(true, default_set, data);

    if (parseFloat(himy.lat) && parseFloat(himy.lng)) {
        himy.lat = parseFloat(himy.lat);
        himy.lng = parseFloat(himy.lng);
        var mapOptions = {
            center: { lat: himy.lat, lng: himy.lng },
            zoom: himy.zoom,
            disableDefaultUI: himy.disableDefaultUI || himy.disableAllUI,
            mapTypeControl: himy.mapTypeControl && !himy.disableAllUI,
            //mapTypeControlOptions: {
            //    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            //    position: google.maps.ControlPosition.TOP_CENTER
            //},
            zoomControl: himy.zoomControl && !himy.disableAllUI,
            //zoomControlOptions: {
            //    position: google.maps.ControlPosition.LEFT_CENTER
            //},
            scaleControl: himy.scaleControl && !himy.disableAllUI,
            streetViewControl: himy.streetViewControl && !himy.disableAllUI,
            //streetViewControlOptions: {
            //    position: google.maps.ControlPosition.LEFT_TOP
            //},
            fullscreenControl: himy.fullscreenControl && !himy.disableAllUI
        };
        himy.omap = new google.maps.Map(document.getElementById(oMap.attr('id')), mapOptions);
        if (himy.marker) {
            himy.omarker = new google.maps.Marker({ position: { lat: himy.lat, lng: himy.lng }, map: himy.omap, draggable: himy.draggable, icon: himy.markericon });
        }
    }

    return himy;
}

$.fn.FopenLayeredPopup = function (layerIndex, divId, popupTitle, widthPercentage, htmlContent, popupHeight) {
    console.log('openLayeredPopup divId=' + divId);
    console.log('openLayeredPopup layer=' + layerIndex);

    widthPercentage = Math.min(100, Math.max(1, widthPercentage));
    popupHeight = popupHeight || '';

    $.fn.FclosePopups(layerIndex);

    const popup = $(`
        <div class="Foverlay layer-${layerIndex}">
          <div id="${divId}" class="Fpopup-container" style="width: ${widthPercentage}%; max-width: 100%; height: ${popupHeight}">
            <div class="Ftitle-bar">
              <div class="Fpopup-title">${popupTitle}</div>
              <button class="Fclose-button" onclick="$.fn.FclosePopups(${layerIndex})">×</button>
            </div>
            ${htmlContent}
          </div>
        </div>
      `);

    // Add the popup to the body
    $('body').append(popup);

    console.log('Fpopup layer count =' + $('.Foverlay').length);

    // Disable body scrolling for layers above the base layer
    if ($('.Foverlay').length >= 1) {
        $('body').css('overflow', 'hidden');
    }
}

$.fn.FclosePopups = function (layerIndex) {
    // Close all popups above or equal to the specified layer
    console.log('Fclose layer=' + layerIndex);
    $(`.Foverlay.layer-${layerIndex}`).remove();
    console.log('Fclose layer count =' + $('.Foverlay').length);

    // Enable body scrolling if closing all popups
    if ($('.Foverlay').length === 0) {
        $('body').css('overflow', 'auto');
    }
}


/*跳出大小位置設定*/
$.fn.Fcenter = function (farmer1) {

    window.console.log('Into Fcenter01');
    var windWid = $(window).width();
    var top = -41;
    for (var i = 0; i < $(this).length; i++) {
        var PopWindow = $(this[i]);
        console.log(PopWindow.name);
        if (PopWindow.parents('.jqmWindow').length == 0) {
            if (windWid < 768)
                PopWindow.css({ left: 5, width: '100%' });
            else
                PopWindow.css({ left: '', width: '80%' });
        }
        else
            PopWindow.css({ left: 0, width: '100%' });

        //windWid -= 10 * ($(this).parents('.jqmWindow').length + 1);

        PopWindow.css({ position: 'absolute', top: 0 });
    }
    return this;
    // $(this).jqWcenterEQ();
    // return this;

}
