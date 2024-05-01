package com.ssafy.businesscard.privateAlbum.service;

import com.ssafy.businesscard.mycard.repository.BusinesscardRepository;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.Filter;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.privateAlbum.repository.FilterRepository;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrivateAlbumServiceImpl implements PrivateAlbumService {

    private final PrivateAlbumRepository privateAlbumRepository;
    private final BusinesscardRepository businesscardRepository;
    private final PrivateAlbumMemberRepository privateAlbumMemberRepository;
    private final FilterRepository filterRepository;

    //명함 지갑 목록 조회
    @Override
    public List<PrivateAlbumResponseDto> getAlbumList(Long userId, int page){
        int size = 10;

        Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.cardId").descending());
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

    //명함 상세 조회
    @Override
    public PrivateAlbumResponseDto getAlbumDtail(Long userId, Long cardId){
        Optional<PrivateAlbum> optionalPrivateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_cardId(userId, cardId);
        if (optionalPrivateAlbum.isPresent()) {
            PrivateAlbum privateAlbum = optionalPrivateAlbum.get();
            return PrivateAlbumResponseDto.builder()
                    .cardId(privateAlbum.getBusinesscard().getCardId())
                    .name(privateAlbum.getBusinesscard().getName())
                    .company(privateAlbum.getBusinesscard().getCompany())
                    .position(privateAlbum.getBusinesscard().getPosition())
                    .rank(privateAlbum.getBusinesscard().getRank())
                    .email(privateAlbum.getBusinesscard().getEmail())
                    .landlineNumber(privateAlbum.getBusinesscard().getLandlineNumber())
                    .faxNumber(privateAlbum.getBusinesscard().getFaxNumber())
                    .phoneNumber(privateAlbum.getBusinesscard().getPhoneNumber())
                    .address(privateAlbum.getBusinesscard().getAddress())
                    .realPicture(privateAlbum.getBusinesscard().getRealPicture())
                    .frontBack(privateAlbum.getBusinesscard().getFrontBack())
                    .domainUrl(privateAlbum.getBusinesscard().getDomainUrl())
                    .build();
        } else {
            throw new NoSuchElementException("카드가 없음");
        }
    }

    //필터 목록 조회
    public List<FilterListResponseDto> getFilter(Long userId){

        List<Filter> filters = filterRepository.findByPrivateAlbumMemberList_User_UserId(userId);
//        List<PrivateAlbumMember> filters = privateAlbumMemberRepository.
        List<FilterListResponseDto> filterListResponseDtoList = new ArrayList<>();

        return filterListResponseDtoList;

//        for (Filter filter : filters) {
//            FilterListResponseDto filterListResponseDto = null;
//            filterListResponseDto.filterId(filter.getFilterId());
//            FilterListResponseDto filterListResponseDto = new FilterListResponseDto();
//            filterListResponseDto.setFilterId(filter.getFilterId());
//            filterListResponseDto.setFilterName(filter.getFilterName());
//
//            List<PrivateAlbum> privateAlbums = new ArrayList<>();
//            for (PrivateAlbumMember privateAlbumMember : filter.getPrivateAlbumMemberList()) {
//                privateAlbums.add(privateAlbumMember.getPrivateAlbum());
//            }
//            filterListResponseDto.setPrivateAlbumList(privateAlbums);
//
//            filterListResponseDtoList.add(filterListResponseDto);
//        }
//
//        return filterListResponseDtoList;
    }
}
