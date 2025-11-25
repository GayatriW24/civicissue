1. System flow:-

citizen -> frontend -> backend -> database -> backend -> frontend -> admin/super admin

2.  module wise workflow
 
 a. complaint flow

citizen opens complaint form->
fills title, description, category, location, photo->
frontend sends POST /complaints to backend->
backend validates & stores->
send "new complaint" notification->
admin dashboard shows new complaint->
admin updates status: pending -> in-progress -> resolved->
citizen gets update->
citizen gives feedback->
feedback saved → included in reports

b.registration
citizen opens registration form->
fills fields that map to CITIZEN entity
name, email, password, phone, address, aadhar_no, created_at->
frontend performs basic client validation (required, email format, password match, aadhar format)->
frontend sends POST /api/auth/register

c.login
fills email, password
frontend does quick checks (non-empty, email format)
frontend sends POST /api/auth/login to backend
backend fetches CITIZEN by email
backend verifies password against CITIZEN.password
if bad → increment failed_login_attempts → return 401 / show error
if status ≠ ACTIVE or email_verified_at is NULL → return 403 with reason (PENDING_VERIFICATION / PENDING_APPROVAL)
on success → create JWT access token + refresh token (save refresh in tokens table with citizen_id(fk))
update CITIZEN.last_login_at, last_login_ip and insert AUTH_AUDIT row
backend returns 200 + token (or sets httpOnly cookie)
frontend stores token (cookie) and calls GET /api/users/me → shows dashboard (complaints, attachments)


d.payment service
citizen opens payment page
frontend shows invoice (if any) and amount, purpose
citizen fills amount, selects payment_method (card, netbanking, UPI, wallet, offline), enters required details or uses stored payment token
frontend quick checks: non-empty, numeric amount>0, valid payment_method
frontend sends POST /api/payments to backend with payload

e.feedback
citizen opens complaint details page →
clicks “Add Feedback” →
frontend does quick checks (rating selected, comment length valid)
frontend sends POST /api/feedback to backend with complaint_id
backend fetches COMPLAINT by complaint_id
backend checks if complaint belongs to the logged-in CITIZEN (complaint.citizen_id == jwt.citizen_id)
backend checks if complaint status is RESOLVED
backend checks if feedback already exists (one feedback per complaint)
if invalid → return 400/403 with proper error
on valid → backend creates FEEDBACK row (feedback_id, citizen_id, complaint_id, rating, comment, created_at)
backend updates COMPLAINT.feedback_status = "SUBMITTED"
backend inserts FEEDBACK_AUDIT / generic AUDIT row
backend sends “new feedback submitted” notification to ADMIN
backend returns 201 CREATED
frontend shows success message and refreshes complaint timeline to display feedback


f.admin analytics
admin opens dashboard (after login)
frontend sends GET /api/admin/analytics to backend
backend validates JWT → ensures ADMIN role
backend starts building analytics data
backend queries COMPLAINT table (group by status, category, ward, department)
backend computes counts: total complaints, pending, in-progress, resolved
backend calculates average resolution time (from created_at → resolved_at)
backend checks feedback table → computes average rating per department/category
backend aggregates citizen activity (total citizens, new registrations this month)
backend aggregates attachment count from ATTACHMENT table
backend retrieves top 5 categories by complaint volume
backend retrieves top 5 wards/areas with highest grievances
backend prepares performance metrics for each admin/department 
backend formats all stats into JSON: charts, numbers, comparisons
backend returns 200 OK with analytics dataset
frontend updates dashboard → renders graphs, charts, trends
admin monitors performance and identifies problem areas

g.notifications
citizen/admin performs an action that triggers a notification (new complaint, status update, feedback, assignment, etc.)
backend detects the event (INSERT/UPDATE in COMPLAINT or FEEDBACK table)
backend creates a NOTIFICATION entry (notification_id, user_id, title, message, type, read_status = false, created_at)
backend decides the receiver based on event:
– new complaint → send to ADMIN
– complaint status changed → send to CITIZEN
– feedback submitted → send to ADMIN
– complaint assigned → send to assigned ADMIN
backend pushes notification via real-time channel to frontend
backend also sends fallback email/SMS 
frontend (citizen/admin) receives notification event → updates notification badge count
frontend sends GET /api/notifications to load all notifications
backend returns list filtered by user_id
user opens notification panel → marks notification as read
frontend sends PATCH /api/notifications/{id}/read
backend updates NOTIFICATION.read_status = true
dashboard reloads and unread count decreases
notifications stored for reporting (who received what, when, for which complaint/feedback)


add if missing anything.....

3. paid service workflow ....
