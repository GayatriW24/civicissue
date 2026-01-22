package com.civicissues.exceptions;

public class ResourceAlreadyExisted extends RuntimeException {
	public ResourceAlreadyExisted(String msg){
		super(msg);
	}

}
