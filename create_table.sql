CREATE TABLE fridge.`user` (
	id INT auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
CREATE TABLE fridge.Namirnica (
	Naziv varchar(100) NOT NULL,
	Kolicina varchar(100) NULL,
	Jedinica varchar(100) NULL,
	id INT auto_increment NOT NULL,
	Vlasnik INT NULL,
	CONSTRAINT Namirnica_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
