
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var initialValues = {};
function loadOk() {

    gez("[data-loadview]").each(function () {
        gez(this).loadView({
            url: "/" + $(this).data("controller") + "/" + $(this).data("loadview")
            //data: { id: data_rowid, parentid: data_parentid, extra: data_extra }
        });
    });


    gez("[data-aut-load]").each(function () {

        var elm = $(this);

        var loadUrl = elm.attr("data-aut-load");

        $(elm).loadView({
            url: loadUrl,
            success: function () {
                drSelected();

            }
        });

    });

}

// Selected verilerini set eder.
// data-dr-selected attr ile gelen idli option seçilir.
function drSelected() {

    gez("[data-dr-selected]").each(function () {


        var secid = $(this).attr("data-dr-selected");
        //console.log(secid);

        $(this).find("option[value='" + secid + "']").attr("selected", "selected");

        //$(this).selectpicker('refresh');
    });

}

$(document).ready(function () {
    $("[tabindex]").removeAttr("tabindex");
});

gez.load(function () {

    gez(document).on("click", ".btnSelectRemove", function () {


        var id = $(this).data("rowid");
        var sellersIds = $("#hddId").val();

        gez.callMethod({
            url: "/Sellers/SellerAreaSubSave?id=" + id + "&sellersId=" + sellersIds,
            success: function (result) {
                if (result.status) {

                    gez.Uyari({
                        type: "success",
                        title: "Uyarı!",
                        message: result.message
                    });

                    $("#divPoolTable").loadView({
                        url: "/Sellers/AreaSelectFormPoolTable?id=" + gez("#drArea").val() + "&sellersId=" + sellersIds
                    });

                    $("#divSellerTable").loadView({
                        url: "/Sellers/AreaSelectFormSellersTable?id=" + sellersIds
                    });

                }
                else {

                    gez.Uyari({
                        type: "error",
                        title: "Bir hata oluştu!",
                        message: result.message
                    });
                }
            }
        });
    });

    gez(document).on("click", ".btnSelect", function () {

        var id = $(this).data("rowid");
        var sellersIds = $("#hddId").val();

        gez.callMethod({
            url: "/Sellers/SellerAreaSubSave?id=" + id + "&sellersId=" + sellersIds,
            success: function (result) {
                if (result.status) {

                    gez.Uyari({
                        type: "success",
                        title: "Uyarı!",
                        message: result.message
                    });

                    $("#divPoolTable").loadView({
                        url: "/Sellers/AreaSelectFormPoolTable?id=" + gez("#drArea").val() + "&sellersId=" + sellersIds
                    });

                    $("#divSellerTable").loadView({
                        url: "/Sellers/AreaSelectFormSellersTable?id=" + sellersIds
                    });


                }
                else {

                    gez.Uyari({
                        type: "error",
                        title: "Bir hata oluştu!",
                        message: result.message
                    });
                }
            }
        });


    });

    $(document).on('hidden.bs.modal', '[id^=modal_]', function (e) { $("#" + e.target.id).parent().remove(); });

    $(document).on('hidden.bs.modal', function (e) {


        //console.log("modal kapatıldı.");




    });



    $(document).on("click", ".scoDiv", function () {

        $(".tdFirst").remove();

        var imei = $(this).attr("data-imei");
        var rowid = $(this).attr("data-rowid");


        if ($(".hddImei[value='" + imei + "']").length > 0) {
            return;
        }

        var img = "<img style='width:20px' src='../../../img/icons/scooter/charging.svg' />";

        if ($("#drStatus").val() == 3) {
            img = "<img style='width:20px' src='../../../img/icons/scooter/maintenance.svg' />";
        }

        var txt = "<input type='hidden' class='hddImei' value='" + rowid + "' />";

        var btn = "<button  type='button' class='btn btnScoDelete btn-xs btn-outline-danger'> <span class='tf-icons ti-xs ti ti-trash me-1'></span></button>";
        $("#tableContent").prepend("<tr><td>" + imei + "</td><td>" + btn + txt + "</td></tr>");

        setTimeout(function () {

            nameEdit();

        }, 100);


    });


    $(document).on("click", ".btnScoDelete", function () {

        $(this).parent().parent().remove();
        nameEdit();
    });

    $(document).on("change", "#drStatus", function () {

        $("#tableContent").html('');

    });

    function nameEdit() {

        var strList = "";

        $(".hddImei").each(function (e) {
            strList = strList + $(this).val() + ",";
        });

        $("#hddScooterImeiList").val(strList);
    }



    gez(document).on("click", "#_treeKume .galerisec", function () {



        var rowid = gez(this).data("rowid");

        if (rowid == 0) {

            return;
        }
    

        gez.callMethod({
            url: "/SoruBankasi/KumeSoruTanimla/",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: { soruId: $("#SoruId").val(), kumeId: rowid },  // durum 1 ekle
            success: function (result) {
                if (result.Status) {

                    gez.Uyari({
                        type: "success",
                        title: "Uyarı!",
                        message: result.Message
                    });

                }
                else {

                    gez.Uyari({
                        type: "error",
                        title: "Bir hata oluştu!",
                        message: result.Message
                    });
                }
            }
        });



    });

    if ($.cookie != undefined) {

        if ($.cookie("intro") != "0") {




            swal.fire({
                title: "Yardım",
                text: "Kısa bir tanıtım turuna katılmak istermisiniz",
                type: "info",
                showCancelButton: true,
                confirmButtonClass: "btn-success",
                confirmButtonText: "Evet",
                cancelButtonText: "Bir Daha Gösterme",
                cancelButtonClass: "btnGosterme",
                closeOnConfirm: true
            },
                function () {

                    introJs().start();



                });


        }

    }







    gez(document).on("click", "[data-load-mtd]", function () {


        var div = gez(this).attr("data-load-div");
        var mtd = gez(this).attr("data-load-mtd");
        var formid = gez(this).attr("data-load-formid");



        // saçma sapan işler
        //if ($(".txtDate").length > 0) {

        //    $(".txtDate").each(function () {

        //        if ($(this).val() != null && $(this).val() != undefined) {
        //            var tarih = $(this).val().split('.');
        //            $(this).val(tarih[1] + "." + tarih[0] + "." + tarih[2])
        //        }

        //    })
        //}


        var data = gez("#" + formid).serialize();

        if (!$("#" + formid).valid()) {

            setTimeout(function () { gez.loadStop(); }, 100)
            return;

        }

        $("#" + div).loadView({
            url: '/' + mtd,
            data: data
        });


    })

    gez(document).on("click", "[data-modal-mtd]", function () {

        var alert = gez(this).data("alert");
        var modalid = gez(this).data("modal-id");
        var mtd = gez(this).data("modal-mtd");
        var formid = gez(this).data("modal-formid");
        var reLoadDiv = gez(this).data("modal-reloaddiv");
        var reLoadDiv2 = gez(this).data("modal-reloaddiv2");
        var clicked = gez(this).data("modal-clicked");

        // Metin editörü varsa
        if ($(".snote").length > 0) {
            $(".snote").each(function () {
                var data = $(this).parent().find(".note-editable").html();
                $(this).parent().find("input").attr("value", data);
            })
        }

        if ($("[contenteditable]").length > 0) {

            $("#txtDetay").val($("#txtEditable").html());

        }


        if ($(".inlineEditor").length > 0) {
            $(".inlineEditor").each(function () {

                var data = $(this).html();
                $(this).parent().find("input").attr("value", data);
            })
        }


        if ($("[data-name]").length > 0) {
            $("[data-name]").each(function () {

                if ($(this).parent().find(".hdnName").length > 0) {

                    $(this).parent().find(".hdnName").val($(this).attr("src"));

                }
                else {
                    $(this).parent().append("<input type='hidden' name='" + $(this).attr("data-name") + "' class='hdnName' value='" + $(this).parent().find("img").attr("src") + "' />");
                }
            })
        }

        setTimeout(function () {



            var data = gez("#" + formid).serializeForm();

            console.log(data);

            if (!$("#" + formid).valid()) {

                setTimeout(function () { gez.loadStop(); }, 100)
                return;

            }


            gez.callMethod({
                url: '/' + mtd,
                data: data,
                //contentType: "application/json;charset=utf-8",
                success: function (result) {

                    gez.loadStop();

                    if (result.status) {

                        toastr["success"](result.message, "İşlem Başarılı");

                        $("#" + modalid).modal("hide")


                        if (reLoadDiv != "" && reLoadDiv != undefined) {


                            gez.reLoad({ container: reLoadDiv });

                            gez.reLoad({ container: reLoadDiv2 });


                            if (alert != null && alert != "" && alert != undefined) {

                                toastr["success"](result.alert, "İşlem Başarılı");
                            }
                        }

                        if (clicked != "" && clicked != undefined) {
                            $("#" + clicked).click();
                        }

                    }
                    else {
                        toastr["warning"](result.message, "Hata olustu");
                    }
                }
            });

        }, 50);




    })

    gez(document).on("click", ".upFile", function () {

        gez(".onUpdate").removeClass("onUpdate");

        gez(this).addClass("onUpdate");

        gez.ModalOlustur({
            modal_id: "modal_upFile",
            modal_header_title: "Dosya Yükleme Formu",
            url: "/GenAdmin/DosyaYukleForm",
            size: "",
            style: "width:500px;",
            buttons: "ok"

        });

    })


    gez(document).on("click", ".upImageAdmin", function () {

        gez(".onUpdate").removeClass("onUpdate");

        gez(this).addClass("onUpdate");

        gez.ModalOlustur({
            modal_id: "modal_upImage",
            modal_header_title: "Resim Yükleme Formu",
            url: "/Admin/ResimYukleForm",
            size: "",
            style: "width:500px;",
            buttons: "ok"

        });

    });








    // html attr yardımıyla method çalıştırma 
    gez(document).on("click", "[data-mtd]", function () {


        var cont = gez(this).data("controller");
        var mtd = gez(this).data("mtd");
        var rowid = gez(this).data("rowid");
        var queryString = gez(this).data("querystring");
        var reload = gez(this).data("reload");

        var fullUrl = "";
        if (queryString == "" || queryString == undefined || queryString == null) {
            fullUrl = "/" + cont + "/" + mtd + "/" + rowid;
        } else {
            fullUrl = "/" + cont + "/" + mtd + "/" + rowid + queryString;
        }


        gez.callMethod({
            url: fullUrl,
            success: function (result) {
                if (result.status) {





                    Swal.fire({
                        title: 'İşlem Başarılı',
                        text: result.message,
                        type: 'success',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        confirmButtonText: 'Tamam',
                        buttonsStyling: false
                    })

                    if ($(".btnServiceOk[data-rowid='" + rowid + "']").length > 0) {
                        $(".btnServiceOk[data-rowid='" + rowid + "']").remove();
                    }

                    if ($(".divServiceStatus[data-rowid='" + rowid + "']").length > 0) {
                        $(".divServiceStatus[data-rowid='" + rowid + "']").html("<span style='color:forestgreen;' class='tf-icons ti-md ti ti-check me-1'></span> Tamamlandı");
                    }

                    if (reload != null && reload != undefined && reload != "")
                    {
                        gez.reLoad({
                            container: reload
                        });
                    }



                } else {


                    Swal.fire({
                        title: 'Hata Oluştu',
                        text: result.message,
                        type: 'danger',
                        icon: 'danger',
                        confirmButtonText: 'Tamam',
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        },
                        buttonsStyling: false
                    })



                }
            }
        });



    })


    gez(document).on("click", "[data-proc='remove']", function (e) {

        var btn = $(this);
        e.preventDefault();

        var func = $(this).data("func");
        var rowid = $(this).data("rowid");
        var parentid = $(this).data("parentid");
        var openUrl = $(this).data("open-url");
        var row = $(this).parent().parent();
        var parent = $(this).data("parent");
        var queryStr = $(this).data("querystring");
        var btntext = $(this).data("btntext");
        var btncls = $(this).data("btncls");
        var reLoadDiv = $(this).data("reloaddiv");


        if (parent != "" && parent != undefined && parent != null) {

            switch (parseInt(parent)) {
                case 1:
                    row = $(this).parent();
                    break;
                case 2:
                    row = $(this).parent().parent();
                    break;
                case 3:
                    row = $(this).parent().parent().parent();
                    break;
                case 4:
                    row = $(this).parent().parent().parent().parent();
                    break;
                case 5:
                    row = $(this).parent().parent().parent().parent().parent();
                    break;

            }
        }


        var list = $(this).data("list");
        var uyari = $(this).data("uyari");
        var iconStatus = $(this).data("icons");

        if (uyari == "" || uyari == undefined) {
            uyari = "Silmek istediğinize emin misiniz?";
        }

        if (iconStatus == "" || iconStatus == undefined) {
            iconStatus = "warning";
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Lütfen işlemi onaylayın?",
            text: uyari,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Evet, sil!",
            cancelButtonText: "Hayır, iptal!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    type: "POST",
                    url: "/" + func + "?Id=" + rowid + "&parentId=" + parentid + "&" + queryStr,
                    success: function (result) {


                        if (result.status) {
                            Swal.fire({
                                title: 'İşlem Başarılı',
                                text: "Kayıt başarı ile silindi.",
                                type: 'success',
                                icon: 'success',
                                customClass: {
                                    confirmButton: 'btn btn-primary'
                                },
                                confirmButtonText: 'Tamam',
                                buttonsStyling: false
                            })


                            if (parent != 99) {
                                row.remove();
                            }

                            if (reLoadDiv != "" && reLoadDiv != undefined) {
                                impark.reLoad({ container: reLoadDiv })
                            }


                            //if (btntext != null && btntext != "undefined") {

                            //    btn.html(btntext);
                            //}

                            if (btncls != null && btncls != "undefined" && btncls != "") {

                                if (btn.hasClass("btn-danger")) {

                                    btn.removeClass("btn-danger").addClass("btn-success");
                                    btn.html("<img src='/flaticon/unlock.svg' style='width:30px;' />");

                                } else {
                                    btn.removeClass("btn-success").addClass("btn-danger");
                                    btn.html("<img src='/flaticon/lock.svg' style='width:30px;' />");

                                }



                            }

                            if (openUrl != null && openUrl != undefined && openUrl != "") {

                                window.location.href = openUrl;
                            }

                        } else {

                            Swal.fire({
                                type: "danger",
                                title: 'Hata!',
                                text: result.Message,
                                confirmButtonClass: 'btn btn-danger',

                            });

                        }


                    },
                    dataType: 'json'
                });






            } else if (

                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel


            ) {
                Swal.fire({
                    title: 'İptal Edildi',
                    text: "kayıt güvende :)",
                    type: 'warning',
                    icon: 'warning',
                    customClass: {
                        confirmButton: 'btn btn-primary'
                    },
                    confirmButtonText: 'Tamam',
                    buttonsStyling: false
                })



            }


        });






    });

    gez(document).on("click", "#btnCacheRemove", function () {



        gez.callMethod({
            url: "/Home/OutputCacheRemove/",
            success: function (result) {
                if (result) {

                    gez.Uyari({
                        type: "success",
                        title: "Uyarı!",
                        message: "Önbellek temizlendi."
                    });


                }
            }
        });


    });




    //history.pushState('', document.title, location.pathname);



    $(document).on('click', '.loadBtn', function () {


        $(this).addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);


    })

    $(document).on('click', '.fancybox', function (e) {

        event.preventDefault();


    })


    $(document).on("click", ".btnMapsZoom", function () {

        var btnElm = $(this);

        var selectStatus = btnElm.attr("data-select");
        console.log(selectStatus);


        var lat = btnElm.attr("data-lat");
        var lng = btnElm.attr("data-lng");

        if (selectStatus == "ok") {

            map.setCenter(new google.maps.LatLng(parseFloat($("#txtLatitude").val()), parseFloat($("#txtLongitude").val())));
            map.setZoom(13);

            $("[data-select]").attr("data-select", "");

            //for (var i = 0; i < makerList.length; i++) {

            //    makerList[i].setMap(null);
            //}

            //scooterLoad();


        } else {

            map.setCenter(new google.maps.LatLng(lat, lng));
            map.setZoom(16);

            btnElm.attr("data-select", "ok");

            //for (var i = 0; i < makerList.length; i++) {

            //    makerList[i].setMap(null);
            //}


            //var imei = $(this).attr("data-name");

            //scooterLoad(imei);
        }




    });

    $(document).on('click', '.viewBtn,[data-view],[data-ajax]', function (e) {



        e.preventDefault();



        if ($(this).hasClass("menu-link")) {
            $(".menu-item").removeClass("active");
            $(this).parent().addClass("active");
        }



        //history.pushState('', document.title, location.pathname);

        gez(".sp-container").remove();
        gez(".redactor-toolbar-tooltip").remove();

        var data_controller = $(this).attr("data-controller");
        var data_view = $(this).attr("data-view");
        var data_type = $(this).attr("data-type");
        var data_style = $(this).attr("data-style");
        // Eğer data-type: Div olarak seçilirse view bu belirtilen div içerisine yüklenir.
        var data_div = $(this).attr("data-div");
        var data_querystring = $(this).attr("data-querystring");

        if (data_querystring == undefined || data_querystring == null) {
            data_querystring = "";
        }

        // Sadece modal için
        var cancel_text = $(this).attr("data-canceltext");
        var save_text = $(this).attr("data-savetext");
        var modal_title = $(this).attr("data-title");
        var modal_size = $(this).attr("data-size");
        var modal_buttons = $(this).attr("data-buttons");
        var modal_style = $(this).attr("data-style");
        var data_rowid = $(this).attr("data-rowid");
        var data_parentid = $(this).attr("data-parentid");
        var data_extra = $(this).attr("data-extra");

        if (data_extra == undefined || data_extra == null) {
            data_extra = "";
        }
        if (data_parentid == undefined || data_parentid == null) {
            data_parentid = "";
        }
        var data_ajax = $(this).data("ajax");
        var href = $(this).attr("href");
        var data_ajax_update = $(this).attr("data-ajax-update");

        if (data_type == "Modal") {

            gez.ModalOlustur({
                modal_id: "modal_" + data_controller + "_" + data_view,
                modal_header_title: modal_title,
                url: "/" + data_controller + "/" + data_view + data_querystring,
                data: { id: data_rowid, parentid: data_parentid, extra: data_extra },
                size: modal_size,
                style: modal_style,
                buttons: modal_buttons,
                cancelText: cancel_text,
                saveText: save_text
            });

            $("#" + "modal_" + data_controller + "_" + data_view + " .modal-body").attr("data-load-controller", data_controller);
            $("#" + "modal_" + data_controller + "_" + data_view + " .modal-body").attr("data-load-view", data_view)
            $("#" + "modal_" + data_controller + "_" + data_view + " .modal-body").attr("data-load-data", '{ "id": "' + data_rowid + '", "parentid": "' + data_parentid + '", "extra": "' + data_extra + '" }');


        }
        else if (data_type == "Div") {



            if (data_div == "" || data_div == undefined) {
                data_div = "content-load";
            }

            $("#" + data_div).attr("data-load-controller", data_controller);
            $("#" + data_div).attr("data-load-view", data_view)
            $("#" + data_div).attr("data-load-data", "{ id: " + data_rowid + ", parentid: " + data_parentid + ", extra: " + data_extra + " }")


            gez("#" + data_div).loadView({
                url: "/" + data_controller + "/" + data_view + data_querystring,
                data: { id: data_rowid, parentid: data_parentid, extra: data_extra },
                success: function () {

                    if ($('#saveForm').length>0) {
                       
                        $('#saveForm').find('input').each(function () {
                            initialValues[this.name] = $(this).val();
                        });
                    }

                 


                }
            });


        } else if (data_ajax == true) {


            gez(data_ajax_update).loadView({
                url: href,
                error: function (err) {
                    gez.Uyari({
                        type: "error",
                        title: "Uyarı!",
                        message: err.responseText.replace('"', '').replace('"', '')
                    });
                }
            });


        } else {

            gez("#content-load").loadView({
                url: "/" + data_controller + "/" + data_view + data_querystring,
                data: { id: data_rowid, parentid: data_parentid },
                error: function (err) {
                    gez.Uyari({
                        type: "error",
                        title: "Uyarı!",
                        message: err.responseText.replace('"', '').replace('"', '')
                    });
                }
            });
        }
        // Tree üzerinde seçilen elemanın değerini body de sakla
        if ($('#tree_1').length > 0) $('body').attr("data-tree-selected", $('.jstree-clicked').data("rowid"));

        if (data_style == "1") {
            $('#secili_slayt').val($(this).data("rowid"));
        }
    })


    // ############################################################## EFE ##############################################################

    // ########################################## TIKLANMA ##########################################
    $(document).on("click", ".btnLeftMenu", function () {

        $(".leftMenuSelected").removeClass("leftMenuSelected");

        $(this).addClass("leftMenuSelected");
    });

    // ########################################## EXCEL ##########################################
    $(document).on('submit', '#uploadForm', function (event) {
        event.preventDefault();

        var formData = new FormData(this);
        var fileInput = $(this).find('input[type="file"]');

        if (fileInput[0].files.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Uyarı!',
                text: 'Lütfen bir Excel dosyası yükleyin.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        Swal.fire({
            title: 'Emin misiniz?',
            text: 'Bu işlemi geri alamazsınız.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, işlemi yap',
            cancelButtonText: 'Hayır, iptal et'
        }).then((result) => {
            if (result.isConfirmed) {
                // URL'yi text değerine göre ayarla
                var text = $('#tableName').text();
                var url = (function () {
                    switch (text) {
                        case "LL28H TABLOSU":
                            return '/Admin/ImportFromExcel';  // LL28H için URL
                        case "LL28N TABLOSU":
                            return '/Admin/ImportFromExcel';  // LL28N için URL
                        case "LL18H TABLOSU":
                            return '/Admin/ImportFromExcel';  // LL18H için URL
                        case "LL18N TABLOSU":
                            return '/Admin/ImportFromExcel';  // LL18N için URL
                        case "LLK TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLK için URL
                        case "LLB33 TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLB33 için URL
                        case "LLI TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLI için URL
                        case "LLIH TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLIH için URL
                        case "LLFS8 TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLFS8 için URL
                        case "LLS TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLS için URL
                        case "LLKP TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLKP için URL
                        case "LLCRN TABLOSU":
                            return '/Admin/ImportFromExcel';  // LLCRN için URL
                        case "SABİT MALİYET TABLOSU":
                            return '/Admin/ImportFromExcel';  // SABİT MALİYET için URL
                        case "PROFİL AĞIRLIĞI TABLOSU":
                            return '/Admin/ImportFromExcel';  // PROFİL için URL
                        case "LL18H REÇETE":
                            return '/Admin/ImportFromExcelRecipe';  // LL18H Reçete için URL
                        default:
                            throw new Error(`Bilinmeyen Profil Tipi: ${text}`);
                    }
                })();
                $.ajax({
                    url: url,  
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: response.message,
                                timer: 3000,
                                showConfirmButton: false
                            }).then(() => {
                                $('.leftMenuSelected').click();
                            });
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Uyarı!',
                                text: response.message || "Bilinmeyen bir hata oluştu!",
                                timer: 3000,
                                showConfirmButton: false
                            }).then(() => {
                                $('.leftMenuSelected').click();
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX hatası:", status, error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Hata!',
                            text: 'Bir hata oluştu.',
                            timer: 3000,
                            showConfirmButton: false
                        }).then(() => {
                            $('.leftMenuSelected').click();
                        });
                    }
                });
            }
        });
    });

    // ########################################## KAYDET ##########################################
    $(document).on('submit', '#saveForm', function (event) {

        event.preventDefault();

        var formData = new FormData(this);

        var hasChanges = false;

        formData.forEach((value, key) => {
            if (initialValues[key] !== value) {
                hasChanges = true;
            }
        });

        if (!hasChanges) {
            Swal.fire({
                icon: 'warning',
                title: 'Uyarı!',
                text: 'Herhangi bir değişiklik yapmadınız.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        Swal.fire({
            title: 'Emin misiniz?',
            text: 'Bu işlemi geri alamazsınız.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Evet, işlemi yap',
            cancelButtonText: 'Hayır, iptal et'
        }).then((result) => {
            if (result.isConfirmed) {
                // URL'yi text değerine göre ayarla
                var text = $('#tableName').text();
                var url = '';
                switch (text) {
                    case "LL28H TABLOSU":
                        url = '/Admin/LL28HEdit';  // LL28H için URL
                        break;

                    case "LL28N TABLOSU":
                        url = '/Admin/LL28NEdit';  // LL28N için URL ekleyin (örnek)
                        break;

                    case "LL18H TABLOSU":
                        url = '/Admin/LL18HEdit';  // LL18H için URL ekleyin (örnek)
                        break;

                    case "LL18N TABLOSU":
                        url = '/Admin/LL18NEdit';  // LL18N için URL ekleyin (örnek)
                        break;

                    case "LLK TABLOSU":
                        url = '/Admin/LLKEdit';  // LLK için URL
                        break;

                    case "LLB33 TABLOSU":
                        url = '/Admin/LLB33Edit';  // LLB33 için URL ekleyin (örnek)
                        break;

                    case "LLI TABLOSU":
                        url = '/Admin/LLIEdit';  // LLI için URL ekleyin (örnek)
                        break;

                    case "LLIH TABLOSU":
                        url = '/Admin/LLIHEdit';  // LLIH için URL ekleyin (örnek)
                        break;

                    case "LLFS8 TABLOSU":
                        url = '/Admin/LLFS8Edit';  // LLFS8 için URL ekleyin (örnek)
                        break;

                    case "LLS TABLOSU":
                        url = '/Admin/LLSEdit';  // LLS için URL ekleyin (örnek)
                        break;

                    case "LLKP TABLOSU":
                        url = '/Admin/LLKPEdit';  // LLKP için URL ekleyin (örnek)
                        break;

                    case "LLCRN TABLOSU":
                        url = '/Admin/LLCRNEdit';  // LLCRN için URL ekleyin (örnek)
                        break;

                    case "SABİT MALİYET TABLOSU":
                        url = '/Admin/CostConstansTableEdit';  // SABİT MALİYET için URL ekleyin (örnek)
                        break;

                    case "PROFİL AĞIRLIĞI TABLOSU":
                        url = '/Admin/ProfileTableEdit';  // PROFİL için URL ekleyin (örnek)
                        break;

                    case "LL18H REÇETE":
                        url = '/Admin/LL18HPropertyEdit';  // PROFİL için URL ekleyin (örnek)
                        break;

                    default:
                        throw new Error(`Bilinmeyen Profil Tipi: ${text}`);  // Bilinmeyen profil tipi için hata fırlat
                }
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Başarılı!',
                                text: response.message,
                                timer: 3000,
                                showConfirmButton: false
                            }).then(() => {
                                $('.leftMenuSelected').click();
                            });
                        } else {
                            let warnings = response.messages || [response.message];

                            if (warnings.length > 0) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Uyarı!',
                                    text: warnings[0] || "Bilinmeyen bir hata oluştu!",
                                    timer: 3000,
                                    showConfirmButton: false
                                }).then(() => {
                                    $('.leftMenuSelected').click();
                                });
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX hatası:", status, error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Hata!',
                            text: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                            timer: 3000,
                            showConfirmButton: false
                        }).then(() => {
                            $('.leftMenuSelected').click();
                        });
                    }
                });
            }
        });
    });
});




