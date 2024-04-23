package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.book.entity.Book;
import com.ssafy.backend.domain.book.entity.BookPurchasedLearning;
import com.ssafy.backend.domain.book.repository.book.BookRepository;
import com.ssafy.backend.domain.book.repository.bookpurchased.BookPurchasedRepository;
import com.ssafy.backend.domain.user.dto.request.SignupRequestDto;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.mapper.UserMapper;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.UserException;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.repository.TokenRepository;
import com.ssafy.backend.global.jwt.service.JwtService;
import com.ssafy.backend.global.util.EmailValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final BookPurchasedRepository bookPurchasedRepository;
    private final BookRepository bookRepository;

    /**
     * 회원가입
     *
     * @param signupRequestDto 회원가입 요청 정보
     */
    @Override
    @Transactional
    public void signUp(SignupRequestDto signupRequestDto) {
        if (isValidateEmail(signupRequestDto)) {
            throw new UserException(INVALID_EMAIL);
        }

        if (isUserExist(signupRequestDto.email())) {
            userRepository.findByEmail(signupRequestDto.email()).ifPresent(user -> {
                if (isWithdrawal(user)) {
                    throw new UserException(WITHDRAW_USER);
                }
            });
            throw new UserException(DUPLICATED_USER);
        }

        User user = userMapper.toUser(signupRequestDto);
        passwordEncoding(user);
        InitialSetting(user);
        userRepository.save(user);
        InitialBookSetting(user);
    }

    @Override
    @Transactional
    public UserInfoDto SNSLogin(String provider, String SnsEmail) {
        String email = "";
        if (provider.equals("NAVER")) {
            email += "NAVER_";
        } else if (provider.equals("GOOGLE")) {
            email += "GOOGLE_";
        }
        email += SnsEmail;
        if (isUserExist(email)) {
            userRepository.findByEmail(email).ifPresent(user -> {
                if (isWithdrawal(user)) {
                    throw new UserException(WITHDRAW_USER);
                }
            });
        } else {
            User user = User.builder()
                    .email(email)
                    .provider(User.Provider.valueOf(provider))
                    .build();
            InitialSetting(user);
            userRepository.save(user);
            InitialBookSetting(user);
        }
        return login(email, "");
    }

    /**
     * 로그인
     */
    @Override
    public UserInfoDto login(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(INVALID_EMAIL));

        if (isWithdrawal(user)) {
            throw new UserException(WITHDRAW_USER);
        }

        String savedPassword = user.getPassword();
        if (savedPassword != null && !passwordEncoder.matches(password, savedPassword)) {
            throw new UserException(INVALID_PASSWORD);
        }

        return UserInfoDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .role(user.getRole().toString())
                .build();
    }

    /**
     * 토큰 재발급
     */
    @Override
    @Transactional
    public TokenDto reissue(String refreshToken) {
        Long id = jwtService.parseRefreshToken(refreshToken);
        User user = userRepository.findById(id).orElseThrow(() -> new UserException(INVALID_USER));
        UserInfoDto userInfo = UserInfoDto.from(user);

        tokenRepository.delete(String.valueOf(id));
        return jwtService.issueToken(userInfo);
    }

    /**
     * 이메일 중복검사
     */
    @Override
    public boolean duplicateCheckEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private static boolean isWithdrawal(User user) {
        return user.getStatus() == User.Status.WITHDRAWAL;
    }

    private static void InitialSetting(User user) {
        user.updateStatus(User.Status.MEMBER);
        user.updateRole(User.Role.ROLE_USER);
        user.updateNickname(generateNickname());
        user.updateProfileImage("userprofile/defaultImage.jpg");
    }

    private static String generateNickname() {
        String[] prefix = {"아름다운", "큰", "작은", "멋진", "훌륭한", "밝은", "어두운", "신나는", "슬픈", "웃는", "심플한", "화려한", "부드러운", "거친", "빠른", "느린", "따뜻한", "차가운", "선명한", "흐린", "깨끗한", "더러운", "달콤한", "시원한", "무거운", "가벼운", "부끄러운", "대담한", "소심한", "단단한", "부서지기 쉬운", "단단한", "부서지기 쉬운", "뛰어난", "보통인", "특별한", "평범한", "독특한", "유명한", "무명한", "바쁜", "한가한", "정확한", "부정확한", "지루한", "흥미로운", "까다로운", "쉬운", "어려운", "강력한", "약한"};
        String[] suffix = {"별", "바람", "빛", "꿈", "사랑", "하늘", "바다", "숲", "꽃", "나무", "눈", "별빛", "달빛", "비", "무지개", "구름", "별자리", "해", "달", "별가루", "잔디", "산", "강", "햇살", "바람소리", "향기", "봄", "여름", "가을", "겨울", "폭풍", "호수", "섬", "평원", "언덕", "구름무덤", "바위", "별문", "도시", "빗소리", "바다소리", "하늘길", "별길", "꿈나라", "사랑샘", "별눈", "별밤", "바다향", "꽃밭", "별구름"};
        return prefix[(int) (Math.random() * 50)] + " " + suffix[(int) (Math.random() * 50)];
    }

    private void passwordEncoding(User user) {
        String password = passwordEncoder.encode(user.getPassword());
        user.updatePassword(password);
    }

    private boolean isUserExist(String email) {
        return userRepository.countByEmail(email) > 0;
    }

    private void InitialBookSetting(User user) {
        Book book = bookRepository.findById(1L).orElseThrow(() -> new RuntimeException(String.valueOf(NOT_FOUND_BOOK)));
        BookPurchasedLearning bookPurchasedLearning = BookPurchasedLearning.builder()
                .user(user)
                .book(book)
                .build();
        bookPurchasedRepository.save(bookPurchasedLearning);
    }

    private static boolean isValidateEmail(SignupRequestDto signupRequestDto) {
        return !EmailValidator.isValidEmail(signupRequestDto.email());
    }
}
