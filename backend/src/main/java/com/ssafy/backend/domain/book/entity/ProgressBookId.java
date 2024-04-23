package com.ssafy.backend.domain.book.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.Column;

import java.io.Serializable;

public class ProgressBookId implements Serializable {

    private User user;
    private Book book;
}
