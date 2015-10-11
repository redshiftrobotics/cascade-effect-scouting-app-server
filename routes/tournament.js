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

// tournament.js - routing handler for /v1/tournament/

var express = require('express');
var router = express.Router();

var concat = require('concat-stream');

var db = require('../lib/sql');

router.get('/', function(req, res) {
	res.send('Got a GET request for /tournament/');
});

router.get('/:id', function(req, res) {
	db.get('SELECT * FROM tournaments WHERE id = ?;', req.params.id, function(err, row) {
		if (err) {
			res.writeHead(500);
			res.end(err.toString(), function() {
				throw err;
			});
		} else if (row === undefined) {
			res.writeHead(404);
			res.end();
		} else {
			res.writeHead(200);
			res.write('{"active":');
			if (row['active'] === 0) {
				res.write('true');
			} else {
				res.write('false');
			}
			res.write(',"name":"' + row['name'] + '"}');
			res.end();
		}
	});
});

router.post('/:id', function(req, res, params) {
	req.pipe(concat(function(buf) {
		var data;

		try {
			data = JSON.parse(buf.toString());
		} catch (e) {
			if (e instanceof SyntaxError) {
				res.writeHead(400);
				res.end(e.toString());
			} else {
				res.writeHead(500);
				res.end(e.toString(), function() {
					throw e;
				});
			}
		}

		// sanity checks

		if (!data.name) {
			res.setHeader('Content-Type', 'text/plain');
			res.writeHead(400);
			res.end('Expected a "name" key.');
		}

		db.run('INSERT INTO tournaments (active, name) VALUES (0, ?);', data.name, function(err) {
			if (err) {
				res.writeHead(500);
				res.end(err.toString(), function() {
					throw err;
				});
			}

			res.writeHead(201);
			res.end('{"id":' + this.lastID + '}');
		});
	}));
});

module.exports = router;
