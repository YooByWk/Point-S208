package com.ssafy.backend.domain.donggle.service.impl;

import com.ssafy.backend.domain.donggle.dto.response.DonggleResponseDto;
import com.ssafy.backend.domain.donggle.entity.Donggle;
import com.ssafy.backend.domain.donggle.mapper.DonggleMapper;
import com.ssafy.backend.domain.donggle.repository.DonggleRepository;
import com.ssafy.backend.domain.donggle.service.DonggleService;
import com.ssafy.backend.global.error.exception.DonggleException;
import com.ssafy.backend.global.error.exception.ExceptionType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DonggleServiceImpl implements DonggleService {
	private final DonggleRepository donggleRepository;

	private final DonggleMapper donggleMapper;
	@Override
	public DonggleResponseDto getDonggleMessage(Donggle.Situation situation) {
		Donggle message = donggleRepository.findBySituation(situation).orElseThrow(() -> new DonggleException(ExceptionType.NOT_FOUND_MESSAGE));
		return donggleMapper.toDonggleResponseDto(message);
	}
}
