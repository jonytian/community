package com.tyj.community.service;

import com.github.pagehelper.PageInfo;
import com.tyj.community.entity.CommentBo;
import com.tyj.community.entity.CommentVo;
import com.tyj.community.entity.CommentVoExample;

import java.util.List;

/**
 * Created by tyj on 2018/11/28.
 */
public interface ICommentService {

    /**
     * 保存对象
     * @param commentVo
     */
    void insertComment(CommentVo commentVo);

    /**
     * 获取文章下的评论
     * @param cid
     * @param page
     * @param limit
     * @return CommentBo
     */
    PageInfo<CommentBo> getComments(Integer cid, int page, int limit);

    /**
     * 获取文章下的评论
     * @param commentVoExample
     * @param page
     * @param limit
     * @return CommentVo
     */
    PageInfo<CommentVo> getCommentsWithPage(CommentVoExample commentVoExample, int page, int limit);


    /**
     * 根据文章id查询评论
     * @param articleId
     * @return
     */
    List<CommentVo> getCommentsByArticleId(Integer articleId);

    /**
     * 根据主键查询评论
     * @param coid
     * @return
     */
    CommentVo getCommentById(Integer coid);


    /**
     * 删除评论，暂时没用
     * @param coid
     * @param cid
     * @throws Exception
     */
    void delete(Integer coid, Integer cid);

    /**
     * 更新评论状态
     * @param comments
     */
    void update(CommentVo comments);

}
