CREATE TABLE "Stadiums" (
    "stadiumID" SERIAL PRIMARY KEY,
    "stadiumName" VARCHAR(255) NOT NULL,
    "noRows" int NOT NULL,
	"noSeatsPerRow" int NOT NULL,
    "imageURL" VARCHAR(255) NOT NULL
);