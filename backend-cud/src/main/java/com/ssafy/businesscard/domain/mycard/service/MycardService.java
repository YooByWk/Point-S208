package com.ssafy.businesscard.domain.mycard.service;

import com.ssafy.businesscard.domain.mycard.dto.request.MycardRegistRequest;
import org.springframework.web.multipart.MultipartFile;

public interface MycardService {
    void regist(Long userId, MycardRegistRequest registRequest);
    void registCard(Long userId, MultipartFile image, MycardRegistRequest mycardRegistRequest);
    void update(Long userId, Long cardId, MycardRegistRequest registRequest);
    void delete(Long userId);
}
