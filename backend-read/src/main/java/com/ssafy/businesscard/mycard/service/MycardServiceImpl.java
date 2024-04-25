package com.ssafy.businesscard.mycard.service;

import com.ssafy.businesscard.mycard.dto.MycardResponseDto;
import com.ssafy.businesscard.mycard.repository.BusinesscardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MycardServiceImpl implements MycardService{

    private final BusinesscardRepository businesscardRepository;

    @Override
    public List<MycardResponseDto> searchMycard(Long userId){
        return businesscardRepository.findByUser_UserId(userId);
    }
}
