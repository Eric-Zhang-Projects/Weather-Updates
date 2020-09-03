package com.example.backend.Responses;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class DuplicateUserError {
    
    private String duplicateUsername;
    private String duplicateEmail;
}
