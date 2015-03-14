#!/usr/bin/env node

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

// index.js - main app file

var express = require('express');
var objects = require('./resources/objects');
var strings = require('./resources/strings');

var tournament = require('./routes/tournament.js');
var match = require('./routes/match.js');
var user = require('./routes/user.js');
var team = require('./routes/team.js');

var app = express();

console.log(strings.copyright);

// Handle requests to the root
app.get('/', function(req, res) {
	res.type('text/plain');
	res.json(objects.apiRoot);
});

// Handle requests to the root of v1
app.get('/v1', function(req, res) {
	res.type('text/plain');
	res.json(objects.v1Root);
});

app.use('/v1/tournament', tournament);
app.use('/v1/match/', match);
app.use('/v1/user/', user);
app.use('/v1/team/', team);

var server = app.listen(process.env.PORT || 8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%s/', host, port);
});
