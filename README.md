# Project Rubric

# Functionality

>The application allows users to create, update, delete TODO items 
![Alt text](screenshots/screenshot01.png?raw=false "functionality")

>The application allows users to upload a file.
![Alt text](screenshots/screenshot02.png?raw=false "upload file")

>The application only displays TODO items for a logged in user.
<br><br>
Authentication is implemented and does not allow unauthenticated access.
![Alt text](screenshots/screenshot03.png?raw=false "login")
<br><br>
![Alt text](screenshots/screenshot04.png?raw=false "not_login")



# Code Base

>The code is split into multiple layers separating business logic from I/O related code.
<br>

>Code is implemented using async/await and Promises without using callbacks.
![Alt text](screenshots/screenshot06.png?raw=false "async_await")



# Best Practices

>All resources in the application are defined in the "serverless.yml" file
<br>

Refer to "serverless.yml"

>Each function has its own set of permissions.

Refer to "serverless.yml"

>Application has sufficient monitoring.

![Alt text](screenshots/screenshot07.png?raw=false "ray_tracing")
<br><br>
![Alt text](screenshots/screenshot08.png?raw=false "logs")
<br><br>
![Alt text](screenshots/screenshot12.png?raw=false "logs")

>HTTP requests are validated

![Alt text](screenshots/screenshot09.png?raw=false "validator")


# Architecture

>Data is stored in a table with a composite key.

![Alt text](screenshots/screenshot10.png?raw=false "dynamoDB")

>Scan operation is not used to read data from a database.

![Alt text](screenshots/screenshot11.png?raw=false "queryOperation")