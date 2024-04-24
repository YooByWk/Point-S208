package com.ssafy.businesscard.mycard.service;

import com.ssafy.businesscard.mycard.dto.MycardResponseDto;

import java.util.List;

public interface MycardService {
    public List<MycardResponseDto> searchMycard(Long userId);
}
