CREATE TABLE "Reservations" (
    "reservationID" SERIAL PRIMARY KEY,
    "userID" int NOT NULL,
    "matchID" int NOT NULL,
	"seatNo" int NOT NULL,
    UNIQUE ("matchID", "seatNo"),
	
	CONSTRAINT userID_fk
    FOREIGN KEY ("userID")
    REFERENCES "USERS"("userID")
    ON DELETE CASCADE,

    CONSTRAINT matchID_fk
    FOREIGN KEY ("matchID")
    REFERENCES "Matches"("matchID")
    ON DELETE CASCADE
);