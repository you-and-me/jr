//radio和checkBox的初始化
function init_checkbox(checkbox_Pic) {
    //checkbox
    var check_span = [];
    var check_label = []; //label can click
    var check_input = [];
    //var check_li = document.getElementById(checkbox_Pic).getElementsByTagName("li");
    var check_li = $("." + checkbox_Pic + " li");

    for (var i = 0; i < check_li.length; i++) {
        check_span[i] = check_li[i].getElementsByTagName("span").item(0);
        check_label[i] = check_li[i].getElementsByTagName("label").item(0);
        check_input[i] = check_span[i].getElementsByTagName("input").item(0);
        check_span[i].index = i;
        check_label[i].index = i;
        check_input[i].index = i;
        check_span[i].onclick = check_label[i].onclick = check_input[i].onclick = function () {
            if (check_input[this.index].checked == true) {
                check_input[this.index].checked = false;
                check_span[this.index].className = "checkBox_hidden";
            } else {
                check_input[this.index].checked = true;
                check_span[this.index].className = "checkBox_show";
            }
        };

    }
}

function init_radio(radio_Pic) {
    //radio
    var radio_span = [];
    var radio_input = [];
    var radio_li = $("." + radio_Pic + " li");
    for (var i = 0; i < radio_li.length; i++) {
        radio_span[i] = radio_li[i].getElementsByTagName("span").item(0);
        radio_input[i] = radio_span[i].getElementsByTagName("input").item(0);
        radio_span[i].index = i;
        radio_input[i].index = i;

        radio_span[i].onclick = radio_input[i].onclick = function () {
            radio_empty(this);
            radio_input[this.index].checked = true;
            radio_span[this.index].className = "radio_show";
        };
    }


}

function radio_empty(_this) {
    var name = $(_this).find("input").attr("name");
    $("input[name=" + name + "]").parent().removeClass("radio_show").addClass("radio_hidden");
}

function init_select(select_box) {
    //自制select
    var tag = [];
    for (i = 0; i < $("." + select_box).length; i++) {
        tag[i] = 1;
    }
    $("." + select_box).each(function (index, el) {
        $(this).click(function (event) {
            event.stopPropagation();
            if (tag[index] == 1) {
                $('.option').hide();
                $(this).find(".option").show();
                tag[index] = 2;
            } else {
                $(this).find(".option").hide();
                tag[index] = 1;
            }
        });
    });
    $(document).click(function (event) {
        var eo = $(event.target);
        if ($(".option").is(":visible") && eo.attr("class") != "option" && !eo.parent(".option").length) {
            $('.option').hide();
            for (i = 0; i < $("." + select_box).length; i++) {
                tag[i] = 1;
            }
        }
    });
    /*赋值给文本框*/
    $("." + select_box + " .option a").click(function () {
        var value = $(this).text();

        $(this).parent().siblings(".select_txt").children("em").text(value);
        $(this).parent().siblings(".select_txt").children("input").val(value);
        //$("#select_value").val(value)
    })
}
//------------验证表单
$(function () {
    init_radio("radio_options");
    init_checkbox("checkBox_options");
    init_select("select_box");
    jQuery.validator.addMethod("isSelect1", function (value, element) {
        //alert(value)
        if (value != "请选择") {
            return true;
        } else {
            return false;
        }
    });
    // 联系电话(手机/电话皆可)验证
    jQuery.validator.addMethod("isPhone", function (value, element) {
        if (/^1\d{10}$/g.test(value)) {
            return true;
        } else {
            return false;
        }
    });
    $("form").validate({
        rules: {
            hobby: {
                required: true
            },
            province_name1: {
                required: true,
                isSelect1: true
            },
            phone2: {
                required: true,
                isPhone: true
            },
        },
        messages: {
            hobby: {
                required: "请选择"
            },
            province_name1: {
                required: "请选择",
                isSelect1: "请选择参观前"
            },
            phone2: {
                required: "请填写电话",
                isPhone: "电话格式不正确"
            },
        }
    });
});