$(document).ready(function () {
    $("button#sureDelete").click(function () {
        var deleteAdminEmail = $(this).parent().parent().parent().parent().children().eq(1).text();
        alert(deleteAdminEmail);
    });
    $("a.negative.ui.button").click(function () {
        var deleteAdminName = $(this).parent().parent().children().eq(0).text();
        var deleteAdminEmail = $(this).parent().parent().children().eq(1).text();
        var choice = confirm("将要删除：" + deleteAdminName);
        if (choice == true) {
            $.ajax({
                data: {
                    deleteAdminEmail: deleteAdminEmail
                },
                url: '/adminManage/deleteAdmin',
                type: 'POST',
                success: function (data) {
                    if (data.success) {
                        alert("删除成功");
                        window.location.reload();
                    } else {
                        $('#adminTable').prepend("<div class='alert alert-danger'>" +
                            "<h4>提示!</h4>" +
                            "<strong>警告!</strong>您不是顶级管理员！" +
                            "</div>");
                    }
                },
                error: function (data) {
                    alert("删除失败:" + data.errorMessage);
                }
            });
        }
    });

    $('.ui.dropdown').dropdown();
    $('.message .close').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
    });
});