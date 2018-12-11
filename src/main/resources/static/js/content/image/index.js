layui.use('flow', function(){
    var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
    var flow = layui.flow;

    flow.lazyimg({
        elem: '#demo' //指定列表容器
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
            var lis = [];
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            $.get('/image/'+page , function(res){
                //假设你的列表返回在data集合中
                layui.each(res.list, function(index, item){

                    var src = 'http://mpic.spriteapp.cn/x/640x400/ugc/2018/12/10/5c0e789d8f84f_1.jpg';

                    lis.push('<li><img lay-src="'+ src +'"></li>');

                });

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < res.pages);
            });
        }
    });
});

function previewImg(obj) {
    var img = new Image();
    img.src = obj.src;
    alert(img.src);
    var imgHtml = "<img src='" + obj.src + "' />";
    //捕获页
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        //area:['600px','500px'],
        area: [600+'px', 480+'px'],
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
        }
    });
}