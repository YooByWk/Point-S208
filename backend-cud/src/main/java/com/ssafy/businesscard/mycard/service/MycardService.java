package com.ssafy.businesscard.mycard.service;

import com.ssafy.businesscard.mycard.dto.request.MycardRegistRequest;

public interface MycardService {
    void registerCard(Long userId, MycardRegistRequest registRequest);

    void update(Long userId, Long cardId, MycardRegistRequest registRequest);
}
