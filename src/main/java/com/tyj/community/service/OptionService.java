package com.tyj.community.service;

import com.tyj.community.entity.OptionVo;

import java.util.List;
import java.util.Map;

/**
 * options的接口
 * Created by tyj on 2018/11/28.
 */
public interface OptionService {

    void insertOption(OptionVo optionVo);

    void insertOption(String name, String value);

    List<OptionVo> getOptions();


    /**
     * 保存一组配置
     *
     * @param options
     */
    void saveOptions(Map<String, String> options);
}
