package com.ssafy.businesscard.global.utils;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.businesscard.global.config.QueryDslConfig;
import lombok.*;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import static org.springframework.http.HttpStatus.NO_CONTENT;
import static org.springframework.http.HttpStatus.OK;

@Data
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class MessageUtils<T> {
    private final DataHeader dataHeader;
    private final T dataBody;

    public static <T> MessageUtils<T> success(T dataBody) {
        return MessageUtils.<T>builder()
                .dataHeader(DataHeader.success())
                .dataBody(dataBody)
                .build();
    }

    public static <T> MessageUtils<T> success(T dataBody, String code, String resultMessage) {
        return MessageUtils.<T>builder()
                .dataHeader(DataHeader.success(code, resultMessage))
                .dataBody(dataBody)
                .build();
    }

    public static MessageUtils success() {
        return MessageUtils.builder()
                .dataHeader(DataHeader.noContentSuccess())
                .build();
    }

    public static <T> MessageUtils<T> fail(String resultCode, String resultMessage) {
        return MessageUtils.<T>builder()
                .dataHeader(DataHeader.fail(resultCode, resultMessage))
                .dataBody(null)
                .build();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Getter
    @JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
    private static class DataHeader {

        private int successCode;
        private String resultCode;
        private String resultMessage;

        private static DataHeader noContentSuccess() {
            return DataHeader.builder()
                    .successCode(0)
                    .resultCode(NO_CONTENT.toString())
                    .build();
        }

        private static DataHeader success() {
            return DataHeader.builder()
                    .successCode(0)
                    .resultCode(OK.toString())
                    .build();
        }



        private static DataHeader success(String code, String resultMessage) {
            return DataHeader.builder()
                    .successCode(0)
                    .resultCode(code)
                    .resultMessage(resultMessage)
                    .build();
        }

        private static DataHeader fail(String resultCode, String resultMessage) {
            return DataHeader.builder()
                    .successCode(1)
                    .resultCode(resultCode)
                    .resultMessage(resultMessage)
                    .build();
        }
    }

    @Component
    @RequiredArgsConstructor
    public static class WebClientUtil {

        private final QueryDslConfig.WebClientConfig webClientConfig;

        public <T> T get(String url, Class<T> responseDtoClass) {
            return webClientConfig.webClient().method(HttpMethod.GET)
                    .uri(url)
                    .retrieve()
    //                .onStatus(HttpStatus::is4xxClientError, clientResponse -> Mono.error(InternalServerException.EXCEPTION))
    //                .onStatus(HttpStatus::is5xxServerError, clientResponse -> Mono.error(InternalServerException.EXCEPTION))
                    .bodyToMono(responseDtoClass)
                    .block();
        }

        public <T, V> T post(String url, V requestDto, Class<T> responseDtoClass) {
            return webClientConfig.webClient().method(HttpMethod.POST)
                    .uri(url)
                    .bodyValue(requestDto)
                    .retrieve()
                    //.onStatus(clientResponse -> clientResponse.is4xxClientError(), clientResponse -> Mono.error(InternalServerException.EXCEPTION))
                    //.onStatus(clientResponse -> clientResponse.is5xxServerError(), clientResponse -> Mono.error(InternalServerException.EXCEPTION))
                    .bodyToMono(responseDtoClass)
                    .block();
        }

    }
}