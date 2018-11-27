/**
 * 产品管理
 */
var pageCurr;
$(function() {
    layui.use(['table','util','form'], function(){
        var table = layui.table
            ,form = layui.form
            ,util = layui.util;
        tableIns=table.render({
            id: 'idTest',
            elem: '#productList'
            ,url:'/product/getProducts'
            ,method: 'post' //默认：get请求
            ,cellMinWidth: 80
            ,page: true,
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            },response:{
                statusName: 'code' //数据状态的字段名称，默认：code
                ,statusCode: 200 //成功的状态码，默认：0
                ,countName: 'totals' //数据总数的字段名称，默认：count
                ,dataName: 'list' //数据列表的字段名称，默认：data
            }
            ,  cols : [ [
                {type:'checkbox'},
                {field : 'accountCode',width : 120,title : '用户名', align: 'center', sort : true},
                {field : 'packageName', width : 210, title : '套餐名称', align: 'center', sort : true},
                {field : 'codestatus', width : 130, title : '订单状态', templet : '#codessta', align: 'center', sort : true},
                {field : 'orderNumber', width : 200, title : '订单号', align: 'center', sort : true},
                {field : 'servName', width : 180, title : '服务名称', align: 'center', sort : true},
                {field:'createTime', title: '下单时间',width: 200,align: 'center' ,templet:function (d) {
                        return   DateUtils.formatDate(d.createTime) ;
                }},
                {field:'servBeginTime', title: '套餐开始时间',width: 200,align: 'center' ,templet:function (d) {
                        return   DateUtils.formatDate(d.servBeginTime) ;
                }},
                {field:'servEndTime', title: '套餐结束时间',width: 200,align: 'center' ,templet:function (d) {
                        return DateUtils.formatDate(d.servEndTime);
                }},
                {field : 'totalCount', title : '套餐总次数', width : 150, align: 'center', sort : true},
                {field : 'lastCount', title : '套餐剩余次数', width : 150, align: 'center', sort : true},
                {field : 'nickName', width : 180, title : '收件人姓名', align: 'center', sort : true},
                {field : 'mobile', width : 180, title : '收件人号码', align: 'center', sort : true},
                {field : 'areas', title : '收货地址', width : 300, align: 'center', sort : true ,templet:function (d) {
                        return d.area+d.address;
                }},
                {field:'createTime', title: '创建时间',width: 200,align: 'center' ,templet:function (d) {
                        return   DateUtils.formatDate(d.createTime) ;
                }},
                {field:'updateTime', title: '更新时间',width: 200,align: 'center' ,templet:function (d) {
                        return DateUtils.formatDate(d.updateTime);
                }}
            ] ],
            done: function(res, curr, count){
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //console.log(res);
                //得到当前页码
                //console.log(curr);
                //得到数据总量
                //console.log(count);
                pageCurr=curr;
            }
        });




        //监听表格复选框选择
        table.on('checkbox(userTable)', function(obj){
            console.log(obj.checked); //当前是否选中状态
        });

        //监听工具条
        table.on('tool(userTable)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                delUser(data,data.id,data.username);
            } else if(obj.event === 'edit'){
                //编辑
                getUserAndRoles(data,data.id);
            }
        });
        //监听提交
        form.on('submit(userSubmit)', function(data){
            // TODO 校验
            formSubmit(data);
            return false;
        });

        var $ = layui.$, active = {
            /**启用*/
            unlockUser: function(){
                var checkStatus = table.checkStatus('idTest')
                    ,data = checkStatus.data;
                if(data.length<1){
                    layer.alert("请选中一条记录！");
                    return false;
                }
                var dataStr = JSON.stringify(data);
                $.ajax({
                    type: "POST",
                    data: {data : dataStr},
                    url: "/user/unlockUser",
                    success: function (data) {
                        if(isLogin(data)){
                            if (data == "ok") {
                                layer.alert("操作成功",function(){
                                    if($("#id").val()==currentUser){
                                        //如果是自己，直接重新登录
                                        parent.location.reload();
                                    }else{
                                        layer.closeAll();
                                        //加载页面
                                        load(data);
                                    }
                                });
                            } else {
                                layer.alert(data,function(){
                                    layer.closeAll();
                                    //加载load方法
                                    load(data);//自定义
                                });
                            }
                        }
                    },
                    error: function () {
                        layer.alert("操作请求错误，请您稍后再试",function(){
                            layer.closeAll();
                            //加载load方法
                            load(obj);//自定义
                        });
                    }
                });
                // layer.alert(JSON.stringify(data));
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            },
            /**禁用*/
            lockUser: function(){ //获取选中数据
                var checkStatus = table.checkStatus('idTest')
                    ,data = checkStatus.data;
                if(data.length<1){
                    layer.alert("请选中一条记录！");
                    return false;
                }
                var dataStr = JSON.stringify(data);
                $.ajax({
                    type: "POST",
                    data: {data : dataStr},
                    url: "/user/lockUser",
                    success: function (data) {
                        if(isLogin(data)){
                            if (data == "ok") {
                                layer.alert("操作成功",function(){
                                    if($("#id").val()==currentUser){
                                        //如果是自己，直接重新登录
                                        parent.location.reload();
                                    }else{
                                        layer.closeAll();
                                        load(data);
                                    }
                                });
                            } else {
                                layer.alert(data,function(){
                                    layer.closeAll();
                                    //加载load方法
                                    load(data);//自定义
                                });
                            }
                        }
                    },
                    error: function () {
                        layer.alert("操作请求错误，请您稍后再试",function(){
                            layer.closeAll();
                            //加载load方法
                            load(obj);//自定义
                        });
                    }
                });
                // layer.alert(JSON.stringify(data));
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            },
            /**批量删除*/
            delUser: function(){ //获取选中数据
                var checkStatus = table.checkStatus('idTest')
                    ,data = checkStatus.data;
                if(data.length<1){
                    layer.alert("请选中一条记录！");
                    return false;
                }
                var dataStr = JSON.stringify(data);
                $.ajax({
                    type: "POST",
                    data: {data : dataStr},
                    url: "/user/deleteUser",
                    success: function (data) {
                        if(isLogin(data)){
                            if (data == "ok") {
                                layer.alert("操作成功",function(){
                                    if($("#id").val()==currentUser){
                                        //如果是自己，直接重新登录
                                        parent.location.reload();
                                    }else{
                                        layer.closeAll();
                                        load(data);
                                    }
                                });
                            } else {
                                layer.alert(data,function(){
                                    layer.closeAll();
                                    //加载load方法
                                    load(data);//自定义
                                });
                            }
                        }
                    },
                    error: function () {
                        layer.alert("操作请求错误，请您稍后再试",function(){
                            layer.closeAll();
                            //加载load方法
                            load(obj);//自定义
                        });
                    }
                });
                // layer.alert(JSON.stringify(data));
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            },
        };

        $('.demoTable .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });



    });
    //搜索框
    layui.use(['form','laydate'], function(){
        var form = layui.form ,layer = layui.layer
            ,laydate = layui.laydate;
        //日期
        laydate.render({
            elem: '#insertTimeStart'
        });
        laydate.render({
            elem: '#insertTimeEnd'
        });
        //TODO 数据校验
        //监听搜索框
        form.on('submit(searchSubmit)', function(data){
            //重新加载table
            load(data);
            return false;
        });
    });
});


/**
 * 重新刷新页面
 * */
function load(obj){
    //重新加载table
    tableIns.reload({
        where: obj.field
        , page: {
            curr: pageCurr //从当前页码开始
        }
    });
}

