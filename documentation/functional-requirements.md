registration + login
- citizen will register using adhar, email/phone and then will login.
- super admin/admin will directly login in system.

complaint submission:
- citizen submits form with title, description, category, location, photo
- system stores complaint with status=pending
- admin receives notification


admin complaint management
- will recive the complaint(according to department) ,view it,if resolved then will change status to 'RESOLVED', if any issue with comaplint will response to it.

paid services flow
- suppose if it requested service from cittizen ,then while requesting for it ,the request will marked as paid and then redirect to payment gateway and redirect to home on successfull payment 

feedback module
- once compliant gets resolved , citizen will ask for feedback (eg: how was the service, within how many days it gets resolved etc...),on basis of this citizec will give feedback.

analytics module
- this is handle by super admin, one who can see all department's comaplint/issues, will analyse the issues from particular area, how much days its taking to resolved, how many resolved/unresolved etc.

notifications
- this helps citizen to get information about complaint recived and resolved ,and admin/super admin will gets notification about new complaint/service request.

user roles
- there are three users:
  1 citizen
  2 admin(of each department)
  3 super admin


error handling
- error handle by globally
security
- used JWT for role based authentication and autherization

availability
- available on docker