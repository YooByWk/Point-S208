package com.ssafy.businesscard.domain.mycard.service;

import com.ssafy.businesscard.domain.mycard.dto.request.MycardRegistRequest;

public interface MycardService {
    void registerCard(Long userId, MycardRegistRequest registRequest);

    void update(Long userId, Long cardId, MycardRegistRequest registRequest);

    void delete(Long userId);
}
