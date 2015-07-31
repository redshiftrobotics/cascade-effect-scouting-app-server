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

// lib/settings.js - load settings and fill in defaults

var settingsJson = require('../settings.json');

var settings = {};

settings.database = {};
settings.database.engine   = settingsJson.database.engine   || 'sqlite';
settings.database.host     = settingsJson.database.host     || 'localhost';
settings.database.port     = settingsJson.database.port     || null;
settings.database.user     = settingsJson.database.user     || 'none';
settings.database.password = settingsJson.database.password || 'none';
settings.database.name     = settingsJson.database.name     || ':memory:';
settings.address           = settingsJson.address           || '0.0.0.0';
settings.port              = settingsJson.port              || 8000;
settings.dev               = settingsJson.dev               || false;

// sanity checks

if (settings.database.engine === 'sqlite') {
	if (settings.database.host !== 'localhost'
	    && settings.database.host !== null) {
		console.warn('[warn] The database.host settings key is ignored when database.engine is set to \'sqlite\'.');
	}
	if (settings.database.port !== null) {
		console.warn('[warn] The database.port settings key is ignored when database.engine is set to \'sqlite\'.');
	}
	if (settings.database.user !== 'none'
	    && settings.database.user !== null) {
		console.warn('[warn] The database.user settings key is ignored when database.engine is set to \'sqlite\'.');
	}
	if (settings.database.password !== 'none'
	    && settings.database.password !== null) {
		console.warn('[warn] The database.password settings key is ignored when database.engine is set to \'sqlite\'.');
	}
	if (settings.database.name === ':memory:'
	    && ! settings.dev) {
		console.error('[fail] Refusing to run with database \':memory:\' in a production environment (i.e. the \'dev\' settings key is not set to true).');
		process.exit(1);
	}
}

module.exports = settings;
