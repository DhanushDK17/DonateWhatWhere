package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.backend.document.User;
import com.example.backend.repository.UserRepository;

@Service
public class UserService implements UserDetailsService{
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    public User findById(String id) {
        return userRepository.findById(id)
        .orElseThrow(() -> new UsernameNotFoundException("user id not found"));
    }
}
