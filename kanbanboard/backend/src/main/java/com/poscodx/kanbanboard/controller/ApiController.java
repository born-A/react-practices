package com.poscodx.kanbanboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poscodx.kanbanboard.dto.JsonResult;
import com.poscodx.kanbanboard.repository.TaskRepository;
import com.poscodx.kanbanboard.service.TaskService;
import com.poscodx.kanbanboard.vo.TaskVo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class ApiController {

	@Autowired
	private TaskService taskService;
	
	@GetMapping("/api")
	public ResponseEntity<JsonResult> read() {
		log.info("Request[GET /api]");
		
		return ResponseEntity
					.status(HttpStatus.OK)
					.body(JsonResult.success(taskService.getCards()));
	}
	
//	@PostMapping("/api")
//	public ResponseEntity<JsonResult> create(@RequestBody TaskVo vo) {
//		log.info("Request[POST /api]:" + vo);
//		
//		taskRepository.insert(vo);
//		
//		return ResponseEntity
//					.status(HttpStatus.OK)
//					.body(JsonResult.success(vo));
//	}
//	
//	@DeleteMapping("/api/delete/{no}")
//	public void delete(@PathVariable Long no) {
//		taskRepository.deleteByNo(no);
//	}
//	
//	@PutMapping("/api/update")
//	public ResponseEntity<JsonResult> update(@RequestBody TaskVo vo) {
//		log.info("Request[PUT /api]:" + vo);
//		
//		taskRepository.update(vo);
//		
//		return ResponseEntity
//				.status(HttpStatus.OK)
//				.body(JsonResult.success(vo));
//	}
}