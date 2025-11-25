base url: /api

auth module:-
1. POST /auth/register
request body
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "password": "string",
  "address": "string"
}
response
{
  "message": "registered successfully",
  "user_id": 12
}

2. POST /auth/login
citizen or admin logs in.
request
{
  "email": "string",
  "password": "string"
}
response
{
  "token": "jwt-token",
  "role": "citizen | superadmin | department_admin",
  "user_id": 12
}

complaints module
3. POST /complaints
citizen raises a complaint.
multipart request (photo included)
fields:
title
description
category_id
location_id
department_id
photo: file

response
{
  "complaint_id": 101,
  "status": "pending"
}

4. GET /complaints/{id}
fetch a single complaint.

5. GET /complaints/user/{user_id}
citizen views all their complaints.

6. GET /complaints
admin/superadmin fetch all complaints with filters.
query parameters
status=pending | resolved | in-progress
department_id=1
category_id=3
date_from=2024-01-01
date_to=2024-02-01


7. PUT /complaints/{id}/status
admin updates status.
request
{
  "status": "in-progress | resolved",
  "remarks": "string"
}
response
{
  "message": "status updated"
}

8. PUT /complaints/{id}/assign-department
superadmin assigns complaint to department.
{
  "department_id": 4
}


payment module (for paid civic services)
9. POST /payment/order
creates payment order before complaint is accepted.
{
  "complaint_id": 101,
  "amount": 250
}
response
{
  "order_id": "rzp_order_123",
  "currency": "INR",
  "amount": 250
}


10. POST /payment/verify
razorpay verification.
{
  "order_id": "rzp_order_123",
  "payment_id": "rzp_payment_789",
  "signature": "signature_string"
}


feedback module
11. POST /feedback
citizen submits feedback after complaint resolution.
{
  "complaint_id": 101,
  "rating": 4,
  "comments": "Work done nicely"
}


12. GET /feedback/{complaint_id}
fetch feedback for a specific complaint.

category module
14. GET /categories

admin module
15. GET /admin/departments
fetch all departments.

16. POST /admin
superadmin creates department admin.
{
  "name": "admin name",
  "email": "string",
  "password": "string",
  "role": "department_admin",
  "department_id": 2
}


analytics module
(superadmin + department_admin dashboards)
17. GET /analytics/complaints-summary
high level stats.
response
{
  "total": 120,
  "pending": 40,
  "in_progress": 20,
  "resolved": 60
}


18. GET /analytics/department-wise
superadmin view.

19. GET /analytics/category-wise

20. GET /analytics/resolution-time
avg & median resolution times.

21. GET /analytics/heatmap
ward-wise high complaint zones.



notifications
POST /notify
GET /notify/user/{id}


file upload
POST /upload