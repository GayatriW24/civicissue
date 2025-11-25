package com.civicissues.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civicissues.user.dto.LoginRequest;
import com.civicissues.user.dto.LoginResponse;
import com.civicissues.user.repository.UserRespository;
import com.civicissues.user.security.JwtUtils;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RequestMapping("/users")
@RestController
@AllArgsConstructor
public class UserController {


	
	
	private final AuthenticationManager authenticationManager;
	private JwtUtils jwtutils;

    
	
	public ResponseEntity<?> userAuthentication(@Valid @RequestBody LoginRequest dto){
		
		
		UsernamePasswordAuthenticationToken authToken= new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		Authentication fulllyAuth=authenticationManager.authenticate(authToken);
		  return ResponseEntity.status(HttpStatus.CREATED)
				  .body(new LoginResponse(jwtutils.generateToken(fulllyAuth),"Authentication Success"));
	}


}
