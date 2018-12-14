package com.tyj.community.service;

import com.tyj.community.entity.LogVo;

import java.util.List;

/**
 * Created by tyj on 2018/11/27.
 */
public interface LogService {
    /**
     * 保存操作日志
     *
     * @param logVo
     */
    void insertLog(LogVo logVo);

    /**
     *  保存
     * @param action
     * @param data
     * @param ip
     * @param authorId
     */
    void insertLog(String action, String data, String ip, Integer authorId);

    /**
     * 获取日志分页
     * @param page 当前页
     * @param limit 每页条数
     * @return 日志
     */
    List<LogVo> getLogs(int page, int limit);
}
