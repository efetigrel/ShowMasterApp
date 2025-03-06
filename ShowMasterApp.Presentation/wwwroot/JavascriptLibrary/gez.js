
///////////////////////
// Global degiskenler//
///////////////////////

/*  sayfalarda belirtilen load metodları bu değişkende saklanmaktadır  */
var ____gezOnloadMethodsList = [];
var ____multiselectControls = [];

/* gez kütüphanemiz tanımlanıyor */
var gez = {
    load: function (f) {
        ____gezOnloadMethodsList.push(f);

    }
};

///////////////////////
// Util Fonksiyonlar //
///////////////////////

/*  sayfaya çalışma anında client üzerinde script dosyası eklemek için kullanacağımız fonksiyonu tanımlıyoruz   */
var ____includeScriptFile = function (url, onSuccess) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.charset = 'windows-1254';
    if (onSuccess != null) {

        if (!isNaN(script.onload))
            script.onload = onSuccess;
        else {
            script.onreadystatechange = function () {
                if (this.readyState == 'complete' || this.readyState == 'loaded') onSuccess();
            }
        }
    }
    head.appendChild(script);
}

var ____loadMethodsCall = function () {
    /* load metodları çalıştırılıyor */

    gez("form").each(function () { gez(this).createValidate(); });

    gez("body").each(function () { gez(this).createMasks(); });


    for (var i = 0; i < ____gezOnloadMethodsList.length; i++) {
        ____gezOnloadMethodsList[i]();
    }

    /*  çalıştırılan metodlar siliniyor  */
    ____gezOnloadMethodsList = [];



}

var onLmsLoaded = function () {
    var _temp = gez.load;
    gez = jQuery;
    gez.load = _temp;

    var ____onScriptsLoaded = function () {


        gez._____________________load = true;


        // Edited by: Ugur  Turkucar
        // Edited at: 13.01.2024
        // Desc: Toastr eklentisi ile uyarı göstermeyi sağlar.
        gez.Uyari = function (settings) {




            var defaultSettings = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut",
                type: "alert",
                title: "Uyarı",
                message: ""
            }
            var ___settings = gez.extend({}, defaultSettings, settings);
            var dialogContent = ___settings.headerText;

            toastr.options.closeButton = ___settings.closeButton;


            var proc = "<div style='color:#5f58b5;'  role='alert'>Response Log : " + ___settings.message + "</div>";


            $("#logMessage").html(proc);

            if (___settings.type == "info") {
                toastr.info(___settings.message, ___settings.title);
            }
            else if (___settings.type == "warning") {
                toastr.warning(___settings.message, ___settings.title);
            }
            else if (___settings.type == "success") {
                toastr.success(___settings.message, ___settings.title);
            }
            else if (___settings.type == "error") {
                toastr.error(___settings.message, ___settings.title);
            }


        }


        gez.loadStop = function () {


            $('.m-loader').removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);



        }

        gez.reLoad = function (settings) {

            var defaultSettings = {
                container: "divLoad"
            }

            var ___settings = gez.extend({}, defaultSettings, settings);

            var url = gez("#" + ___settings.container).attr("data-load-url");
            var data = gez("#" + ___settings.container).attr("data-load-data");
            console.log(data)
            gez("#" + ___settings.container).loadView({ url: url, data: JSON.parse(data) })
        }


        // Author: Ugur  Turkucar
        // Edited at: 12.01.2024
        // Description: Bootstrap Modal eklentisi ile modal oluşturmayı sağlar.
        gez.ModalOlustur = function (settings) {
            // Default Settings

            var defaultSettings = {
                modal_id: "",
                modal_header_title: "",
                url: "",
                backdrop: 'static',
                data: {},
                style: '',
                size: 'modal-lg', // modal-lg, modal-sm
                buttons: '2', // 0: Gizli 1: İptal 2: İptal/Kaydet|Güncelle
                body: '1'
            }
            var ___settings = gez.extend({}, defaultSettings, settings);

            // Buttons
            var modal_buttons = '';
            var modal_standart_buttons = '<button type="button" class="btn btn-default modalKapat" data-bs-dismiss="modal">Kapat</button>';
            //if (___settings.data) {
            //    if (typeof ___settings.data.id == "undefined")
            //        modal_buttons = '<button type="button" class="btn btn-primary" id="btn_' + ___settings.modal_id + '_kaydet">Kaydet</button>';
            //    else if (___settings.data.id > 0)
            //        modal_buttons = '<button type="button" class="btn btn-primary" id="btn_' + ___settings.modal_id + '_guncelle">Güncelle</button>';
            //}
            if (___settings.buttons == 0 || ___settings.buttons == "kaydet") {
                modal_buttons = '<a href="javascript:;" class="btn btn-primary btnSend" style="color:#fff;" id="btn_' + ___settings.modal_id + '_kaydet"><i class="fa fa-save"></i>&nbsp;Kaydet</button>';
            } else if (___settings.buttons == 1 || ___settings.buttons == "guncelle") {
                modal_buttons = '<a   class="btn btn-primary loadBtn btnSend" style="color:#fff;" id="btn_' + ___settings.modal_id + '_guncelle">Güncelle</a>';
            } else if (___settings.buttons == 2 || ___settings.buttons == "yok") {
                modal_buttons = '';

            } else if (___settings.buttons == 3 || ___settings.buttons == "yazdir") {
                modal_buttons = '<a   class="btn btn-primary" style="color:#fff;" id="btn_' + ___settings.modal_id + '_yazdir"><i class="fa fa-print"></i> Yazdır</a>';
            } else if (___settings.buttons == "ok") {
                modal_buttons = '<a   class="btn btn-success" style="color:#fff;" id="btn_' + ___settings.modal_id + '_ok"><i class="fa fa-check"></i></a>';
            } else if (___settings.buttons == "gonder") {
                modal_buttons = '<a   class="btn btn-primary loadBtn btnSend" style="color:#fff;" id="btn_' + ___settings.modal_id + '_ok"><i class="ti ti-mail-fast"></i>&nbsp;Gönder </a>';
            } else {
                modal_buttons = '<a   class="btn btn-primary loadBtn btnSend" style="color:#fff;" id="btn_' + ___settings.modal_id + '_ok"><i class="fa fa-save"></i>  ' + ___settings.buttons + '</a>';
            }


            // Size
            var modal_size = '';
            if (___settings.size != "") {
                modal_size = ___settings.size;
            }



            if (___settings.body == "1") {



                // Render
                if ($("#" + ___settings.modal_id).length == 0) {


                    gez("body").append('<form id="modalForm" method="post"><div class="modal fade text-start" id="' + ___settings.modal_id + '"><div class="modal-dialog" style="' + ___settings.style + '"><div class="modal-content"></div></div></div></form>');
                    if (___settings.modal_header_title != "") {

                        gez("#" + ___settings.modal_id + " .modal-content").append('<div class="modal-header"><h4 class="modal-title" id="myModalLabel1">' + ___settings.modal_header_title + '</h4><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>');

                    } else {


                        gez("#" + ___settings.modal_id + " .modal-content").append(' <button type="button" class="close" data-bs-dismiss="modal" ><img style="width:50px;" src="/images/flaticon/close.svg" /></button>');
                    }
                    gez("#" + ___settings.modal_id + " .modal-content").append('<div class="modal-body" id="modal-body">Yükleniyor...</div>');
                    if (___settings.buttons != 2 || ___settings.modal_header_title != "") {

                        gez("#" + ___settings.modal_id + " .modal-content").append('<div class="modal-footer"></div>');

                    }
                }
                gez("#" + ___settings.modal_id + " .modal-footer").html(modal_standart_buttons + modal_buttons);

                // Load
                gez("#" + ___settings.modal_id + ' .modal-body').loadView({
                    url: ___settings.url,
                    data: ___settings.data
                })

                // Show
                gez("#" + ___settings.modal_id).modal('show');


            } else {


                if ($("#" + ___settings.modal_id).length == 0) {
                    gez("body").append('<div class="modal fade text-start" id="' + ___settings.modal_id + '"><div class="modal-dialog" style="' + ___settings.style + '"><div class="modal-content"></div></div></div>');
                }

                gez(".modal-content").empty();
                // Load
                gez("#" + ___settings.modal_id + ' .modal-content').loadView({
                    url: ___settings.url,
                    data: ___settings.data
                })

                // Show
                gez("#" + ___settings.modal_id).modal('show');

            }


        }

        gez.UyariAppend = function (settings) {

            var defaultSettings = {
                sonuc: "",
                durum: "",
                icon: "",
                div: ".islemSonuc"
            }
            gez(settings.div).empty();
            gez(settings.div).append("<div class='alert alert-" + settings.durum + "' role='alert'><i class='fa fa-" + settings.icon + "'></i> " + settings.sonuc + "  </div>")

            setTimeout(function () {

                $(".loadBtn").each(function () {
                    $(this).find(".fa-spin").remove();
                    var txt = $(this).attr("data-btntext");
                    $(this).html(txt);
                    $(this).removeClass("disabled");
                })

            }, 400)



        }


        // Edited by: Ugur  Turkucar.
        // Edited at: 25.05.2015
        // Desc: Tablolara sayfalama eklemek için kullanılır. Controller ve repository yapısının uygun yazılması gerekir.
        gez.DataTablePaging = function (settings) {
            var defaultSettings = {
                divClass: "data-table-paging",
                tableClass: "mesajlar",
                detailClass: "table-details",
                pageCount: 20,
                activePage: 1,
                controller: "Home",
                view: "Index",
                totalCount: 100,
                aracakAlan: "",
                aranacakKelime: "",
                mesajTip: 0
            }

            var ___settings = gez.extend({}, defaultSettings, settings);

            var totalPage = parseInt(___settings.totalCount) / ___settings.pageCount;
            totalPage = Math.ceil(totalPage);

            var on = "";
            var yirmi = "";
            var elli = "";
            var yuz = "";


            switch (___settings.pageCount) {
                default:
                    yirmi = "selected='selected'";
                    break;
                case "10":
                    on = "selected='selected'";
                    break;
                case "20":
                    yirmi = "selected='selected'";
                    break;
                case "50":
                    elli = "selected='selected'";

                    break;
                case "100":
                    yuz = "selected='selected'";
                    break;
            }

            if (___settings.totalCount > 10) {
                gez(".page-row-count").html("<select style='width:60px; height:26px!important; min-height:26px;' data-controller= " + ___settings.controller + " data-selectview=" + ___settings.view + "   data-type='DataTable' data-div=" + ___settings.tableClass + "  data-activepage='1' data-pagecount=" + ___settings.pageCount + " data-mesajtip=" + ___settings.mesajTip + " data-aranacakkelime='" + ___settings.aranacakKelime + "' data-aranacakalan='" + ___settings.aracakAlan + "' > <option " + on + " value='10' > 10 </option> <option " + yirmi + " value='20'  > 20 </option> <option " + elli + " value='50' > 50 </option> <option " + yuz + " value='100' > 100 </option> </select>");
            }

            var paging = "";


            if (totalPage > 1) {
                if (parseInt(___settings.totalCount) < ___settings.pageCount || totalPage + 1 < 3 || parseInt(___settings.activePage) == 1) {
                    paging += "<div class='btn-group'><a class='btn btn-white btn-mini disabled' ><i class='fa fa-chevron-left'></i></a>";
                }
                else {

                    paging += "<div class='btn-group'><a class='btn btn-white btn-mini' data-activepage=" + (parseInt(___settings.activePage) - 1) + " data-pagecount=" + ___settings.pageCount + " data-mesajtip=" + ___settings.mesajTip + " data-aranacakkelime='" + ___settings.aranacakKelime + "' data-aranacakalan='" + ___settings.aracakAlan + "' href='#' data-controller='" + ___settings.controller + "' data-view='" + ___settings.view + "'   data-type='DataTable' data-div=" + ___settings.tableClass + "  title='Prev'><i class='fa fa-chevron-left'></i></a> ";
                }

                for (var i = 1; i < totalPage + 1; i++) {

                    if (i > parseInt(___settings.activePage) - 6 && i < parseInt(___settings.activePage) + 6) {
                        var cls = "";
                        if (parseInt(___settings.activePage) == i) {
                            cls = "active";
                        }

                        paging += "<a class='btn btn-white btn-mini " + cls + "' data-activepage=" + i + " data-pagecount=" + ___settings.pageCount + " data-mesajtip=" + ___settings.mesajTip + "   data-aranacakkelime='" + ___settings.aranacakKelime + "' data-aranacakalan='" + ___settings.aracakAlan + "'  class='Paging' data-page=" + i + " href='#' data-controller= " + ___settings.controller + " data-view=" + ___settings.view + "   data-type='DataTable' data-div=" + ___settings.tableClass + " >" + i + " </a>";
                    }
                }
                var ilkDeger = 0;
                var sonDeger = 0;
                if (parseInt(___settings.totalCount) < ___settings.pageCount || parseInt(___settings.totalPage) + 1 < 3 || parseInt(___settings.activePage) == totalPage) {
                    ilkDeger = 0;
                    sonDeger = ___settings.totalCount;
                    paging += "<a class='btn btn-white btn-mini disabled'  title='Next'><i class='fa fa-chevron-right'></i></a></div> ";
                }
                else {
                    ilkDeger = (___settings.totalCount / totalPage) * ___settings.activePage;
                    sonDeger = (___settings.totalCount / totalPage) * (___settings.activePage + 1);
                    paging += "<a  class='btn btn-white btn-mini' data-activepage=" + (parseInt(___settings.activePage) + 1) + " data-pagecount=" + ___settings.pageCount + " data-mesajtip=" + ___settings.mesajTip + "   data-aranacakkelime='" + ___settings.aranacakKelime + "' data-aranacakalan='" + ___settings.aracakAlan + "' href='#' data-controller=" + ___settings.controller + " data-view=" + ___settings.view + " data-type='DataTable' data-div=" + ___settings.tableClass + " title='Next'><i class='fa fa-chevron-right'></i></a></div> ";
                }

                gez("." + ___settings.detailClass).html("<div> Toplam : " + ___settings.totalCount + " Kayıt</div>")

                gez("." + ___settings.divClass).empty();
                gez("." + ___settings.divClass).append(paging);

            }



        }

        /**/
        gez.showMessage = function (settings) {

            var defaultSettings = {
                closeAfterMilliSeconds: 0,
                closeFunction: null,
                resizable: false,
                draggable: false,
                modal: true,
                height: 220,
                width: 350,
                position: {
                    my: 'center',
                    at: 'center'
                },
                buttons: null,
                open: null,
                onYesButtonClick: null,
                onNoButtonClick: function () { gez(this).dialog("close") },
                onOKButtonClick: function () { gez(this).dialog("close") },
                headerText: "Emin misiniz?",
                title: "Uyarı",
                type: "alert",
                typeKind: null,
                containerId: null,
                url: "",
                data: {},
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                type: "POST",
                success: null,
                error: null,
                messageDiv: null,
                loadingObjectName: "pageLoading",
                closeOnEscape: false,
                dialogClass: null
            }

            var ___settings = gez.extend({}, defaultSettings, settings);
            var dialogContent = ___settings.headerText;

            var imagePath = "";

            if (___settings.typeKind != null) {
                dialogContent = "<table><tr><td style='border:none; vertical-align:top; padding:10px;'><img src='/Content/Images/" +
                    ___settings.typeKind + ".png' width='50px'/></td><td style='border:none; vertical-align:top; padding:10px; padding-left:5px;'>" +
                    ___settings.headerText + "</td></tr></table>"
            }

            //**************************************************

            if (___settings.type == "alert") {
                if (___settings.buttons == null && ___settings.typeKind != "success" && ___settings.closeAfterMilliSeconds == 0)
                    ___settings.buttons = {
                        "Tamam": ___settings.onOKButtonClick
                    }
                var a = gez('<div title="' + ___settings.title + '" id="dvDialog"/>').html(dialogContent).dialog(___settings);

                if (___settings.closeAfterMilliSeconds > 0) {
                    setTimeout(function () {
                        $(a).dialog("close");
                        ___settings.closeFunction();
                    }, ___settings.closeAfterMilliSeconds);
                }

            }

            //*****************************************************

            else if (___settings.type == "confirm") {
                if (___settings.buttons == null)
                    ___settings.buttons = {
                        "Evet": ___settings.onYesButtonClick,
                        "Hayır": ___settings.onNoButtonClick
                    }
                gez('<div title="' + ___settings.title + '"/>').html(dialogContent).dialog(___settings);
            }

            else if (___settings.type == "pageModal") {
                //gez("#" + ___settings.messageDiv).html("");
                gez("#" + ___settings.messageDiv).html(
                    gez("#" + ___settings.messageDiv).loadView({
                        url: ___settings.url,
                        data: ___settings.data
                    })).dialog(___settings);
            }
        }

        /*
        *
        */
        gez.confirmBox = function (settings) {
            var defaultSettings = {
                resizable: false,
                modal: true,
                height: 175,
                width: 350,
                position: {
                    my: 'center',
                    at: 'center'
                    //of: this
                },
                buttons: {
                    "Hayır": function () {
                        gez(this).dialog("close");
                    },
                    "Evet": null
                },
                headerText: "Emin misiniz?",
                title: "Uyarı"
            }

            var ___settings = jQuery.extend({}, defaultSettings, settings);

            gez('<div title="' + ___settings.title + '"/>').html(___settings.headerText).dialog(___settings);
        }

        /*
        * javascript ile anlık kontrol oluşturma
        */
        gez.fn.createClientControl = function (settings, obj) {
            var defaultSettings = {
                ajax: null,
                source: null,
                data: "",
                height: null,
                width: null,
                multiselect: null,
                className: "",
                onChange: null,
                onClick: null,
                onLoad: null,
                onLoading: null,
                onKeypress: null,
                disabled: null,
                type: "text",
                obj: null,
                disabled: null,
                hide: null,
                //multiselect: { multiple: false, selectedList: 1 },
                customAttribute: []
            }

            var _insertedContainer = false;

            var ___settings = jQuery.extend({}, defaultSettings, settings);
            if (obj) {
                ___settings.obj = obj;
            }
            if (___settings.onLoading) {
                ___settings.onLoading(___settings.obj);
            }
            var container = gez(this);
            var control;
            switch (___settings.type) {
                case 'select': {
                    control = gez("<select/>").addClass(___settings.className);
                    if (___settings.source) {
                        for (var _i in ___settings.source) {

                            var _option = gez("<option value='" + ___settings.source[_i].Id + "'  >" + ___settings.source[_i].Deger + "</option>");
                            if (___settings.source[_i].Id == ___settings.data) {
                                _option.attr("selected", "true");
                            }
                            control.append(_option)
                        }
                        container.append(control);
                        control.multiselect(___settings.multiselect);
                    } else {
                        if (___settings.ajax) {
                            var defaultAjaxSettings = {
                                hasReturnValue: true,
                                loadingObjectName: "________inputselectcontrol__________"
                            }
                            var ___ajaxSettings = jQuery.extend({}, defaultAjaxSettings, ___settings.ajax);
                            gez.callMethod(___ajaxSettings,
                                function (___source) {
                                    for (var _i in ___source) {
                                        var _option = gez("<option value='" + ___source[_i].Id + "'  >" + ___source[_i].Deger + "</option>");
                                        if (___source[_i].Id == ___settings.data) {
                                            _option.attr("selected", "true");
                                        }
                                        control.append(_option)
                                    }
                                    container.append(control);
                                    control.multiselect(___settings.multiselect);
                                }, null);
                        }
                    }
                    _insertedContainer = true;
                    break;
                }
                case 'check': {
                    control = gez("<input type='checkbox'/>").addClass(___settings.className);
                    if (___settings.data == true) {
                        control.attr("checked", "true");
                    } else {
                        control.removeAttr("checked");
                    }
                    break;
                }
                case 'text': {
                    control = gez("<input type='text'/>").addClass(___settings.className).val(___settings.data);;


                    break;
                }
                case 'link': {
                    control = gez("<a  href='javascript:;'/>").addClass(___settings.className).html(___settings.data);
                    break;
                }
                case 'button': {
                    control = gez("<button />");

                    if (___settings.className.length == 0) {
                        if (___settings.data == 'Ekle') {
                            control.html('<i class="fa fa-plus"></i>');
                            control.addClass('btn yellow');
                        }
                        else if (___settings.data == 'Güncelle') {
                            control.html('<i class="fa fa-edit"></i>');
                            control.addClass('btn green');
                        }
                        else if (___settings.data == 'Sil') {
                            control.html('<i class="fa fa-times"></i>');
                            control.addClass('btn red');
                        }
                        else if (___settings.data == 'ExportToExcel') {
                            control.addClass('gridBtnExcel');
                        }
                        else if (___settings.data == 'ExportToPdf') {
                            control.addClass('gridBtnPdf');
                        }
                        else {
                            control.addClass(___settings.className).val(___settings.data);
                        }
                    }
                    else
                        control.addClass(___settings.className).val(___settings.data);

                    break;
                }
                case 'imagelink': {
                    control = gez("<img alt='' src='" + ___settings.data + "'/>").addClass(___settings.className);
                    break;
                }
                default: {
                    control = gez("<span/>").addClass(___settings.className).html(___settings.data);
                    break;
                }
            }


            if (___settings.hide) {
                control.css("display", "none");
            }

            if (___settings.disabled)
                control.attr("disabled", "disabled");

            if (___settings.width) {
                control.width(___settings.width);
            }
            if (___settings.height) {
                control.height(___settings.height);
            }
            if (___settings.onChange) {
                control.change(function () {
                    ___settings.onChange(gez(this), ___settings.obj);
                });
            }
            if (___settings.onClick) {
                control.click(function () {
                    ___settings.onClick(gez(this), ___settings.obj);
                });
            }
            if (___settings.onKeypress) {
                control.keypress(function () {
                    ___settings.onKeypress(gez(this), ___settings.obj);
                });
            }
            if (___settings.onKeyup) {
                control.keyup(function () {
                    ___settings.onKeyup(gez(this), ___settings.obj);
                });
            }
            for (var _item in ___settings.customAttribute) {
                control.attr(___settings.customAttribute[_item].name, ___settings.customAttribute[_item].value);
            }
            if (!_insertedContainer)
                container.append(control);
            if (___settings.onLoad) {
                ___settings.onLoad(control, ___settings.obj);
            }
            return control;
        }

        /*
        * Alert Tanımlama Bölümü
        */
        gez.alert = function (alertMessage) {
            alert(alertMessage);
        }

        /*Mask Tanımlama*/
        //gez.fn.Mask = function (type) {
        //    if (type = 1)
        //        jQuery(this).Mask("(999) 999-9999");
        //}

        /*
        * Ajax Tanımlama Bölümü
        */
        gez.ajax1 = jQuery.ajax;

        gez.ajax = function (settings) {
            //gez.alert("Hatalı Kullanım Lütfen gez.callMethod fonksiyonunu kullanınız");
            var defaultSettings = {
                hasReturnValue: false
            }
            var ___settings = jQuery.extend({}, defaultSettings, settings);
            gez.callMethod(___settings);
        };

        gez.callMethod = function (settings, success, error) {

            var defaultSettings = {
                hasReturnValue: true,
                type: "POST",
                url: "",
                data: {},
                dataType: "json",
                cache: false,
                contentType: "application/json; charset=UTF-8",
                success: null,
                connectionError: null,
                serviceError: null,
                loadingObjectName: "pageLoading",
                load: "0",
                loadContainer: null
            }

            $(".loadBtn").each(function () {
                $(this).addClass("disabled")
            })

            console.log("callMethod");



            //history.pushState('', document.title, location.pathname);

            var ___settings = jQuery.extend({}, defaultSettings, settings);


            if (___settings.addUrl != true) {

                var baseUrl = gez('body').attr("data-url");
                if (___settings.url.indexOf('http') < 0) {
                    baseUrl = baseUrl.split("/")
                    if (baseUrl[3] != "") {
                        ___settings.url = "/" + baseUrl[3] + ___settings.url;
                    }
                }
            }

            if (!success) {
                success = ___settings.success;
            }

            if (error) {
                ___settings.error = error;
            }

            ___settings.error = function (err) {

                setTimeout(function () {

                    $(".loadBtn").each(function () {

                        var txt = $(this).attr("data-btntext");
                        $(this).html(txt);
                        $(this).removeClass("disabled");
                    })


                }, 1000)





                gez("#" + ___settings.loadingObjectName).hide();

                if (err.status == 302) {

                    gez.Uyari({
                        type: "error",
                        title: "Uyarı!",
                        message: 'Oturum sonlandı. Giriş sayfasına yönlendirileceksiniz'
                    });




                    window.location = location.origin + location.pathname;
                }
                else if (err.status == 400) {

                    gez.Uyari({
                        type: "error",
                        title: "Uyarı!",
                        message: 'Kötü istek lütfen request değerlerinizi kontrol edin.'
                    });




                    var errmessage = "";

                    var response = gez.JSONparse(err.responseText);

                    gez.each(response, function (i, val) {
                        gez.each(val.errors, function (j, value) {
                            errmessage += "-" + value
                        });
                    });

                    if (errmessage == "") errmessage = err.responseText;

                    gez.Uyari({
                        type: "error",
                        title: "Uyarı!",
                        message: errmessage
                    });



                }
                else if (err.status == 403) {
                    var errormessage = "Sayfaya Erişim Yetkiniz Bulunmamaktadır.";
                    if (gez.JSONparse(err.responseText).Error != undefined) {
                        errormessage = gez.JSONparse(err.responseText).Error;
                    }
                    gez.Uyari({
                        type: "error",
                        title: "Uyarı!",
                        message: errmessage
                    });


                } else if (err.status == 401) {

                    gez.Uyari({
                        type: "warning",
                        title: "Uyarı!",
                        message: "Bu sayfa için yetkiniz bulunmuyor."
                    });

                }
                else if (err.status == 404) {

                    gez.Uyari({
                        type: "warning",
                        title: "Uyarı!",
                        message: "Sayfa bulunamadı..(404)"
                    });

                }
                else {


                    //gez.Uyari({
                    //    type: "error",
                    //    title: "Uyarı!",
                    //    message: 'Sunucu ile bağlantı kurulamadı Hata:' + err.statusText
                    //});


                    //gez(___settings.loadContainer).html(err.responseText)

                    //if ((___settings.loadContainer).find("h2").length > 0) {

                    //    var mesaj = "<div class='m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-danger alert-dismissible fade show' role='alert'>" +
                    //        "<div class='m-alert__icon'>  <i class='flaticon-exclamation-1'></i><span></span></div>" +
                    //        "<div class='m-alert__text'> <strong> Hata oluştu! </strong> " + gez(___settings.loadContainer).find("h2").html() + "</div>" +
                    //        "<div class='m-alert__close'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'></button></div></div>";

                    //    gez(___settings.loadContainer).html(mesaj)

                    //} else {

                    //    var mesaj = "<div class='m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-danger alert-dismissible fade show' role='alert'>" +
                    //        "<div class='m-alert__icon'>  <i class='flaticon-exclamation-1'></i><span></span></div>" +
                    //        "<div class='m-alert__text'> <strong> Hata oluştu! </strong> " + err.statusText + " Status:" + err.status + "</div>" +
                    //        "<div class='m-alert__close'> <button type='button' class='close' data-dismiss='alert' aria-label='Close'></button></div></div>";

                    //    gez(___settings.loadContainer).html(mesaj)
                    //}



                }
            }

            ___settings.success = function (data) {


                setTimeout(function () {

                    $(".loadBtn").each(function () {

                        var txt = $(this).attr("data-btntext");
                        $(this).html(txt);
                        $(this).removeClass("disabled");
                    })


                }, 1000)


                gez("#" + ___settings.loadingObjectName).hide();
                if (data != null && data != undefined) {
                    if (data.____exception) {
                        if (___settings.serviceError) {
                            ___settings.serviceError(data);
                        } else {
                            var m = data.Message;
                            if (data.Data)
                                m = m + "\n" + data.Data

                            gez.Uyari({
                                type: "error",
                                title: "Uyarı!",
                                message: m
                            });
                        }
                    } else {
                        if (success) {
                            success(data);
                        } else {
                            if (___settings.hasReturnValue) {
                                gez.Uyari({
                                    type: "error",
                                    title: "Uyarı!",
                                    message: 'Sunucudan veri alındı fakat veri işleyecek fonksiyon bulunamadı'
                                });
                            }
                        }
                    }
                } else {
                    if (___settings.hasReturnValue)
                        gez.Uyari({
                            type: "error",
                            title: "Uyarı!",
                            message: 'Sunucudan Veri Alınamadı'
                        });
                }
            }

            if (___settings.url == "") {
                gez.Uyari({
                    type: "error",
                    title: "Uyarı!",
                    message: 'İstek yapılacak URL adresi belirtilmedi'
                });
                return;
            }

            //gez(___settings.div).html(gez("#" + ___settings.loadingObjectName).html());
            //gez("#" + ___settings.loadingObjectName).html();


            // Loading
            if (___settings.load == "1") {

                gez("#" + ___settings.loadingObjectName).show();

            }

            gez.ajax1(___settings);

        }

        /*
        * View Loading
        */
        gez.fn.loadView = function (settings) {
            var container = gez(this);
            var defaultSettings = {
                containerId: null,
                url: "",
                data: {},
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                type: "POST",
                success: null,
                error: null,
                addUrl: false,
                loadingObjectName: "pageLoading",
                load: "1"

            }



            container.html('<img src="/Content/custom/img/loader.gif" style="width:80px;" />');

            //setTimeout(function () {
            //    mApp.unblock("",this);
            //}, 2000);




            var ___settings = jQuery.extend({}, defaultSettings, settings);

            var baseUrl = gez('body').attr("data-url");
            baseUrl = baseUrl.split("/")
            if (baseUrl[3] != "") {
                ___settings.url = "/" + baseUrl[3] + ___settings.url;
            }


            container.attr("data-load-url", ___settings.url)
            container.attr("data-load-data", JSON.stringify(___settings.data))



            gez.callMethod({
                isReturnValue: true,
                type: ___settings.type,
                url: (___settings.url.indexOf('?') > -1) ? ___settings.url + "&___layout" : ___settings.url + "?___layout",
                data: ___settings.data,
                addUrl: true,
                dataType: "html",
                contentType: ___settings.contentType,
                connectionError: ___settings.error,
                loadingObjectName: ___settings.loadingObjectName,
                load: ___settings.load,
                loadContainer: container,
                success: function (data) {

                    container.html(gez("<html/>").html(data).html());
                    ____loadMethodsCall();

                    if (___settings.success != null) {

                        ___settings.success();

                    }

                },
                error: function (xhr, textStatus, error) {

                    alert("hata");
                }
            });
            return container;
        }

        /*
        * View Multi Loading
        */
        gez.fn.loadMultiView = function (settings) {
            var container = gez(this);
            var defaultSettings = {
                items: {},
                loadingObjectName: "pageLoading"
            }
            var ___settings = jQuery.extend({}, defaultSettings, settings);

            ___settings.items.each(function () {
                loadView();
            });
            return container;
        }



        gez.fn.date = function (settings, minDate, maxDate) {
            var min = gez(this).attr("minValue");
            var max = gez(this).attr("maxValue");
            var defaultSettings = {
                defaultDate: "+1w",
                showOn: "button",
                buttonImage: "/Content/images/calendar.gif",
                buttonImageOnly: true,
                changeMonth: true,
                numberOfMonths: 1,
                onClose: null,
                minDate: null,
                maxDate: null
            }

            /*   belirtilmeyen özellikler varsayılan ayarlara göre düzenleniyor   */
            var ___settings = jQuery.extend({}, defaultSettings, settings);

            jQuery(this).datepicker(___settings);

            if (min)
                jQuery(this).datepicker("option", "minDate", minDate);

            if (max)
                jQuery(this).datepicker("option", "maxDate", maxDate);

            if (minDate)
                jQuery(this).datepicker("option", "minDate", minDate);

            if (maxDate)
                jQuery(this).datepicker("option", "maxDate", maxDate);

        }


        /*
        *Attribute göre control arama metodu geriye list döner
        */
        gez.fn.findByAttr = function (name, value) {
            var _res = [];
            gez(this).each(function () {
                if (gez(this).attr(name) == value) {
                    _res.push(this);
                }
            });
            return gez(_res);
        }

        gez.fn.createMask = function () {
            var _ctrl = gez(this);
            var clientType = _ctrl.attr("clientType");
            var mask = _ctrl.attr("maskoptions");
            var settings = gez(this).getMaskSettings(clientType, mask);

            if (clientType == 2) {
                _ctrl.dateMask("Dd.Mm.Yyyy");
            } else if (clientType == 5) {
                _ctrl.numeric({ negative: false, decimal: false }, numberInvalid);
            } else {
                _ctrl.autoNumeric('init', settings);
            }

        }

        function numberInvalid() {
            gez(this).val("");
        }

        gez.fn.getMaskSettings = function (clientType, useroptions) {

            var defaults = {};
            var options;

            if (clientType == 4)
                defaults = { vMax: '2147483647', vMin: '-2147483648', mDec: '0', aSep: '.', aDec: ',', aNeg: '-' };
            else if (clientType == 11)
                defaults = { vMax: '2147483647', vMin: '0', mDec: '0', aSep: '.', aDec: ',', aNeg: '' };
            //else if (clientType == 5)
            //    defaults = {  mDec: '0', aSep: '' };
            else if (clientType == 7) {
                defaults = { mDec: '2', aSep: '.', aDec: ',', aNeg: '-', vMin: '-79228162514264337593543950335' };
            }
            else if (clientType == 9) {
                defaults = { mDec: '2', aSep: '.', aDec: ',', aNeg: '', vMin: '0' };
            }

            if (!useroptions || useroptions == null)
                return defaults;

            try {
                options = JSON.parse(useroptions);
            } catch (e) {
                console.log(e);
            }

            var settings = gez(this).extend({}, defaults, options);

            return settings;
        }


        gez.fn.createMasks = function () {

            var body = gez(this);
            var controls = body.find("input,textarea");

            gez.each(controls, function () {
                var _ctrl = gez(this);

                var name = _ctrl.attr("name");

                if (name) {

                    var clienttype = _ctrl.attr("clienttype");

                    switch (parseInt(clienttype)) {
                        //TCKimlik                
                        case 4: {
                            _ctrl.createMask();
                            break;
                        }
                        case 7: {
                            _ctrl.createMask();
                            break;
                        }
                        case 9: {
                            _ctrl.createMask();
                            break;
                        }
                    }
                }
            });

        }

        gez.fn.createValidate = function () {

            var form = gez(this);
            var controls = form.find("input,textarea,select");
            var validate = {
                rules: {
                }
            }

            var validateString = "";
            gez.each(controls, function () {
                var _ctrl = gez(this);
                var name = _ctrl.attr("name");
                var required = _ctrl.attr("required");
                var clienttype = _ctrl.attr("clienttype");

                if (name) {

                    validateString += "\"" + name + "\" : { ";

                    if (required) {
                        validateString += " \"required\" : true ";
                    } else {
                        validateString += " \"required\" : false ";
                    }

                    switch (parseInt(clienttype)) {
                        //Sayı
                        case 0: {
                            validateString += ", \"digits\" : true ";
                            break;
                        }
                        //Telefon
                        case 1: {
                            //validateString += ", \"phoneUS\" : true ";
                            $(this).inputmask("mask", {
                                "mask": "(999) 999-99-99"
                            });
                            break;
                        }

                    }

                    validateString += " },";

                }
            });

            validate.rules = JSON.parse("{" + validateString.substr(0, validateString.length - 1) + "}");


            form.validate(validate);

        }

        function isValidDate(date) {
            var bits = date.split('.');
            var d = new Date(bits[2], bits[1] - 1, bits[0]);
            return d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]);
        }


        $.validator.addMethod('money', function (value, element) {

            return this.optional(element) || gez(element).data('autoNumeric').numRegAutoStrip.test(value);
        }, 'Geçerli bir değer giriniz.');

        jQuery.validator.addMethod('positivenumber', function (value, element) {

            return this.optional(element) || gez(element).data('autoNumeric').numRegAutoStrip.test(value);
        }, 'Geçerli bir değer giriniz.');

        jQuery.validator.addMethod('gezDateISO', function (value, element) {

            if (value == "__.__.____" || !value) {
                return true;
            }
            var _ctrl = gez(element);

            if (!isValidDate(value)) {
                gez(element).val("");
                return false;
            }

            var minValue = _ctrl.attr("minValue");
            var maxValue = _ctrl.attr("maxValue");
            if (minValue) {
                var minDate = new Date(minValue.split("-")[0], parseInt(minValue.split("-")[1]) - 1, minValue.split("-")[2]);
                var curDate = new Date(value.split(".")[2], parseInt(value.split(".")[1]) - 1, value.split(".")[0]);
                if (curDate.getTime() < minDate.getTime()) {
                    gez(element).val("");
                    return false;
                }
            }

            if (maxValue) {
                var maxDate = new Date(maxValue.split("-")[0], parseInt(maxValue.split("-")[1]) - 1, maxValue.split("-")[2]);
                var curDate = new Date(value.split(".")[2], parseInt(value.split(".")[1]) - 1, value.split(".")[0]);
                if (curDate.getTime() > maxDate.getTime()) {
                    gez(element).val("");
                    return false;
                }
            }

            return this.optional(element) || /(\d{2}\.\d{2}\.\d{4})/g.test(value) || /(\d{1}\.\d{1}\.\d{4})/g.test(value);

        }, 'Geçerli bir tarih girmelisiniz.');

        jQuery.validator.setDefaults({
            errorPlacement: function (error, element) {

                if (element.attr("clientType") && parseInt(element.attr("clientType")) == 2) {
                    error.insertAfter(element.next());
                } else {
                    error.insertAfter(element);
                }
            },

        });

        gez.fn.checkValidate = function () {
            var _ctrl = gez(this);
            switch (parseInt(_ctrl.attr("clienttype"))) {
                //TCKimlik
                case 0: {
                    _ctrl.removeAttr("validate");
                    gez.callMethod({
                        url: "/home/IsTcKimlik/" + gez(this).val(),
                        contentType: "json",
                        success: function (data) {
                            if (data == true) {
                                _ctrl.attr("validate", "true");
                            } else {
                                _ctrl.attr("validate", "false");
                            }
                        }
                    });
                    break;
                }
                //Telefon
                case 1: {
                    break;
                }
                //Tarih
                case 2: {
                    break;
                }
                //Metin
                case 3: {
                    break;
                }
                //Sayı
                case 4: {
                    break;
                }
            }

        }

        /*
        * Formu serialize etmek için kullanılır geriye string data döner
        */
        gez.fn.serializeForm = function () {


            var _cValue = [];
            //form içerisindeki input ve select kontrollerini seçiyoruz
            var _c = gez(this).find("input,select,textarea");
            gez(this).createValidate();
            var formselector = gez(this).attr("id");
            var nameList = [];
            var validationControls = true;
            //controllerin name attributelarını bir lsitede topluyoruz

            gez(_c).each(function (item) {
                //gez(_c[item]).change();
                // IE7 de desteklenmiyor IndexOF
                //if (nameList.indexOf(gez(_c[item]).attr("name")) < 0 && gez(_c[item]).attr("name") != undefined) {
                if (jQuery.inArray(gez(_c[item]).attr("name"), nameList) < 0 && gez(_c[item]).attr("name") != undefined) {

                    nameList.push(gez(_c[item]).attr("name"));
                }
                if (gez(_c[item]).not(':hidden').length > 0 && gez(_c[item]).valid() == 0) {
                    validationControls = false;
                }
            });
            if (validationControls == true) {

                //elimizdeki control isimleri için tek tek değerleri topluyoruz
                for (var item in nameList) {

                    //eğer isim sonunda "_multiselect" ifadesi yer alıyorsa bu kontrol multi select oluşturulmuştur.
                    //o sebeple dikkate alınmıyor çünkü multi select değerlerini hidden üzerinde tutuyor ayrıca o değer hidden kontrolünden alınacak
                    //detaylı bilgi için multi select fonksiyonunu inceleyiniz
                    if (nameList[item].indexOf("Rd_") < 0) {
                        //nesne için property modeli oluşturuyoruz
                        var _cVal = { name: nameList[item], value: "" };
                        //bu isme ait değeri okuyup modele yerleştiriyoruz
                        var htmlObj = gez("#" + formselector + " *[name='" + nameList[item] + "']");

                        var multiple = htmlObj.attr("multiple");

                        if (multiple != undefined)
                            _cVal.isMultiselect = true;

                        _cVal.value = gez(htmlObj[0]).val();
                        _cValue.push(_cVal);
                    } else {

                        debugger;
                        var _cVal = { name: nameList[item], value: "" };
                        //bu isme ait değeri okuyup modele yerleştiriyoruz
                        var htmlObj = gez("#" + formselector + " *[name='" + nameList[item] + "']:checked");

                        var multiple = htmlObj.attr("multiple");

                        if (multiple != undefined)
                            _cVal.isMultiselect = true;

                        _cVal.value = gez(htmlObj[0]).val();
                        _cValue.push(_cVal);


                    }
                }
                var result = gez(_cValue).serializeObject()
                return JSON.stringify(result);
            } else {
                return null;
            }
            return result;
        }

        gez.Stringify = function (obj) {
            try {
                return JSON.stringify(obj);
            } catch (err) {
                return obj;
            }
        }

        gez.JSONparse = function (obj) {
            try {
                return JSON.parse(obj);
            } catch (err) {
                return obj;
            }
        }

        gez.Extend = function (defaultValue, Value) {
            return jQuery.extend({}, defaultValue, Value);
        }

        gez.fn.getValue = function () {

            switch (this.prop("tagName")) {
                case "TEXTAREA": {
                    //var res = gez(this).val();

                    if (gez(this).attr("geztexteditor") == "true") {

                        var res = tinyMCE.get(gez(this).attr("id")).getContent({ format: 'text' });
                        return res;
                        break;
                    }
                    var res = gez(this).val();

                    //if (gez(this).prop("multiple") == false && res=="") {
                    //    return null;
                    //}
                    return res;

                    break;
                }
                case "SELECT": {
                    //var res = gez(this).multiselect("getChecked");
                    //if (gez(this).multiselect("multiple") == true) {
                    //    var _resArray = [];
                    //    gez(res).each(function () {
                    //        _resArray.push(gez.JSONparse(this.value));
                    //    });
                    //    return _resArray;
                    //}
                    //return res.val();
                    var res = gez(this).val();
                    return res;
                    break;
                }
                case "INPUT": {
                    switch (gez(this).attr("type")) {
                        case "checkbox": {
                            var res = gez("*[name='" + gez(this).attr("name") + "']");
                            var checkedVal = gez.JSONparse(this[0].checked); //[];
                            //gez(res).each(function () {
                            //    if (this.checked) {
                            //        checkedVal.push(gez.JSONparse(this.value));
                            //    }
                            //});
                            return checkedVal;
                            break;
                        }
                        case "radio": {
                            var res = gez("*[name='" + gez(this).attr("name") + "']");
                            var optVal = "";
                            gez(res).each(function () {
                                if (this.checked) {
                                    optVal = this.value;
                                    return;
                                }
                            });
                            return gez.JSONparse(optVal);
                            break;
                        }
                        default: {
                            var clientType = gez(this).attr("clientType")

                            if (clientType != null && clientType != undefined && (clientType == "4" || clientType == "11" || clientType == "7" || clientType == "9")) {
                                var val = gez(this).autoNumeric('get');
                                // geçersiz değerler gelmesi durumu için yapıldı
                                if (val == 0 && (clientType == "7" || clientType == "9"))
                                    gez(this).autoNumeric('set', 0);

                                return val == '' ? 0 : val;

                            }
                            else
                                return gez.JSONparse(gez(this).val());
                            break;
                        }
                    }
                    break;
                }
                default: {
                    return gez.JSONparse(gez(this).val());
                    break;
                }
            }
        }

        gez.fn.setValue = function (attr) {
            if (this[0].tagName == "SELECT") {
                if (gez(this).prop("multiple") == true) {
                    gez(attr).each(function () {
                        gez(this).val(this);
                    });
                }
                else {
                    gez(this).val(attr);
                }
                gez(this).multiselect("refresh");
            }
            else if (this[0].tagName == "INPUT") {
                var clientType = gez(this).attr("clientType")

                if (clientType != null && clientType != undefined && (clientType == "4" || clientType == "11" || clientType == "7" || clientType == "9")) {

                    gez(this).autoNumeric('set', attr)
                }
                //if(type == null || type )
            }
        }

        gez.fn.serializeObject = function (arr) {

            if (!arr) {
                arr = {}
            }
            var root = this;
            gez.each(root, function () {
                var names = this.name.split('.');
                if (names.length > 1) {
                    arr[names[0]] = gez(root).getListByName(names[0]).serializeObject({});
                } else {
                    if (this.isMultiselect) {
                        arr[this.name] = (this.value != undefined) ? this.value : null;
                    }
                    else
                        arr[this.name] = ((this.value != undefined) && (this.value != null)) ? this.value : '';
                }
            });
            return arr;
        };

        gez.fn.getListByName = function (name) {
            var resList = [];
            var thisList = this;
            for (var i = 0; i < thisList.length; i++) {
                if (thisList[i].name.split('.')[0] == name) {
                    var temp = { name: thisList[i].name.replace(name + '.', ''), value: thisList[i].value, isMultiselect: thisList[i].isMultiselect };
                    resList.push(temp);
                }
            }
            return jQuery(resList);
        };



        gez.fn.clearForm = function () {
            gez(this).find("input,select,textarea").each(function () {
                var defaultValue = jQuery(this).attr("defaultValue");
                if (!defaultValue || defaultValue != undefined || defaultValue == null) {
                    defaultValue = "";
                }
                switch (this.tagName) {
                    case "input":
                        {
                            switch (gez(this).attr("type")) {
                                case "checkbox": {
                                    jQuery(this).removeAttr("checked");
                                    if (defaultValue != "") {
                                        if (gez(this).val() == defaultValue) {
                                            gez(this).prop("checked", true);
                                        }
                                    }
                                    break;
                                }
                                case "radio": {
                                    jQuery(this).removeAttr("checked");
                                    if (defaultValue != "") {
                                        if (gez(this).val() == defaultValue) {
                                            gez(this).prop("checked", true);
                                        }
                                    }
                                    break;
                                }
                                case "button": {
                                    jQuery(this).val(defaultValue);
                                    break;
                                }
                            }
                            break;
                        }
                    case "SELECT": {
                        gez(this).each(function () {
                            gez(this).select2('val', '')
                        });
                        break;
                    }
                    default: {
                        if (gez(this).attr("type") != "button") {
                            jQuery(this).val(defaultValue);
                        }
                        break;
                    }
                }
            });
        };

        ____loadMethodsCall();


    }

    ____onScriptsLoaded();

}

onLmsLoaded();