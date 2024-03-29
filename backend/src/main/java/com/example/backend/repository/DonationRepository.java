package com.example.backend.repository;

import com.example.backend.document.Donation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DonationRepository extends MongoRepository<Donation, String> {
    
    // Define the findAllDonations() method to return all donations
    default List<Donation> findAllDonations() {
        // Retrieve all donations from the database using the default findAll() method
        return findAll();
    }
}
