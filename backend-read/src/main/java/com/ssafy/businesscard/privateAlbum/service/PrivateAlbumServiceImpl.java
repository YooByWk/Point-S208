package com.ssafy.businesscard.privateAlbum.service;

import com.ssafy.businesscard.mycard.repository.BusinesscardRepository;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrivateAlbumServiceImpl implements PrivateAlbumService {

    private final PrivateAlbumRepository privateAlbumRepository;
    private final BusinesscardRepository businesscardRepository;

    @Override
    public List<PrivateAlbumResponseDto> getAlbumList(Long userId, int page){
        int size = 10;
        // 페이지 번호와 페이지당 아이템 수를 이용하여 데이터 조회
        Pageable pageable = PageRequest.of(page, size);
        Page<PrivateAlbum> albumPage = privateAlbumRepository.findByUser_userId(userId, pageable);

        List<PrivateAlbumResponseDto> responseDtoList = albumPage.getContent().stream()
                .map(privateAlbum -> new PrivateAlbumResponseDto(
                        privateAlbum.getBusinesscard().getCardId(),
                        privateAlbum.getBusinesscard().getName(),
                        privateAlbum.getBusinesscard().getCompany(),
                        privateAlbum.getBusinesscard().getPosition(),
                        privateAlbum.getBusinesscard().getRank(),
                        privateAlbum.getBusinesscard().getEmail(),
                        privateAlbum.getBusinesscard().getLandlineNumber(),
                        privateAlbum.getBusinesscard().getFaxNumber(),
                        privateAlbum.getBusinesscard().getPhoneNumber(),
                        privateAlbum.getBusinesscard().getAddress(),
                        privateAlbum.getBusinesscard().getRealPicture(),
                        privateAlbum.getBusinesscard().getFrontBack(),
                        privateAlbum.getBusinesscard().getDomainUrl()
                        ))
                .collect(Collectors.toList());
        return responseDtoList;
    }
}
