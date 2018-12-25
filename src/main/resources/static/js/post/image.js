layui.use('flow', function(){
    var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
    var flow = layui.flow;

    flow.load({
        elem: '.j-r-list' //指定列表容器
        ,isAuto:true
        ,mb:100
        ,isLazying:true
        ,end:'<p style="color:red">木有了</p>'
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
            var lis = [];
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            $.get('image/'+page , function(res){
                var img =['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg',
                    'images/5.jpg','images/6.jpg','images/7.jpg','images/8.jpg',
                    'images/11.jpg','images/12.jpg','images/13.jpg'];

                //假设你的列表返回在data集合中
                layui.each(res.list, function(index, item){
                    lis.push(
                        '<li>'+
                        <!--用户信息-->
                        '<div class="j-list-user">'+
                        '<div class="u-img">'+
                        '<a href="/user/home" target="_blank">'+
                        '<img class="u-logo lazy" src="http://mpic.spriteapp.cn/profile" data-original="http://mpic.spriteapp.cn/profile" alt="取之最右"/>'+
                        '</a>'+
                        '</div>'+
                        '<div class="u-txt">'+
                        '<a href="/user/home" class="u-user-name" target="_blank">'+ item.author +'</a>'+
                        '<span class="u-time  f-ib f-fr">'+ '2018-12-12 11:32:01' +'</span>'+
                        '</div>'+
                        '</div>'+

                        '<div class="j-r-list-c">'+
                        <!--因为头像单独占位 所以内容需要 移动 一个头像高度 30px+间距10px -->
                        <!--描述 段子 直接 只有它 宽度440 高度416-->
                        '<div class="j-r-list-c-desc">'+
                        '<a href="/detail-28993523.html">'+ item.title +'</a>'+
                        '</div>'+
                        '<div class="j-r-list-c-img">'+
                        '<a href="/detail-28993523.html">'+
                        '<img src="'+img[index]+'" class="lazy" data-original="" title="可以试试！" alt="可以试试！"/>'+
                        '</a>'+
                        '</div>'+
                        '</div>'+

                        <!--操作工具条-->
                        '<div class="j-r-list-tool" data-type="10" data-video_mlen="" data-id="28993523" data-title="可以试试！" data-date="2018-12-12" ' +
                        'data-time="11:32" data-playcount="0" data-playfcount="0" >'+
                        '<div class="j-r-list-tool-l " data-id="28993523">'+
                        '<ul>'+
                        '<li class="j-r-list-tool-l-up">'+
                        '<i class="icon-up ui-icon-up">'+'</i>'+'<span>'+'71'+'</span>'+
                        '</li>'+
                        '<li class="j-r-list-tool-l-down ">'+
                        '<i class="icon-down">'+'</i>'+'<span>'+'23'+'</span>'+
                        '</li>'+
                        '</ul>'+
                        '</div>'+
                         <!--分享-->
                        '<div class="j-r-list-tool-ct">'+
                        '<div class="j-r-list-tool-ct-share-c">'+
                        '<span>'+'分享'+ '</span>'+
                        '</div>'+
                        '<div class="j-r-list-tool-ct-fx">'+
                        '<div class="bdsharebuttonbox fx-bd-28993523" data-id="28993523" data-url="/detail-28993523.html" ' +
                        'data-pic="http://mpic.spriteapp.cn/ugc/2018/12/11/5c0ea62708458_1.jpg" data-text="可以试试！">'+
                        '<a href="javascript:void(0);" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">'+'</a>'+
                        '<a href="javascript:void(0);" class="bds_weixin" data-cmd="weixin" title="分享到微信">'+'</a>'+
                        '<a href="javascript:void(0);" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">'+'</a>'+
                        '<a href="javascript:void(0);" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">'+'</a>'+
                        '<a class="bds_more" data-cmd="more">'+'</a>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        <!-- 评论收藏 -->
                        '<div class="j-r-list-tool-r j-r-list-tool-cc">'+
                        '<ul>'+
                        '<li style="display: none" class=" f-tar j-collect j-collect-width  j-collect-down-width">'+
                        '<i class="icon-cc">'+'</i>'+
                        '</li>'+
                        '<li class=" f-tac j-comment j-comment-width  j-comment-down-width">'+
                        '<a href="/detail-28993523.html#comment" class="j-list-comment" target="_blank">'+
                        '<i class="icon-comment ">'+'</i>&nbsp;<span class="comment-counts">'+'157'+'</span>'+'</a>'+
                        '</li>'+
                        '</ul>'+
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

