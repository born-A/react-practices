package com.poscodx.kanbanboard.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class CardTasksResponseDTO {
    private CardInfoResponseDTO cardInfo;

    private List<TaskInfoResponseDTO> taskInfoList;
    
    public CardTasksResponseDTO(CardInfoResponseDTO cardInfoResponseDTO, List<TaskInfoResponseDTO> tasksByCardNo) {
    	 this.cardInfo = cardInfoResponseDTO;
         this.taskInfoList = tasksByCardNo;
	}
}
