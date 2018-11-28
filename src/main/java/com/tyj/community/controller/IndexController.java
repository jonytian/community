package com.tyj.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 首页
 * Created by tyj on 2018/11/27.
 */

@Controller
public class IndexController {

    @RequestMapping("/")
    String index(){
        return "themes/index";
    }
}
