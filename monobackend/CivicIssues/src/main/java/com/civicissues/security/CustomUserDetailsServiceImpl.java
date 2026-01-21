package com.civicissues.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.civicissues.entity.User;
import com.civicissues.repository.UserRespository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRespository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//get user details from db
		User user=userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email not found !!!!!"));
		
		return user;
	}

}
