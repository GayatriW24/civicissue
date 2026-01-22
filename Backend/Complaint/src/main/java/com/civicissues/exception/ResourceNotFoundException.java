package com.civicissues.exception;

import org.springframework.data.jpa.repository.JpaRepository;

public class ResourceNotFoundException extends RuntimeException{
	public ResourceNotFoundException(String msg){
		 super(msg);
	}

}
