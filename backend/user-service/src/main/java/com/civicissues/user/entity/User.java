package com.civicissues.user.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity
@Table(name="users")
public class User extends BaseEntity{
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length=50,nullable=false)
	private String name;
	@Column(length=50,nullable=false)
	private String email;
	@Column(length=50,nullable=false)
	private String password;
	@Column(length=50)
	private String phone;
	@Column(length=50)
	private String address;
	@Enumerated(EnumType.STRING)
	private Role role;
	

}
