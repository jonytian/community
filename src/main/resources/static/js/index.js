layui.use('flow', function(){
    var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
    var flow = layui.flow;

    flow.load({
        elem: '.fly-list' //指定列表容器
        ,isAuto:true
        ,mb:100
        ,isLazying:true
        ,end:'<p style="color:red">木有了</p>'
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
            var lis = [];
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            $.get('image/'+page , function(res){
                //假设你的列表返回在data集合中
                layui.each(res.list, function(index, item){
                    lis.push(
                        '<li>'+
                        '<a href="user/home.html" class="fly-avatar">'+
                        '<img src="https://tva1.sinaimg.cn/crop.0.0.118.118.180/5db11ff4gw1e77d3nqrv8j203b03cweg.jpg" alt="贤心">'
                        +
                        '</a>'+

                        '<h2>'+
                        '<a class="layui-badge">'+'公告'+'</a>'+
                        '<a href="jie/detail.html">'+item.title+'</a>'+
                        '</h2>'+


                        '<div class="fly-list-info">'+
                        '<a href="user/home.html" link>'+
                        '<cite>'+item.author+'</cite>'+
                        '</a>'+
                        '<span>'+'2018-12-09'+'</span>'+

                        '<span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻">'+'<i class="iconfont icon-kiss">'+'</i>'+ item.hits+'</span>'+
                        '<span class="fly-list-nums">'+
                        '<i class="iconfont icon-pinglun1" title="回答">'+'</i>'+ 66+
                        '</span>'+
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

