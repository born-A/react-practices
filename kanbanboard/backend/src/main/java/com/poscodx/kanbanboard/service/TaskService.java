package com.poscodx.kanbanboard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poscodx.kanbanboard.dto.CardInfoResponseDTO;
import com.poscodx.kanbanboard.dto.CardTasksFullDTO;
import com.poscodx.kanbanboard.dto.CardTasksResponseDTO;
import com.poscodx.kanbanboard.dto.TaskInfoResponseDTO;
import com.poscodx.kanbanboard.repository.CardRepository;
import com.poscodx.kanbanboard.repository.TaskRepository;
import com.poscodx.kanbanboard.vo.CardVo;
import com.poscodx.kanbanboard.vo.TaskVo;

@Service
public class TaskService {
	@Autowired
	private CardRepository cardRepository;
	
	@Autowired
	private TaskRepository taskRepository;
	
	public CardTasksFullDTO getCards() {
		List<CardTasksResponseDTO> result = new ArrayList<>();
		List<CardVo> allCards = cardRepository.findAll();
		List<Long> cardIds = allCards.stream()
                .map(CardVo::getNo)
                .collect(Collectors.toList());
		
		for(Long no : cardIds) {
			CardVo card = cardRepository.findById(no);
			CardInfoResponseDTO cardInfoResponseDTO = CardInfoResponseDTO.of(card);
			List<TaskInfoResponseDTO> tasksByCardNo = getTasksByCardNo(no);
			result.add(new CardTasksResponseDTO(cardInfoResponseDTO,tasksByCardNo));
		}
		
		return new CardTasksFullDTO(result);
	}
	
	public List<TaskInfoResponseDTO> getTasksByCardNo(Long cardNo) {
		List<TaskInfoResponseDTO> result = new ArrayList<>();
		List<TaskVo> tasks = taskRepository.findByCardNo(cardNo);
		for(TaskVo task : tasks) {
			TaskInfoResponseDTO taskInfoResponseDTO = TaskInfoResponseDTO.of(task);
			result.add(taskInfoResponseDTO);
		}
		return result;
	}
	
	public int deleteByNo(Long taskNo) {
		return taskRepository.deleteByNo(taskNo);
	}

	public void create(TaskVo vo) {
		taskRepository.insert(vo);
	}

	public void updateDone(Long no, String done) {
		taskRepository.updateDone(no, done);
	}
}
