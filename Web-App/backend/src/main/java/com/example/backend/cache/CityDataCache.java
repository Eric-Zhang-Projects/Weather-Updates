package com.example.backend.cache;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class CityDataCache {
    
    //<Princeton,NJ, data>
    private Map<String, ResponseEntity<?>> searchedCityCache = new HashMap<>();

    private ResponseEntity<?> defaultCity;

    public void setDefaultCity(ResponseEntity<?> defCity){
        defaultCity = defCity;
    }

    public ResponseEntity<?> getDefaultCity(){
        return defaultCity;
    }

    public boolean searchCityDataIsEmpty(){
        //True if empty
        return searchedCityCache.isEmpty();
    }

    public boolean containsSearchedCity(String city, String state){
        //True if contains
        return searchedCityCache.containsKey(city + "," + state);
    }

    public void updateSearchedCityCache(String city, String state, ResponseEntity<?> weatherResponse){
        if (searchedCityCache.size()>5){
            System.out.println("maximum size of cache reached");
            searchedCityCache.remove(searchedCityCache.keySet().iterator().next());
        }
        searchedCityCache.put(city + "," + state, weatherResponse);
    }

    public ResponseEntity<?> getSearchedCityData(String city, String state){
        return searchedCityCache.get(city + "," + state);
    }

    public void deleteCache(){
        defaultCity = null;
        searchedCityCache.clear();
    }

}
