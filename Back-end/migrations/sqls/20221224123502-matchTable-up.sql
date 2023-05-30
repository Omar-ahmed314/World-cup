CREATE TABLE "Matches" (
    "matchID" SERIAL PRIMARY KEY,
    "firstTeam" VARCHAR(255) NOT NULL,
    "secondTeam" VARCHAR(255) NOT NULL,
	"stadiumID" int NOT NULL,
	"matchDay" DATE NOT NULL,
    "matchTime" TIME NOT NULL,
	referee VARCHAR(255) NOT NULL,
	"linemanOne" VARCHAR(255) NOT NULL,
	"linemanTwo" VARCHAR(255) NOT NULL,
    UNIQUE("firstTeam", "matchDay"),
    UNIQUE("secondTeam", "matchDay"),
    UNIQUE("stadiumID", "matchDay", "matchTime"),

	CONSTRAINT stadiumID_fk
    FOREIGN KEY ("stadiumID")
    REFERENCES "Stadiums"("stadiumID")
    ON UPDATE CASCADE
);