CREATE TABLE "USERS" (
    "userID" SERIAL PRIMARY KEY,
    "userName" VARCHAR(255) UNIQUE,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
	gender VARCHAR(10) NOT NULL,
    nationality VARCHAR(255),
    "birthDate" DATE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "userRole" VARCHAR(255) NOT NULL,
    "roleApproved" BOOLEAN
);