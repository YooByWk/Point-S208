package com.ssafy.businesscard.privateAlbum.service;

import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.mycard.repository.BusinesscardRepository;
import com.ssafy.businesscard.privateAlbum.dto.FilterCardResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.Filter;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.privateAlbum.mapper.PrivateAlbumMapper;
import com.ssafy.businesscard.privateAlbum.repository.FilterRepository;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PrivateAlbumServiceImpl implements PrivateAlbumService {

    private final PrivateAlbumRepository privateAlbumRepository;
    private final BusinesscardRepository businesscardRepository;
    private final PrivateAlbumMemberRepository privateAlbumMemberRepository;
    private final FilterRepository filterRepository;
    private final PrivateAlbumMapper privateAlbumMapper;

    //명함 지갑 목록 조회
    @Override
    public List<PrivateAlbumResponseDto> getAlbumList(Long userId, int page){
        int size = 12;
        Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.cardId").descending());
        Page<PrivateAlbum> albumPage = privateAlbumRepository.findByUser_userId(userId, pageable);
        List<Businesscard> pages = albumPage.stream().map(card -> card.getBusinesscard()).toList();
        List<PrivateAlbumResponseDto> dtos = pages.stream().map(privateAlbumMapper::toDto).toList();
        return dtos;
    }

    //명함지갑에서 목록조회 정렬(이름, 회사, 최신)
    @Override
    public List<PrivateAlbumResponseDto> getAlbumListSort(Long userId, int page, String sort){
        int size = 12;
        if(sort.equals("이름순")){
            Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.name"));
            Page<PrivateAlbum> albumPage = privateAlbumRepository.findByUser_userId(userId, pageable);
            List<Businesscard> pages = albumPage.stream().map(card -> card.getBusinesscard()).toList();
            List<PrivateAlbumResponseDto> dtos = pages.stream().map(privateAlbumMapper::toDto).toList();
            return dtos;
        } else if (sort.equals("회사순")) {
            Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.company"));
            Page<PrivateAlbum> albumPage = privateAlbumRepository.findByUser_userId(userId, pageable);
            List<Businesscard> pages = albumPage.stream().map(card -> card.getBusinesscard()).toList();
            List<PrivateAlbumResponseDto> dtos = pages.stream().map(privateAlbumMapper::toDto).toList();
            return dtos;
        } else{
            Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.cardId").descending());
            Page<PrivateAlbum> albumPage = privateAlbumRepository.findByUser_userId(userId, pageable);
            List<Businesscard> pages = albumPage.stream().map(card -> card.getBusinesscard()).toList();
            List<PrivateAlbumResponseDto> dtos = pages.stream().map(privateAlbumMapper::toDto).toList();
            return dtos;
        }
    }

        //명함 상세 조회
        @Override
        public PrivateAlbumResponseDto getAlbumDtail(Long userId, Long cardId){
            Optional<PrivateAlbum> privateAlbumOptional = privateAlbumRepository.findByUser_userIdAndBusinesscard_cardId(userId, cardId);
            if(privateAlbumOptional.isPresent()){
                PrivateAlbum privateAlbum = privateAlbumOptional.get();
                Businesscard businesscard = privateAlbum.getBusinesscard();
                return privateAlbumMapper.toDto(businesscard);
            } else {
                throw new UserException(UserErrorCode.NO_CARD);
            }
    }

    //필터 목록 조회
    @Override
    public List<FilterListResponseDto> getFilter(Long userId){
        List<PrivateAlbumMember> privateAlbumMembers = privateAlbumMemberRepository.findByUser_userId(userId);
        List<FilterListResponseDto> dtos = privateAlbumMembers.stream()
                .map(privateAlbumMember -> privateAlbumMember.getFilter())
                .filter(Objects::nonNull)       //null 에러 제거
                .map(privateAlbumMapper::toDto).distinct().toList();    //distinct : 중복 제거
        return dtos;
    }

    //필터 별 명함 조회
    @Override
    public FilterCardResponseDto getFilterCard(Long userId, Long filterId) {
        
        List<PrivateAlbumMember> members = privateAlbumMemberRepository.findByFilter_FilterIdAndUser_UserId(filterId, userId);
        List<PrivateAlbumResponseDto> cards = members.stream()
                .filter(member -> member.getPrivateAlbum() != null) // null에러 제거
                .map(member -> member.getPrivateAlbum())
                .map(album -> album.getBusinesscard())
                .filter(bc -> bc != null) // null에러 제거
                .map(privateAlbumMapper::toDto).toList();
        return new FilterCardResponseDto(filterId, cards);
    }

    //상세보기에서 명함마다 필터 뭐있는지 조회
    @Override
    @Transactional
    public List<FilterListResponseDto> getAlbumDtailFilter(Long userId, Long cardId){
        Optional<PrivateAlbum> optionalPrivateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_cardId(userId, cardId);
        if (optionalPrivateAlbum.isPresent()) {
            PrivateAlbum privateAlbum = optionalPrivateAlbum.get();

            // 카드에 태그된 필터 목록 조회
            List<PrivateAlbumMember> albumMembers = privateAlbum.getPrivateAlbumMemberList();
            List<FilterListResponseDto> dtos = new ArrayList<>();
            for (PrivateAlbumMember albumMember : albumMembers) {
                Filter filter = albumMember.getFilter();
                FilterListResponseDto dto = new FilterListResponseDto(filter.getFilterId(), filter.getFilterName());
                dtos.add(dto);
            }
            return dtos;
        } else {
            return Collections.emptyList();
        }
    }

    //엑셀로 내보내기용 명함지갑목록조회
    @Override
    public List<PrivateAlbumResponseDto> getAlbumAllList(Long userId){
        List<PrivateAlbum> privateAlbums = privateAlbumRepository.findByUser_userId(userId);
        List<Businesscard> businesscards = privateAlbums.stream().map(bc -> bc.getBusinesscard()).toList();
        List<PrivateAlbumResponseDto> dtos = businesscards.stream().map(privateAlbumMapper::toDto).toList();
        return dtos;
    }
}
