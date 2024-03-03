package com.example.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.controller.Login;
import com.example.backend.controller.Signup;
import com.example.backend.controller.Token;
import com.example.backend.document.RefreshToken;
import com.example.backend.document.User;
import com.example.backend.jwt.JwtHelper;
import com.example.backend.repository.RefreshTokenRepository;
import com.example.backend.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthREST {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RefreshTokenRepository refreshTokenRepository;
    @Autowired
    JwtHelper jwtHelper;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody Login dto) {
        Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(auth);
        User user = (User) auth.getPrincipal();

        RefreshToken rToken = new RefreshToken();
        rToken.setOwner(user);
        refreshTokenRepository.save(rToken);

        String aToken = jwtHelper.generateAccessToken(user);
        String rTokenString = jwtHelper.generateRefreshToken(user, rToken.getId());

        return ResponseEntity.ok(new Token(user.getId(), aToken, rTokenString));
    }

    @PostMapping("signup")
    @Transactional
    public ResponseEntity<?> signup(@Valid @RequestBody Signup dto) {
        User user = new User(dto.getUsername(), dto.getEmail(), passwordEncoder.encode(dto.getPassword()));
        userRepository.save(user);

        RefreshToken rToken = new RefreshToken();
        rToken.setOwner(user);
        refreshTokenRepository.save(rToken);

        String aToken = jwtHelper.generateAccessToken(user);
        String rTokenString = jwtHelper.generateRefreshToken(user, rToken.getId());

        return ResponseEntity.ok(new Token(user.getId(), aToken, rTokenString));
    }
}