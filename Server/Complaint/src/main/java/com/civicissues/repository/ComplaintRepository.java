package com.civicissues.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.civicissues.entity.Complaint;
import com.civicissues.entity.ComplaintStatus;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

   // List<Complaint> findByCitizenId(Long citizenId);
	List<Complaint> findByCitizenAadhaar(String citizenAadhaar);

    List<Complaint> findByDepartmentId(Long departmentId);
    List<Complaint> findByStatus(ComplaintStatus status);

    @Query("select c.status, count(c) from Complaint c group by c.status")
    List<Object[]> countByStatus();

    @Query("select c.departmentId, count(c) from Complaint c group by c.departmentId")
    List<Object[]> countByDepartment();
    
    @Query("select c.city, count(c) from Complaint c group by c.city")
    List<Object[]> countByCity();

    @Query("select c.categoryId, count(c) from Complaint c group by c.categoryId")
    List<Object[]> countByCategory();
    
//    boolean existsByCitizenIdAndCategoryIdAndAreaAndStatus(
//    		String citizenAadhaar,
//    	    Long categoryId,
//    	    String area,
//    	    ComplaintStatus status
//    	);
	//boolean existsByCategoryAndCitizenAadhaarAndAreaAndStatus(Long categoryId, String area, ComplaintStatus open);
	
	
	boolean existsByCitizenAadhaarAndCategoryIdAndAreaAndStatus(
		    String citizenAadhaar,
		    Long categoryId,
		    String area,
		    ComplaintStatus status
		);

}
