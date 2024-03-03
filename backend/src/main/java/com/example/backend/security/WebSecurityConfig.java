package com.example.backend.security;

import com.example.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class WebSecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final AccessTokenFilter accessTokenFilter;

    private static final String[] WHITE_LIST_URL = {"/api/auth/**", "/swagger-ui/**", "/swagger-ui.html"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(request ->
        request.requestMatchers(WHITE_LIST_URL).permitAll()
        .anyRequest()
        .authenticated()
        )
        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(accessTokenFilter, UsernamePasswordAuthenticationFilter.class);
        // .logout(logout ->
        //     logout.logoutUrl("/api/auth/logout")
        //             .addLogoutHandler(logoutHandler)
        //             .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        // )
        /*.authorizeHttpRequests()
        .requestMatchers("")
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(accessTokenFilter, UsernamePasswordAuthenticationFilter.class);*/

        return http.build();
    }

}