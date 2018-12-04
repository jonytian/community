package com.tyj.community.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by tyj on 2018/12/03.
 */

@Controller
@RequestMapping("/user")
public class UserController extends BaseController{

    /**
     * 用户登录
     * @return
     */
    @RequestMapping("/login")
    public String login() {
        return this.render("user/login");
    }

    /**
     * 用户注册
     * @return
     */
    @RequestMapping("/register")
    public String register() {
        return this.render("user/register");
    }


    /**
     * 用户重置
     * @return
     */
    @RequestMapping("/forget")
    public String forget() {
        return this.render("user/forget");
    }

    /**
     * 激活邮箱
     * @return
     */
    @RequestMapping("/activate")
    public String activate() {
        return this.render("user/activate");
    }

    /**
     * 用户首页
     * @return
     */
    @RequestMapping("/index")
    public String index() {
        return this.render("user/index");
    }
    /**
     * 用户资料
     * @return
     */
    @RequestMapping("/home")
    public String home() {
        return this.render("user/home");
    }
    /**
     * 用户设置
     * @return
     */
    @RequestMapping("/set")
    public String set() {
        return this.render("user/set");
    }
    /**
     * 用户消息
     * @return
     */
    @RequestMapping("/message")
    public String message() {
        return this.render("user/message");
    }

    /**
     * 我的收藏
     * @return
     */
    @RequestMapping("/collection")
    public String collection() {
        return this.render("user/collection");
    }


}
