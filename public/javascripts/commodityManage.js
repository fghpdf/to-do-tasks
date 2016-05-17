$(document).ready(function () {
    //查看订单细节
    $("button.ui.tiny.teal.button").click(function() {
        //获取ID
        var purchaseId = $(this).parent().parent().children().eq(0).text();
        $.ajax({
            data: {
                purchaseId: purchaseId
            },
            url:'/commodityManage/detailQuery',
            type: 'POST',
            success: function(data) {
                if(data.success) {
                    location.href = '/commodityManage/detail?purchaseId=' + data.purchaseId;
                } else {
                    alert("订单错误");
                }
            },
            error: function() {
                alert("出现错误");
            }
        });
    });
    //删除商品
    $("button.negative.ui.tiny.button").click(function() {
        var deleteCommodityId = $(this).parent().parent().children().eq(0).text();
        var deleteCommodityName = $(this).parent().parent().children().eq(1).text();
        var choice = confirm("将要删除:" + deleteCommodityName + "\n订单商品不会变化，请注意");
        if(choice == true) {
            $.ajax({
                data: {
                    deleteCommodityId: deleteCommodityId
                },
                url:'/commodityManage/deleteCommodity',
                type: 'POST',
                success: function(data) {
                    if(data.success) {
                        alert("删除成功");
                        window.location.reload();
                    } else {
                        $('#adminTable').html('失败');
                    }
                },
                error: function() {
                    alert("删除失败");
                }
            });
        } else {
            alert("取消删除");
        }
    });

    //更改商品信息
    $("button.ui.tiny.blue.button").click(function() {
        var commodityId = $(this).parent().parent().children().eq(0).text();
        var commodityName = $(this).parent().parent().children().eq(1).text();
        var choice = confirm("将要更改:" + commodityName + "\n订单商品不会变化，请注意");
        if(choice == true) {
            location.href = "/commodityManage/commodityUpdate?commodityId=" + commodityId;
        } else {
            alert("取消更改");
        }
    });

    //更改url，保含commodityId
    var commodityId = getUrlParam('commodityId');
    $("form#commodityUpdateForm").attr('action', 'commodityUpdate/' + commodityId);


    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });

    //文件上传预览
    $("#commodityImages").change(function() {
        var $file = $(this);
        var fileObj = $file[0];
        var windowURL = window.URL || window.webkitURL;
        var dataURL;
        var $img = $("#preview");

        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img.attr('src',dataURL);
        }else{
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

    //获得url里参数的值，name就是参数
    function getUrlParam(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);

        if (r != null) {

            return unescape(r[2]);

        }

        return null;
    }
});