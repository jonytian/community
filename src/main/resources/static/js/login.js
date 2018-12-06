/**
 * 登录
 */
var picCode;
$(function(){
    picCode=drawPic();
    layui.use(['form' ,'layer'], function() {
        var form = layui.form;
        var layer = layui.layer;
        //监控提交
        // form.on("submit(sendMsg)",function (data) {
        //     //sendMsg();
        //     var flag=checkParams();
        //     if(flag!=false){
        //         send(this,true);
        //     }
        //     return false;
        // });
        // alert(2);
        form.on("submit(login)",function () {
            login();
            return false;
        });

        var path=window.location.href;
//    	 console.info("==请求的uri:"+path);
        if(path.indexOf("kickout")>0){
            layer.alert("您的账号已在别处登录；若不是您本人操作，请立即修改密码！",function(){
                window.location.href="/login";
            });
        }
    })
});

function login(){
    // var flag=checkParams();
    // var flag=true;
    // if(flag!=false){
    //     //校验短信验证码
    //     var smsCode=$("#smsCode").val();
    //     if("ok"!=ValidateUtils.checkCode(smsCode)){
    //         //tips层-右
    //         layer.tips(ValidateUtils.checkCode(smsCode), '#smsCode', {
    //             tips: [3, '#78BA32'], //还可配置颜色
    //             tipsMore: true
    //         });
    //         return false;
    //     }
    $.post("/user/login",$("#useLogin").serialize(),function(data){
        console.log("data:"+data);
        if(data.success){
            layer.alert("登录成功",function () {
                window.location.href="/";
            });
        }else{
            //$("#password").val("");
            picCode=drawPic();
            $("#code").val("");
            $("#smsCode").val("");
            layer.alert(data.message,function(){
                layer.closeAll();//关闭所有弹框
            });
        }
    });
    // }
}

function checkParams(){
    //  校验
    var username=$("#username").val();
    var password=$("#password").val();
    var mobile=$("#mobile").val();
    var code=$("#code").val();
    if("ok"!=ValidateUtils.checkUserName(username) || "ok"!=ValidateUtils.checkSimplePassword(password)){
        layer.alert("请您输入正确的用户名和密码");
        return false;
    }
    if("ok"!=ValidateUtils.checkMobile(mobile)){
        //tips层-右
        layer.tips(ValidateUtils.checkMobile(mobile), '#mobile', {
            tips: [2, '#78BA32'], //还可配置颜色
            tipsMore: true
        });
        return false;
    }
    if("ok"!=ValidateUtils.checkPicCode(code)){
        //tips层-右
        layer.tips(ValidateUtils.checkPicCode(code), '#canvas', {
            tips: [2, '#78BA32'], //还可配置颜色
            tipsMore: true
        });
        return false;
    }
    if(picCode.toLowerCase()!=code.toLowerCase()){
        //tips层-右
        layer.tips("请您输入正确的验证码", '#canvas', {
            tips: [2, '#78BA32'], //还可配置颜色
            tipsMore: true
        });
        return false;
    }
}