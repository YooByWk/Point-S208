package com.ssafy.businesscard.domain.card.service.impl;

import com.ssafy.businesscard.domain.card.dto.response.OCRResponse;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.card.service.BusinessCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessCardServiceImpl implements BusinessCardService {

    private final BusinesscardRepository businesscardRepository;
    private final WebClient.Builder webClientBuilder;

    // OCR을 통한 명함 등록
    @Override
    public void register(Long userId, List<MultipartFile> cardImages) {
        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("file", cardImages);
        bodyBuilder.part("message", "{\"version\": \"V2\", \"requestId\": \"String\", \"timestamp\": 0, \"images\":[{\"format: \"JPG\", \"name\": \"string\"}]}");
        System.out.println("response : " + bodyBuilder.toString());
        WebClient webClient = WebClient.builder().baseUrl("https://k10s208.p.ssafy.io/").build();
        webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("ocr/")
                        .path("process_ocr")
                        .build())
                .body(BodyInserters.fromMultipartData(bodyBuilder.build()))
                .accept(MediaType.MULTIPART_FORM_DATA)
                .retrieve()
                .bodyToMono(OCRResponse.class);
        System.out.println("webClient : " + webClient.get());


    }

    // 명함 중복 검사
    @Override
    public boolean checkCard(Businesscard businesscard) {
        System.out.println("checkcard 로직 시작 -------------------------------");
        System.out.println("chekcard : " + businesscard);
        List<Businesscard> card = businesscardRepository.findByEmail(businesscard.getEmail());
        System.out.println("card : " + card);
        if (card.isEmpty()) {
            System.out.println("checkcard 로직 끝 -----------------------------------");
            return false;
        } else {
            System.out.println("checkcard 로직 끝 -----------------------------------");
            return true;
        }


    }
}

