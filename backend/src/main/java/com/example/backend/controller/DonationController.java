package com.example.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.backend.document.Donation;
import com.example.backend.service.DonationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donation")
public class DonationController {

    private final DonationService donationService;

    @Autowired
    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        return donationService.getAllDonationsByUsername(username);
    }

    @PostMapping
    public Donation createDonation(@RequestBody Donation donation) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        donation.setDonorName(username);
        return donationService.createDonation(donation);
    }

    @PutMapping("/{id}")
    public Donation updateDonation(@PathVariable String id, @RequestBody Donation donation) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Donation existingDonation = donationService.getDonationById(id);
        if (existingDonation != null && existingDonation.getDonorName().equals(username)) {
            donation.setId(id);
            return donationService.updateDonation(donation);
        } else {
            // Handle unauthorized access
            return null; // or throw an exception
        }
    }

    @DeleteMapping("/{id}")
    public void deleteDonation(@PathVariable String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        Donation existingDonation = donationService.getDonationById(id);
        if (existingDonation != null && existingDonation.getDonorName().equals(username)) {
            donationService.deleteDonation(id);
        } else {
            // Handle unauthorized access
        }
    }
}
