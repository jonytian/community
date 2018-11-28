package com.tyj.community.controller;

import com.github.pagehelper.PageInfo;
import com.tyj.community.constant.WebConst;
import com.tyj.community.dto.cond.ContentCond;
import com.tyj.community.entity.index.Content;
import com.tyj.community.service.ContentService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

/**
 * 首页
 * Created by tyj on 2018/11/27.
 */

@Controller
public class IndexController {

    @Autowired
    private ContentService contentService;

    @ApiOperation("社区主页")
    @GetMapping(value = {"", "/"})
    public String index(HttpServletRequest request, @RequestParam(value = "limit", defaultValue = "12") int limit) {
        return this.index(1, limit, request);
    }

    @ApiOperation("社区主页-分页")
    @GetMapping(value = "/photo/page/{p}")
    public String index(
            @ApiParam(name = "page", value = "页数", required = false)
            @PathVariable(name = "p")
                    int page,
            @ApiParam(name = "limit", value = "条数", required = false)
            @RequestParam(name = "limit", required = false, defaultValue = "9999")
                    int limit,
            HttpServletRequest request
    ){
        page = page < 0 || page > WebConst.MAX_PAGE ? 1 : page;
        ContentCond contentCond = new ContentCond();
        contentCond.setType("");
        PageInfo<Content> articles = contentService.getArticlesByCond(contentCond, page, limit);
        request.setAttribute("archives", articles);
        request.setAttribute("active", "work");
        return "themes/index";
    }


}
