package com.ssafy.backend.domain.donggle.service;

import com.ssafy.backend.domain.donggle.dto.response.DonggleResponseDto;
import com.ssafy.backend.domain.donggle.entity.Donggle;

public interface DonggleService {
	DonggleResponseDto getDonggleMessage(Donggle.Situation situation);
}
