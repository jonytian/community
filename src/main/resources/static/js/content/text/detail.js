layui.use('flow', function(){
    var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
    var flow = layui.flow;

    var artId= $("#test").val();

    flow.load({
        elem: '#jieda' //指定列表容器
        ,isAuto:true
        ,mb:100
        ,isLazying:true
        ,end:'<p style="color:red">木有了</p>'
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
            var lis = [];
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            $.get('comments/'+page ,{ artId: artId}, function(res){
                //假设你的列表返回在data集合中
                layui.each(res.list, function(index, item){
                    lis.push(
                        '<li data-id="111">'+
                        '<a name="item-1111111111">'+'</a>'+
                        '<div class="detail-about detail-about-reply">'+
                        '<a class="fly-avatar" href="">'+
                        '<img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt=" ">'+
                        '</a>'+
                        '<div class="fly-detail-user">'+
                        '<a href="" class="fly-link">'+
                        '<cite>'+'贤心'+'</cite>'+
                        '</a>'+
                        '</div>'+
                        '<div class="detail-hits">'+
                        '<span>'+'2017-11-30'+'</span>'+
                        '</div>'+
                        '</div>'+
                        '<div class="detail-body jieda-body photos">'+
                        '<p>'+'蓝瘦那个香菇，这是一条没被采纳的回帖'+'</p>'+
                        '</div>'+
                        '<div class="jieda-reply">'+
                        '<span class="jieda-zan" type="zan">'+
                        '<i class="iconfont icon-zan">'+'</i>'+
                        '<em>'+'0'+'</em>'+
                        '</span>'+
                        '<span type="reply">'+
                        '<i class="iconfont icon-svgmoban53">'+'</i>'+
                         '回复'+
                        '</span>'+
                        '<div class="jieda-admin">'+
                        '<span type="edit">'+'编辑'+'</span>'+
                        '<span type="del">'+'删除'+'</span>'+
                        '<span class="jieda-accept" type="accept">'+'采纳'+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</li>'
                    );
                });

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < res.pages);
            });
        }
    });
});

