package com.ssafy.businesscard.mycard.entity;

import com.ssafy.businesscard.global.BaseTimeEntity;
import com.ssafy.businesscard.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.checkerframework.checker.units.qual.C;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Businesscard extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long cardId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "company", length = 100)
    private String company;

    @Column(name = "position", length = 100)
    private String position;

    @Column(name = "rank", length = 30)
    private String rank;

    @Column(name = "department", length = 30)
    private String department;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "landline_number", length = 30)
    private String landlineNumber;

    @Column(name = "fax_number", length = 30)
    private String faxNumber;

    @Column(name = "phone_number", length = 30)
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "real_picture")
    private String realPicture;

    @Column(name = "digital_picture")
    private String digitalPicture;

    @Enumerated(EnumType.STRING)
    @Column(name = "front_back", nullable = false)
    private Status frontBack;

    @Column(name = "domain_url", length = 100)
    private String domainUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public enum Status {
        FRONT,
        BACK
    }
}