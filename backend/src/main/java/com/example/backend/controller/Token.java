package com.example.backend.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Token {
    private String userId;
    private String accessToken;
    private String refreshToken;
}
