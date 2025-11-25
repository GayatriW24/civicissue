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

c.login

d.payment service

e.feedback

f.admin analytics

g.notifications


add if missing anything.....

3. paid service workflow ....