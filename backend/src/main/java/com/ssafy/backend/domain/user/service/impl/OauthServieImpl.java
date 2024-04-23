package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.service.OauthInterface;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class OauthServieImpl implements OauthInterface {
	@Override
	public Map<String, Object> getUserInfo(String provider, String token) {
		String apiURL = "";
		if(provider.equals("NAVER")) {
			apiURL = "https://openapi.naver.com/v1/nid/me";
		} else if(provider.equals("GOOGLE")) {
			apiURL = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
		}

		String header = "Bearer " + token; // Bearer 다음에 공백 추가


		Map<String, String> requestHeaders = new HashMap<>();
		requestHeaders.put("Authorization", header);
		String responseBody = get(apiURL,requestHeaders);

		JSONParser parser = new JSONParser();
		Object obj = null;
		Map<String, Object> resultMap = null;
		try {
			obj = parser.parse(responseBody);
			resultMap = (Map<String, Object>)obj;
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		return resultMap;
	}


	private static String get(String apiUrl, Map<String, String> requestHeaders){
		HttpURLConnection con = connect(apiUrl);
		try {
			con.setRequestMethod("GET");
			for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
				con.setRequestProperty(header.getKey(), header.getValue());
			}


			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
				return readBody(con.getInputStream());
			} else { // 에러 발생
				return readBody(con.getErrorStream());
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}

	private static HttpURLConnection connect(String apiUrl){
		try {
			URL url = new URL(apiUrl);
			return (HttpURLConnection)url.openConnection();
		} catch (MalformedURLException e) {
			throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
		} catch (IOException e) {
			throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
		}
	}

	private static String readBody(InputStream body){
		InputStreamReader streamReader = new InputStreamReader(body);


		try (BufferedReader lineReader = new BufferedReader(streamReader)) {
			StringBuilder responseBody = new StringBuilder();


			String line;
			while ((line = lineReader.readLine()) != null) {
				responseBody.append(line);
			}


			return responseBody.toString();
		} catch (IOException e) {
			throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
		}
	}
}



