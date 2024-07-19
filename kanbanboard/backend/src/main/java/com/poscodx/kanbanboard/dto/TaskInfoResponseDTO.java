package com.poscodx.kanbanboard.dto;

import com.poscodx.kanbanboard.vo.TaskVo;

import lombok.Builder;

@Builder
public record TaskInfoResponseDTO (
	Long no,
	String name,
	String done,
	String cardNo
) {
	public static TaskInfoResponseDTO of(
			 TaskVo task
	) {
		 return TaskInfoResponseDTO.builder()
				 .no(task.getNo())
				 .name(task.getName())
				 .done(task.getDone())
				 .cardNo(task.getCardNo())
				 .build();
	 }
}
