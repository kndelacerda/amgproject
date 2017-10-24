CREATE DATABASE hikes_db;

USE hikes_db;

CREATE TABLE hikes
(
  id INT AUTO_INCREMENT NOT NULL,
  hike_name VARCHAR(255) NOT NULL,
  hike_location VARCHAR(255) NOT NULL,
  distance_miles REAL(4, 2) NULL,
  elevation_feet INT(4),
  best_time VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);