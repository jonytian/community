package com.tyj.community.service;

import com.github.pagehelper.PageInfo;
import com.tyj.community.dto.cond.ContentCond;
import com.tyj.community.entity.index.Content;

/**
 * 文章服务层
 * Created by tyj on 2018/11/28.
 */
public interface ContentService {

    /**
     * 添加文章
     * @param contentDomain
     * @return
     */
    void addArticle(Content contentDomain);

    /**
     * 根据编号删除文章
     * @param cid
     * @return
     */
    void deleteArticleById(Integer cid);

    /**
     * 更新文章
     * @param contentDomain
     * @return
     */
    void updateArticleById(Content contentDomain);

    /**
     * 更新分类
     * @param ordinal
     * @param newCatefory
     */
    void updateCategory(String ordinal, String newCatefory);



    /**
     * 添加文章点击量
     * @param content
     */
    void updateContentByCid(Content content);

    /**
     * 根据编号获取文章
     * @param cid
     * @return
     */
    Content getAtricleById(Integer cid);

    /**
     * 根据条件获取文章列表
     * @param contentCond
     * @return
     */
    PageInfo<Content> getArticlesByCond(ContentCond contentCond, int pageNum, int pageSize);

    /**
     * 获取最近的文章（只包含id和title）
     * @param pageNum
     * @param pageSize
     * @return
     */
    PageInfo<Content> getRecentlyArticle(int pageNum, int pageSize);

    /**
     * 搜索文章
     * @param param
     * @param pageNun
     * @param pageSize
     * @return
     */
    PageInfo<Content> searchArticle(String param, int pageNun, int pageSize);
}

