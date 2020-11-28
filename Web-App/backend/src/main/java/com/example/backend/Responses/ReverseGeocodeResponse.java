package com.example.backend.Responses;

import java.util.List;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class ReverseGeocodeResponse {

    private List<Results> results;


    @Getter
    @Setter
    @NoArgsConstructor
    private class Results {
        private List<AddressComponents> addressComponents;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    private class AddressComponents {
        private String long_name;
        private String short_name;
        private List<String> types;
    }
    
}
