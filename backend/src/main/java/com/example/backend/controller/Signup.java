package com.example.backend.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Signup {
    @NotBlank
    @Size(min = 3, max=30)
    private String username;

    @Size(max=60)
    @Email
    private String email;

    @NotBlank
    @Size(min=6, max=60)
    private String password;
}
