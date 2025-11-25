1. Actors: Citizen, Admin

user (citizen/admin) lands on login/signup page

chooses role while registering or automatically adds user as citizen through prgm

credentials will stored  in User table

spring security + JWT manages authentication

after login → redirected based on role

citizen → complaint dashboard

admin → management dashboard




2. Citizen Raises a Complaint

citizen clicks “New Complaint”

fills details as---

title, description

category (road, garbage, water,street light issue ,fire hydrant leakage etc.)

uploads photo via attchement/upload option

selects location (may be by directly google map or aleady filed with drop down or will write manually)

and complaint record will be saved ( Complaint table )

auto-assigned to department based on category
(like category “Water Issue” → department “Water Board”)
means only that particular department will see related issues.



3. Admin Views & Manages Complaints

Flow:

admin logs in → dashboard view

can filter complaints by category, status, or location

can change complaint status

Pending → In Progress → Resolved

can post responses (via Response entity if any problem about issue or any other thing)(not yet in consideration)

once resolved, citizen gets notification (optional via Notification service)


4. Citizen-Admin Interaction (not yet in consideration....)

under each complaint, both citizen and admin can add responses

conversation stored as multiple records in Response

improves transparency and tracks discussion history



5. Feedback & Rating



once complaint status changes to  Resolved, system will prompt citizen to give feedback(not mandatory)

citizen submits star rating and comment

stored in Feedback table and linked to Complaint

admins/departments can view analytics (avg rating, response time, etc.)



6. Reports & Analytics


system generates dashboards for-

number of complaints per category

average resolution time per department

citizen satisfaction trends(not yet in consideration)

admins can use this data for improvement.....



7. Optional AI Chatbot Integration(still optional)

citizen interacts with chatbot (like “report issue”, “track complaint”)

chatbot queries backend APIs (Spring REST endpoints)

helps user find category, check status, or lodge new issue easily
