package com.poscodx.kanbanboard.dto;


import com.poscodx.kanbanboard.vo.CardVo;

import lombok.Builder;

@Builder
public record CardInfoResponseDTO (
    Long no,
	String title,
	String description,
	String status
) {
	 public static CardInfoResponseDTO of(
			 CardVo card
	) {
		 return CardInfoResponseDTO.builder()
				 .no(card.getNo())
				 .title(card.getTitle())
				 .description(card.getDescription())
				 .status(card.getStatus())
				 .build();
	 }
}