package com.poscodx.kanbanboard.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.poscodx.kanbanboard.vo.TaskVo;

@Repository
public class TaskRepository {
	@Autowired
	private SqlSession sqlSession;

	public List<TaskVo> findAll() {
		return sqlSession.selectList("task.findAll");
	}

	public int insert(TaskVo vo) {
		return sqlSession.insert("task.insert", vo);
	}
	
	public void deleteByNo(Long no) {
		sqlSession.delete("task.deleteByNo", no);
	}

	public void update(TaskVo vo) {
		sqlSession.update("task.update", vo);
	}

	public List<TaskVo> findByCardNo(Long cardNo) {
		return sqlSession.selectList("task.findByCardNo",cardNo);
	}
}