$(document).ready(function() {
    SpeedUpHandler();
    DialogHandler();
    //FormsHandler();
    CustomHandler();
});

var SpeedUpHandler = function() {
    $(".lazy").lazy({
        combined: true,
        delay: 12500,
        scrollDirection: "vertical",
        visibleOnly: false,
        threshold: 2 * $(window).height(),
        defaultImage: "",
        afterLoad: function(e) {
            e.removeClass("loading").addClass("loaded");
        },
        effect: "fadeIn",
        effectTime: 300
    });
};

var DialogHandler = function() {
    var e = $("#modal-callback");
    function t(t, i) {
        if (i) e.find(t).html(i).show(); else e.find(t).hide();
    }
    function i(t, i) {
        e.find(t).attr("class", "modal-dialog " + i);
    }
    function r(t, i) {
        i = i ? i : "";
        e.find(t).val(i);
    }

    $(".open-callback").click(function(a) {
        a.preventDefault();
        i(".modal-dialog", $(this).data("class"));
        r("#modal-additional", $(this).data("additional"));
        r("#modal-form_type", $(this).data("lp-form-id"));
        r("#modal-goal", $(this).data("goal"));
        r("#modal-fields", $(this).data("fields"));
        t("#modal-title", $(this).data("title"));
        t("#modal-main-title", $(this).data("main-title"));
        t("#modal-of-title", $(this).data("of-title"));
        t("#modal-of-subtitle", $(this).data("of-subtitle"));
        t("#modal-btn", $(this).data("btn"));
        t("#modal-subtitle", $(this).data("subtitle"));
        t("#modal-subtext", $(this).data("subtext"));
        e.find(".order-form").data("result", $(this).data("result") ? $(this).data("result") : "");
        e.find("[id*=mode-]").hide().find("input").attr("readonly", "readonly");
        var n = $(this).data("fields");
        n = n ? n : "USER_NAME,USER_PHONE";
        n = n.split(",");

        $('#modal-callback .modal-content').css('background-image', '');
        if($(this).data("lp-form-id") == 2)
        {
            var bg_content = $('#modal-callback .modal-content').data('bg');
            if(bg_content.length > 0)
            {
                $('#modal-callback .modal-content').css('background-image', 'url(' + bg_content + ')');
            }
        }
        $.each(n, function(t, i) {
            var r = e.find("#mode-" + i);
            r.find("input").removeAttr("readonly");
            r.show();
        });
        e.modal("show");
    });
};

var afterSendExecuted;

/*
var FormsHandler = function() {
    $(".btn-group input").bind("click keyup", function() {
        $(this).removeClass("error").parent().removeClass("error");
    });
    $(".order-form").ajaxForm({
        url: "order.php",
        beforeSubmit: e,
        success: t
    });
    $("input[type=text]").placeholder();
    $('input[name="phone"]').mask("+7 (999) 999-99-99");
    function e(e, i, r) {
        e.push({
            name: "q",
            value: "order.php"
        });
        $(".btn-group .error").removeClass("error").parent().removeClass("error");
        var a = false;
        $.each(e, function(e, t) {
            var r = i.find("input[name=" + t.name + "], textarea[name=" + t.name + "]");
            if (r && r.length && t.type != "hidden" && !t.value && !r.attr("readonly") && !r.hasClass("not-validate") || t.value && t.name == "email" && !r.attr("readonly") && !Util.validateEmail(t.value)) {
                if (r.hasClass("placeholder")) {
                    r.addClass("error").parent().addClass("error");
                } else {
                    r.addClass("error").parent().addClass("error");
                    r.focus();
                }
                a = true;
                return false;
            }
        });
        if (a) return false;
        var n = i.data("result");
        var s = "В течение 5 минут с тобой <br>свяжется наш менеджер";
        $("#modal-result-text").html(n ? n : s);
        $("[type=submit]").attr("disabled", "disabled");
        afterSendExecuted = false;
        setTimeout(function() {
            t(null, null, null, i);
        }, 700);
        return true;
    }
    function t(e, t, i, r) {
        if (afterSendExecuted) return;
        afterSendExecuted = true;
        r.find("input[type=text]").val("");
        $("#modal-callback").modal("hide");
        $("#modal-result").modal("show");
        $("input[type=submit], button[type=submit]").removeAttr("disabled");
    }
};
*/

var CustomHandler = function() {
    if (!$.browser.mobile) {
        $("a[href*=tel]").removeAttr("href");
    }
    var e = $(".wr5 .gallery-wrap .gallery1");
    var t = $(".wr5 .gallery2");
    var i = function() {
        var t = e.find(".items").triggerHandler("currentPage");
        var i = $(".wr5 #3days-day");
        var r = $(".wr5 #3days-title");
        var a = $(".wr5 .progress-wrap");
        if (t <= 3) {
            i.text("1");
            r.text("Знакомство со своими слабостями и их преодоление.");
        }
        if (t >= 4) {
            i.text("2");
            r.text("Работа в команде и забота о близких.");
        }
        if (t >= 7) {
            i.text("3");
            r.text("Избавление от груза прошлого и постановка целей на будущее.");
        }
        if (t == 0) {
            a.find(".progress-round.left").addClass("active");
            a.find(".progress-line.left").addClass("active");
            a.find(".progress-line.left .progress-status").css("width", "16%");
            a.find(".progress-round.center").removeClass("active");
            a.find(".progress-line.right .progress-status").css("width", "0");
            a.find(".progress-round.right").removeClass("active");
        }
        if (t == 1) {
            a.find(".progress-line.left .progress-status").css("width", "50%");
        }
        if (t == 2) {
            a.find(".progress-line.left .progress-status").css("width", "100%");
            a.find(".progress-round.center").removeClass("active");
            a.find(".progress-line.right .progress-status").css("width", "0");
            a.find(".progress-round.right").removeClass("active");
        }
        if (t == 3) {
            a.find(".progress-line.left .progress-status").css("width", "100%");
            a.find(".progress-round.center").addClass("active");
            a.find(".progress-line.right .progress-status").css("width", "20%");
            a.find(".progress-round.right").removeClass("active");
        }
        if (t == 4) {
            a.find(".progress-line.right .progress-status").css("width", "36%");
        }
        if (t == 5) {
            a.find(".progress-line.right .progress-status").css("width", "52%");
        }
        if (t == 6) {
            a.find(".progress-line.right .progress-status").css("width", "68%");
        }
        if (t == 7) {
            a.find(".progress-line.right .progress-status").css("width", "84%");
        }
        if (t == 8) {
            a.find(".progress-line.right .progress-status").css("width", "100%");
            a.find(".progress-round.right").removeClass("active");
        }
        if (t == 9) {
            a.find(".progress-line.left").addClass("active");
            a.find(".progress-line.left .progress-status").css("width", "100%");
            a.find(".progress-round.center").addClass("active");
            a.find(".progress-round.right").addClass("active");
            a.find(".progress-line.right .progress-status").css("width", "100%");
        }
        a.find(".progress-round.left").click(function(t) {
            t.preventDefault();
            e.find(".items").trigger("slideTo", 0);
        });
        a.find(".progress-round.center").click(function(t) {
            t.preventDefault();
            e.find(".items").trigger("slideTo", 7);
        });
        a.find(".progress-round.right").click(function(t) {
            t.preventDefault();
            e.find(".items").trigger("slideTo", 13);
        });
    };
    e.find(".items").carouFredSel({
        synchronise: [ ".wr5 .gallery2 .items", false ],
        circular: false,
        infinite: false,
        auto: false,
        cookie: false,
        items: {
            visible: 1
        },
        scroll: {
            items: 1,
            duration: 300,
            onBefore: i
        },
        prev: {
            button: e.find(".left")
        },
        next: {
            button: e.find(".right")
        },
        align: "center",
        pagination: false,
        onCreate: i
    });
    $(function() {
        var e = t.find(".items");
        for (var i = 0; i < 3; i++) {
            e.prepend("<div />").append("<div />");
        }
        e.carouFredSel({
            synchronise: [ ".wr5 .gallery-wrap .gallery1 .items", false ],
            circular: false,
            infinite: false,
            width: "100%",
            height: 487,
            items: 7,
            auto: false,
            cookie: false,
            scroll: {
                items: 1,
                duration: 300
            },
            swipe: {
                onMouse: true,
                onTouch: true
            },
            pagination: false
        });
    });
    var r = $(".wr6 .e-items .ei-item, .wr18 .faq-items .f-item");
    r.click(function(e) {
        e.preventDefault();
        $(this).find(".text2-wrap.hidden").slideToggle("200");
        $(this).siblings().find(".text2-wrap.hidden").slideUp("200");
        $(this).find(".text1-wrap .arrow").toggleClass("opened");
        $(this).siblings().find(".text1-wrap .arrow").removeClass("opened");
    });
    var a = $("#modal-video");
    var n = $(".wr11 .video-block, .wr13 .video-block");
    n.click(function(e) {
        e.preventDefault();
        a.find(".iframe").html($(this).data("video"));
        if ($.browser.mobile) {
            a.find("iframe").attr("height", $(window).width() * .8 * 315 / 160);
        } else {
            a.find("iframe").attr("height", $(window).width() * .8 * 315 / 560);
        }
        a.modal("show");
    });
    a.on("hide.bs.modal", function() {
        $(this).find(".iframe").html("");
    });
    var s = $("#modal-before-after");
    var l = $(".wr13 .btn-before-after-modal");
    l.click(function(e) {
        e.preventDefault();
        s.modal("show");
    });
    var o = $(".wr13 .gallery-wrap .gallery .items");
    var d = function() {
        var e = o.triggerHandler("currentPage");
        var t = $(".wr13 .progress-wrap");
        var i = $("#wr13_title");
        if (e >= 5) {
            t.find(".progress-line .progress-status").css("width", "100%");
            setTimeout(function() {
                t.find(".progress-round.right").addClass("active");
            }, 300);
            i.html("Отзывы о нас <br>в социальных сетях");
        } else {
            setTimeout(function() {
                t.find(".progress-line .progress-status").css("width", "0");
            }, 300);
            t.find(".progress-round.right").removeClass("active");
            i.html("Результаты участников курса <br>«Спарта. Первый шаг»");
        }
    };
    o.carouFredSel({
        width: 790,
        height: "variable",
        circular: true,
        infinite: true,
        auto: false,
        cookie: false,
        items: {
            visible: 1,
            height: "variable"
        },
        scroll: {
            items: 1,
            duration: 500,
            onBefore: d
        },
        swipe: {
            onMouse: true,
            onTouch: true
        },
        align: "center",
        prev: {
            button: ".wr13 .gallery-wrap .gallery .left"
        },
        next: {
            button: ".wr13 .gallery-wrap .gallery .right"
        },
        pagination: false,
        onCreate: function() {
            setTimeout(function() {
                o.trigger("updateSizes");
            }, 200);
            setTimeout(function() {
                o.trigger("updateSizes");
            }, 3e3);
        }
    });
    o.parent().find(".btn-read-more").click(function(e) {
        e.preventDefault();
        var t = setInterval(function() {
            o.trigger("updateSizes");
        }, 20);
        $(this).fadeOut().parent(".r-text").find(".hidden-content").slideDown(function() {
            clearInterval(t);
        });
    });
    var f = $(".wr14 .video-block");
    f.each(function() {
        $(this).click(function(e) {
            e.preventDefault();
            $(this).find(".cover, .play").hide();
            $(this).find(".iframe").html($(this).data("video"));
        });
    });
    var u = $(".wr14 .gallery-wrap .gallery1");
    var c = $(".wr14 .gallery-wrap .gallery2");
    u.find(".items").carouFredSel({
        synchronise: [ ".wr14 .gallery-wrap .gallery2 .items", false ],
        circular: true,
        infinite: true,
        auto: false,
        cookie: false,
        items: {
            visible: 1
        },
        scroll: {
            fx: "fade",
            items: 1,
            duration: 500
        },
        prev: {
            button: u.find(".left"),
            onAfter: function() {
                u.find(".iframe").html("");
                u.find(".cover, .play").show();
            }
        },
        next: {
            button: u.find(".right"),
            onAfter: function() {
                u.find(".iframe").html("");
                u.find(".cover, .play").show();
            }
        },
        align: "center",
        pagination: false
    });
    c.find(".items").carouFredSel({
        synchronise: [ ".wr14 .gallery-wrap .gallery1 .items", false ],
        circular: true,
        infinite: true,
        auto: false,
        cookie: false,
        items: {
            visible: 1
        },
        direction: "top",
        scroll: {
            fx: "scroll",
            items: 1,
            duration: 500
        },
        align: "center",
        pagination: {
            container: c.find(".pagination"),
            anchorBuilder: function(e) {
                return '<a class="page" href="#' + e + '">' + e + "</a>";
            }
        }
    });
    var g = $(".wr15 .video-block");
    g.click(function(e) {
        e.preventDefault();
        $(this).find(".cover, .play").hide();
        $(this).find(".iframe").html($(this).data("video"));
    });
    var p = $(".wr15 .gallery");
    var h = function() {
        var e = p.find(".g-items");
        var t = e.triggerHandler("currentVisible");
        e.children().removeClass("active");
        t.filter(":eq(2)").addClass("active");
    };
    p.find(".g-items").carouFredSel({
        width: 2560,
        height: 381,
        circular: true,
        infinite: true,
        auto: false,
        cookie: false,
        items: {
            visible: 6
        },
        scroll: {
            items: 1,
            duration: 300,
            onAfter: h
        },
        align: "left",
        prev: {
            button: p.find(".left")
        },
        next: {
            button: p.find(".right")
        },
        pagination: {
            container: p.find(".g-pagination"),
            anchorBuilder: function(e, t) {
                return '<a class="page" href="#' + e + '">' + e + "</a>";
            }
        },
        onCreate: h
    });
    p.find(".g-overlay.left").click(function() {
        p.find(".g-items").trigger("prev");
    });
    p.find(".g-overlay.right").click(function() {
        p.find(".g-items").trigger("next");
    });
    var m = $(".wr17 .gallery-wrap .gallery");
    m.find(".items").carouFredSel({
        width: 691,
        height: "variable",
        circular: true,
        infinite: true,
        auto: false,
        cookie: false,
        items: {
            visible: 2,
            width: "variable",
            height: "variable"
        },
        scroll: {
            items: 1,
            duration: 300
        },
        swipe: {
            onMouse: true,
            onTouch: true
        },
        align: "left",
        prev: {
            button: m.find(".left")
        },
        next: {
            button: m.find(".right")
        },
        pagination: {
            container: m.find(".pagination"),
            anchorBuilder: function(e) {
                return '<a class="page" href="#' + e + '">' + e + "</a>";
            }
        }
    });
    var v = $("#modal-callback").find("#modal-subtext");
    $(".the_moment").click(function() {
        $(".moment").slideUp();
        $(this).addClass("active");
        $(".in-moment").removeClass("active");
        v.slideUp();
    });
    $(".in-moment").click(function() {
        $(".moment").slideDown();
        $(this).addClass("active");
        $(".the_moment").removeClass("active");
        v.slideDown();
    });
    var w = $(".btn-confidential");
    var b = $("#modal-confidential");
    w.click(function(e) {
        e.preventDefault();
        b.modal("show");
    });
};

window.Util = {
    number_format: function(e, t, i, r) {
        e = (e + "").replace(/[^0-9+\-Ee.]/g, "");
        var a = !isFinite(+e) ? 0 : +e, n = !isFinite(+t) ? 0 : Math.abs(t), s = typeof r === "undefined" ? "," : r, l = typeof i === "undefined" ? "." : i, o = "", d = function(e, t) {
            var i = Math.pow(10, t);
            return "" + (Math.round(e * i) / i).toFixed(t);
        };
        o = (n ? d(a, n) : "" + Math.round(a)).split(".");
        if (o[0].length > 3) {
            o[0] = o[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, s);
        }
        if ((o[1] || "").length < n) {
            o[1] = o[1] || "";
            o[1] += new Array(n - o[1].length + 1).join("0");
        }
        return o.join(l);
    },
    validateEmail: function(e) {
        var t = /\S+@\S+\.\S+/;
        return t.test(e);
    },
    plural: function(e, t) {
        return t[e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2];
    }
};