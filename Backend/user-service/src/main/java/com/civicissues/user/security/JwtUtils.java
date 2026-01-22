package com.civicissues.user.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.civicissues.user.entity.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;


@Component
public class JwtUtils {
	@Value("${jwt.secret.key}")
     private String secretKey;
	@Value("${jwt.expiration.time}")
     private long expTime;
     private SecretKey key;
     
     @PostConstruct
     public void init() {
    	 key=Keys.hmacShaKeyFor(secretKey.getBytes());
     }
     
     public String generateToken(Authentication fullyAuth) {
    	 User  userdetails=(User)fullyAuth.getPrincipal();
    	 Date now=new Date();
    	 Date expDate=new Date(now.getTime()+expTime);
    	 
    	 return Jwts.builder() //creates JWT builder
 				.subject(userdetails.getEmail())
 				.issuedAt(now)
 				.expiration(expDate)
 				.claims(Map.of("userId", userdetails.getId(),
 						"role", userdetails.getRole().name()))
 				.signWith(key)
 				.compact();
 	}
 	//verify token 
 	public Claims validateToken(String jwt)
 	{
 		return Jwts.parser()
 				.verifyWith(key)
 				.build() //builds the parse with the same symmetric key
 				.parseSignedClaims(jwt) //in case of no exc - JWT valid
 				.getPayload();
 	}
     
}
