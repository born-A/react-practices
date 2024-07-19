package com.poscodx.kanbanboard.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class CardTasksFullDTO {
	private List<CardTasksResponseDTO> cardTasksResponseDTO;
	public CardTasksFullDTO(List<CardTasksResponseDTO> cardTasksResponseDTO) {
		this.cardTasksResponseDTO = cardTasksResponseDTO;
	}
}
