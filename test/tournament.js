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

// test/tournament.js - tests for the /v1/tournament route

var vows = require('vows');
var assert = require('assert');
var startApp = require('./lib/start-app.js');

var suite = vows.describe('tournaments');

suite.addBatch({
	"When we setup the app": {
		topic: function() {
			return startApp();
		},
		teardown: function(topic) {
			if (topic && topic.close) {
				topic.close();
			}
		},
		"it works": function(topic) {
			assert.isObject(topic);
		}
	}
});

suite.export(module);
