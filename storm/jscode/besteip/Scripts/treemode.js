(function ($) {
    $.fn.removeTree = function () {
        $(this).removeClass('dd').removeData();
        $(this).children().remove();
    }

    $.fn.treemode = function (parm) {
        var default_tree = {
            postdata: {},
            type: 'POST',
            dataTypes: 'json',
            async: false,
            data: [],
            dataurl: '',
            bsendevent: null,
            setparent: true,
            levelname: 'level',
            leveltran: 10000,
            idname: 'id',
            upidname: 'upid',
            textname: 'text',
            downcountname: 'downcount',
            keyname: 'key',
            //editurl: null,
            eventname: { addnm: 'add', editnm: 'edit', delnm: 'del', viewnm: 'view' },
            topadd: true,
            topaddText: '新增一筆',
            addmode: true,
            addevent: null,
            addicon: 'green ace-icon fa fa-plus',
            editmode: true,
            editevent: null,
            editicon: 'blue ace-icon fa fa-pencil',
            delmode: true,
            delevent: null,
            delicon: 'red ace-icon fa fa-trash',
            viewmode: true,
            viewevent: null,
            viewicon: 'orange ace-icon fa fa-search-plus'
        };
        var treeid = this.attr('id');
        var itreeid = '#' + treeid;
        var himy = $.extend(true, default_tree, parm);
        var viewmode = (himy.viewmode === true) || (himy.viewmode.toString().toUpperCase() === 'TRUE') ? true : false;
        var addmode = (himy.addmode === true) || (himy.addmode.toString().toUpperCase() === 'TRUE') ? true : false;
        var editmode = (himy.editmode === true) || (himy.editmode.toString().toUpperCase() === 'TRUE') ? true : false;
        var delmode = (himy.delmode === true) || (himy.delmode.toString().toUpperCase() === 'TRUE') ? true : false;

        return this.each(function () {
            $(itreeid).removeTree();
            $(itreeid).addClass('dd').append('<ol class="dd-list"></ol>');
            showLoading();
            try {/*動態取得樹狀資料*/
                if (himy.data.length == 0 && himy.dataurl != '') {
                    $.ajax({
                        url: himy.dataurl,
                        data: himy.postdata,
                        type: himy.type,
                        async: himy.async,
                        beforeSend: function (jqXHR, settings) {
                            //console.log(jqXHR);
                            //console.log(settings);
                        },
                        complete: function (jqXHR, textStatus) {
                            //console.log(jqXHR);
                            //console.log(textStatus);
                        },
                        dataTypes: himy.dataTypes,
                        success: function (result) {
                            himy.data = result;
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            /*console.log(xhr);
                            console.log(thrownError);
                            console.log(ajaxOptions);*/
                            alert('Tree Data AJAX Error \n\r' + xhr.result);
                        }
                    });
                }
            }
            catch (e) { alert('Tree Data Get Error \n\r' + e); /*console.log(e);*/ }

            try {
                himy.data = himy.data.sort(function (a, b) { return (a[himy.levelname]) - (b[himy.levelname]); });
                /*最上方新增*/
                if (himy.topadd == true) {
                    $(itreeid + ' ol:first').append('<li class="dd-item" id="TMaddnew_' + treeid + '"><div class="dd-handle">' + himy.topaddText + '</div></li>');
                    $('li[id="TMaddnew_' + treeid + '"]').children('.dd-handle').append('<div class="pull-right action-buttons"></div>');
                    $('li[id="TMaddnew_' + treeid + '"]').children('.dd-handle').find('div').append('<a id="newTM_' + treeid + '" class="iconbtn" data-rel="tooltip" data-event="' + himy.eventname.addnm + '" title="Add"><i class="' + himy.addicon + '"></i></a>');
                    $('a[id="newTM_' + treeid + '"]').click({ idvalue: 'TMaddnew_' + treeid, keyvalue: null }, function (e) {
                        if (himy.addevent != null)
                            himy.addevent.call(this, e.data.idvalue, himy.eventname.addnm, e.data.keyvalue, e);
                    });
                }
                var maxlevel = 4;
                for (var i = 0; i < himy.data.length; i++) {
                    /*產生樹狀項目*/
                    /*除去null或undefined值*/
                    var itid = (himy.data[i][himy.idname] === null) || (typeof himy.data[i][himy.idname] === 'undefined') ? '' : himy.data[i][himy.idname].trim(),
                        itup = (himy.data[i][himy.upidname] === null) || (typeof himy.data[i][himy.upidname] === 'undefined') ? '' : himy.data[i][himy.upidname].trim(),
                        ittext = (himy.data[i][himy.textname] === null) || (typeof himy.data[i][himy.textname] === 'undefined') ? '' : himy.data[i][himy.textname].trim(),
                        itkey = (himy.data[i][himy.keyname] === null) || (typeof himy.data[i][himy.keyname] === 'undefined') ? '' : himy.data[i][himy.keyname].trim(),
                        itlevel = (himy.data[i][himy.levelname] === null) || (typeof himy.data[i][himy.levelname] === 'undefined') ? 0 : himy.data[i][himy.levelname].trim();
                    if (Math.floor(itlevel / himy.leveltran) > maxlevel) { maxlevel = Math.floor(itlevel / himy.leveltran); }

                    /*建立第一層項目*/
                    if (itup == '' || itup == "undefined")/*himy.data[i][himy.levelname] == 1*/
                        $(itreeid + ' ol:first').append('<li class="dd-item" id="' + itid + '"><div class="dd-handle"><div class="text-dot">' + ittext + '</div></div></li>');
                    else
                        $('li[id="' + itup + '"] ol:first').append('<li class="dd-item" id="' + itid + '"><div class="dd-handle"><div class="text-dot">' + ittext + '</div></div></li>');
                    var liitem = $('li[id="' + itid + '"]');

                    /*新增項目下層*/
                    if (himy.data[i][himy.downcountname] > 0) { liitem.append('<ol class="dd-list"></ol>'); }
                    //liitem.children('.dd-handle').find('div.inb').append('<div class="tree-act"><a data-dv="' + itid + '" class="iconbtn" data-rel="tooltip"><i class="ace-icon fa fa-caret-down"></i></a></div>');

                    /*產生動作按鈕*/
                    if (viewmode == true || addmode == true || editmode == true || delmode == true)
                    { liitem.children('.dd-handle').find('div.text-dot').append('<div class="pull-right action-buttons"></div>'); }
                    if (viewmode == true)
                    { liitem.children('.dd-handle').find('div.text-dot').find('div.action-buttons').append('<a id="view_' + itid + '" class="iconbtn" data-rel="tooltip" data-event="' + himy.eventname.viewnm + '" ><i class="' + himy.viewicon + '"></i></a>'); }
                    if (addmode == true)
                    { liitem.children('.dd-handle').find('div.text-dot').find('div.action-buttons').append('<a id="add_' + itid + '" class="iconbtn" data-rel="tooltip" data-event="' + himy.eventname.addnm + '" ><i class="' + himy.addicon + '"></i></a>'); }
                    if (editmode == true)
                    { liitem.children('.dd-handle').find('div.text-dot').find('div.action-buttons').append('<a id="edit_' + itid + '" class="iconbtn" data-rel="tooltip" data-event="' + himy.eventname.editnm + '" ><i class="' + himy.editicon + '"></i></a>'); }
                    if (delmode == true)
                    { liitem.children('.dd-handle').find('div.text-dot').find('div.action-buttons').append('<a id="del_' + itid + '" class="iconbtn" data-rel="tooltip" data-event="' + himy.eventname.delnm + '" ><i class="' + himy.delicon + '"></i></a>'); }

                    /*按鈕事件設定*/
                    $('a[id="view_' + itid + '"]').click({ idvalue: itid, keyvalue: itkey }, function (e) {
                        if (himy.viewevent != null) { himy.viewevent.call(this, e.data.idvalue, himy.eventname.viewnm, e.data.keyvalue, e); }
                    });
                    $('a[id="add_' + itid + '"]').click({ idvalue: itid, keyvalue: itkey }, function (e) {
                        if (himy.addevent != null) { himy.addevent.call(this, e.data.idvalue, himy.eventname.addnm, e.data.keyvalue, e); }
                    });
                    $('a[id="edit_' + itid + '"]').click({ idvalue: itid, keyvalue: itkey }, function (e) {
                        if (himy.editevent != null) { himy.editevent.call(this, e.data.idvalue, himy.eventname.editnm, e.data.keyvalue, e); }
                    });
                    $('a[id="del_' + itid + '"]').click({ idvalue: itid, keyvalue: itkey }, function (e) {
                        if (himy.delevent != null) { himy.delevent.call(this, e.data.idvalue, himy.eventname.delnm, e.data.keyvalue, e); }
                    });
                }
                $(itreeid).css({ 'min-width': maxlevel * 50 });

                /*$('[data-dv]').on('click', function () {
                    var bvis = $('[dtat-dvc="' + $(this).attr('data-dv') + '"]').attr('data-treeact');
                    $('[data-treeact]').attr('data-treeact', false);
                    if (bvis.toString().toUpperCase() == "TRUE") { $('[dtat-dvc="' + $(this).attr('data-dv') + '"]').attr('data-treeact', false); }
                    else { $('[dtat-dvc="' + $(this).attr('data-dv') + '"]').attr('data-treeact', true); }
                });*/
                /*設置母項目+-按鈕*/
                if (himy.setparent) { $(itreeid).nestable('setParent'); }
            }
            catch (e) { alert('Create Tree Error \n\r' + e); /*console.log(e);*/ }
            hideLoading(1);
        });
    }
}(jQuery));
