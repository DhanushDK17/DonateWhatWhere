package com.example.backend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.mongodb.lang.NonNull;
import lombok.Builder;
import lombok.Data;

@Document(collection = "donations")
@Data
@Builder
public class Donation {
    
    @Id
    private String id;

    @NonNull
    @Field("donated_by")
    private String donorName;

    @NonNull
    @Field("donation_item")
    private String donationItem;

    @NonNull
    @Field("donation_category")
    private String donationCategory;

    @NonNull
    @Field("donation_datetime")
    private String donationDatetime;

    @NonNull
    @Field("is_claimed")
    @Builder.Default
    private boolean isClaimed = false;
}
