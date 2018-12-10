package com.tyj.community.controller;

import com.tyj.community.constant.WebConst;
import com.tyj.community.controller.admin.AuthController;
import com.tyj.community.dto.LogActions;
import com.tyj.community.entity.RestResponseBo;
import com.tyj.community.entity.UserVo;
import com.tyj.community.exception.TipException;
import com.tyj.community.service.ILogService;
import com.tyj.community.service.IUserService;
import com.tyj.community.utils.IStatusMessage;
import com.tyj.community.utils.ResponseResult;
import com.tyj.community.utils.TaleUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.Subject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by tyj on 2018/12/03.
 */

@Controller
public class UserController extends BaseController{
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private IUserService usersService;
    @Autowired
    private ILogService logService;

    /**
     * 用户登录
     * @return
     */
    @RequestMapping("/login")
    public String login() {

        return this.render("user/login");
    }

    /**
     * 登录
     * @param user
     * @param rememberMe
     * @return
     */
    @RequestMapping(value = "login", method = RequestMethod.POST)
    @ResponseBody
    public RestResponseBo login(
            UserVo user,
            @RequestParam(value = "rememberMe", required = false) boolean rememberMe,
            HttpServletRequest request, HttpServletResponse response) {
        Integer error_count = cache.get("login_error_count");
        try {
            user = usersService.login(user.getUsername(), user.getPassword());
            request.getSession().setAttribute(WebConst.LOGIN_SESSION_KEY, user);
            if (rememberMe) {
                TaleUtils.setCookie(response, user.getId());
            }
            logService.insertLog(LogActions.LOGININDEX.getAction(), null, request.getRemoteAddr(), user.getId());
        } catch (Exception e) {
            error_count = null == error_count ? 1 : error_count + 1;
            if (error_count > 3) {
                return RestResponseBo.fail("您输入密码已经错误超过3次，请10分钟后尝试");
            }
            cache.set("login_error_count", error_count, 10 * 60);
            String message = "登录失败";
            if (e instanceof TipException) {
                message = e.getMessage();
            } else {
                LOGGER.error(message, e);
            }
            return RestResponseBo.fail(message);
        }
        return RestResponseBo.ok();
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
     * 注册
     * @param user
     * @return
     */
    @RequestMapping(value = "register", method = RequestMethod.POST)
    @ResponseBody
    public RestResponseBo register(
            UserVo user,
            HttpServletRequest request, HttpServletResponse response) {

        try {
            Integer register  = usersService.insertUser(user);
            logService.insertLog(LogActions.REGINDEX.getAction(), null, request.getRemoteAddr(), user.getId());
        } catch (Exception e) {
            String message = "注册失败";
            if (e instanceof TipException) {
                message = e.getMessage();
            } else {
                LOGGER.error(message, e);
            }
            return RestResponseBo.fail(message);
        }
        return RestResponseBo.ok();
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
