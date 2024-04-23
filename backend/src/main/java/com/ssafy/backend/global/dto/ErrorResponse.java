package com.ssafy.backend.global.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class ErrorResponse<T> {

	private DataHeader dataHeader;
	private T dataBody;

	public static ErrorResponse success() {
		return ErrorResponse.builder()
				.dataHeader(DataHeader.success())
				.build();
	}

	public static <T> ErrorResponse<T> success(T dataBody) {
		return ErrorResponse.<T>builder()
				.dataHeader(DataHeader.success())
				.dataBody(dataBody)
				.build();
	}

	public static <T> ErrorResponse<T> success(String resultCode, String resultMessage) {
		return ErrorResponse.<T>builder()
				.dataHeader(DataHeader.success(resultCode, resultMessage))
				.build();
	}

	public static <T> ErrorResponse<T> success(T dataBody, String resultCode, String resultMessage) {
		return ErrorResponse.<T>builder()
				.dataHeader(DataHeader.success(resultCode, resultMessage))
				.dataBody(dataBody)
				.build();
	}

	public static <T> ErrorResponse<T> fail(String resultCode, String resultMessage) {
		return ErrorResponse.<T>builder()
				.dataHeader(DataHeader.fail(resultCode, resultMessage))
				.dataBody(null)
				.build();
	}

	@Getter
	@Builder
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
	private static class DataHeader {
		private int successCode;
		private String resultCode;
		private String resultMessage;

		private static DataHeader success() {
			return DataHeader.builder()
					.successCode(0)
					.build();
		}

		private static DataHeader success(String resultCode, String resultMessage) {
			return DataHeader.builder()
					.successCode(0)
					.resultCode(resultCode)
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

}
