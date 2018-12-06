package com.tyj.community.utils;

import java.util.List;

/**
 * Created by tyj on 2018/08/15.
 */
public class PageDataResult {
	//总数目
	private Integer totalCount;
	//总页数
	private Integer totalPage;
	//每页显示的数量
	private Integer pageSize;
	//数据列表
	private List<?> list;

	public PageDataResult() {
	}

	public PageDataResult(Integer totalCount, Integer totalPage, Integer pageSize, List<?> list) {
		this.totalCount = totalCount;
		this.totalPage = totalPage;
		this.pageSize = pageSize;
		this.list = list;
	}

	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public Integer getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public List<?> getList() {
		return list;
	}

	public void setList(List<?> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "PageDataResult{" +
				"totalCount=" + totalCount +
				", totalPage=" + totalPage +
				", pageSize=" + pageSize +
				", list=" + list +
				'}';
	}
}
