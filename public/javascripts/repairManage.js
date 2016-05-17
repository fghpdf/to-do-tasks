$(document).ready(function() {
    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

    $('.special.cards .image').dimmer({
        on: 'hover'
    });

    //获得url里参数的值
    function getUrlParam(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);

        if (r != null) {

            return unescape(r[2]);

        }

        return null;
    }

    //文件上传预览
    $("#repairmanImages").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#preview");

        if (fileObj && fileObj.files && fileObj.files[0]) {
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src', dataURL);
        } else {
            dataURL = $file.val();

            // $img.css("filter",'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod = scale,src="' + dataURL + '")');

            // var imgObj = document.getElementById("preview");
            // imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=/"" + dataURL + "/")";
            // imgObj.style.width = "48px";
            // imgObj.style.height = "48px";

            var imgObj = document.getElementById("preview");
            // 两个坑:
            // 1、在设置filter属性时，元素必须已经存在在DOM树中，动态创建的Node，也需要在设置属性前加入到DOM中，先设置属性在加入，无效；
            // 2、src属性需要像下面的方式添加，上面的两种方式添加，无效；
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;

        }
    });

    //获得指派人员页面
    $("button#designateRepairman").click(function() {
        var repairId = $(this).parent().parent().children().eq(0).text();
        location.href = '/repairManage/designateRepairman?repairId=' + repairId;
    });

    //确认指派人员
    $("button#designateSure").click(function() {
        var dom = $(this).parent().parent().parent().parent().parent().children().eq(1).children().eq(1).children();
        var repairmanId = dom.text().substring(5);
        var repairId = getUrlParam('repairId');
        location.href = '/repairManage/designateSure?repairId=' + repairId + '&repairmanId=' + repairmanId;
    });
});