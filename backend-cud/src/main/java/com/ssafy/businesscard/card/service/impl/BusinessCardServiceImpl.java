package com.ssafy.businesscard.card.service.impl;

import com.ssafy.businesscard.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.card.service.BusinessCardService;
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
        bodyBuilder.part("cardImages", cardImages);
        bodyBuilder.part("version", "V2");
        bodyBuilder.part("requestId", "string");
        bodyBuilder.part("timestamp", "0");
        bodyBuilder.part("images", "[{\"format\": \"JPG\", \"name\": \"string\"}]");
        WebClient webClient = WebClient.builder().baseUrl("https://k10s208.p.ssafy.io/").build();
        webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("ocr/")
                        .path("process_ocr")
                        .build())
                .bodyValue(BodyInserters.fromMultipartData(bodyBuilder.build()))
                .accept(MediaType.MULTIPART_FORM_DATA)
                .retrieve()
                .bodyToMono(String.class);
        System.out.println("webClient : " + webClient.get());

    }
}
