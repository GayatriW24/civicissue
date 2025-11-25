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

e.feedback

f.admin analytics

g.notifications


add if missing anything.....

3. paid service workflow ....
