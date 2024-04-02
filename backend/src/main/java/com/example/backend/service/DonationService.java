package com.example.backend.service;

import com.example.backend.document.Donation;
import com.example.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationService {

    private final DonationRepository donationRepository;

    @Autowired
    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAllDonations();
    }

    // Get all donations of a particular user by their username
    public List<Donation> getAllDonationsByUsername(String username) {
        return donationRepository.findByDonorName(username);
    }

    // Create a new donation
    public Donation createDonation(Donation donation) {
        return donationRepository.save(donation);
    }

    // Get a donation by its ID
    public Donation getDonationById(String id) {
        return donationRepository.findById(id).orElse(null);
    }

    // Update an existing donation
    public Donation updateDonation(Donation updatedDonation) {
        return donationRepository.save(updatedDonation);
    }

    // Delete a donation by its ID
    public void deleteDonation(String id) {
        donationRepository.deleteById(id);
    }
}
