/*

Copyright 2015 Alex Jordan <alex@strugee.net>.

This file is part of FTC Scouting Server.

FTC Scouting Server is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

FTC Scouting Server is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with FTC Scouting Server.  If not, see <http://www.gnu.org/licenses/>.

*/

// lib/sql.js - connect to the database

var settings = require('./settings.js');

var db;

if (settings.database.engine === 'sqlite') {
	var sqlite3 = require('sqlite3').verbose();

	db = new sqlite3.Database(settings.database.name);
}

db.exec('CREATE TABLE IF NOT EXISTS tournaments (id INTEGER PRIMARY KEY AUTOINCREMENT, active BOOLEAN NOT NULL, name TEXT NOT NULL);');
db.exec('CREATE TABLE IF NOT EXISTS match (id INTEGER PRIMARY KEY AUTOINCREMENT, tournament REFERENCES tournaments(id), match_number INTEGER NOT NULL, active BOOLEAN NOT NULL, red_1 REFERENCES teams(id), blue_1 REFERENCES teams(id), blue_2 REFERENCES teams(id), red_1_points INTEGER, red_2_points INTEGER, blue_1_points INTEGER, blue_2_points INTEGER, red_1_penalties INTEGER, red_2_penalties INTEGER, blue_1_penalties INTEGER, blue_2_penalties INTEGER, winner TEXT);');
db.exec('CREATE TABLE IF NOT EXISTS teams (id INTEGER PRIMARY KEY AUTOINCREMENT, tournament REFERENCES tournaments(id));');
db.exec('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, first TEXT NOT NULL, last TEXT, gender TEXT, team REFERENCES teams(id), type TEXT)');

module.exports = db;
