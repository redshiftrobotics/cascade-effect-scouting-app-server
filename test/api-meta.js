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

// test/api-meta.js - tests for the meta stuff in / and /v1

var vows = require('vows');
var assert = require('assert');
var http = require('http');
var concat = require('concat-stream');
var startApp = require('./lib/start-app.js');

var suite = vows.describe('API roots');

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
		},
		"and we GET /": {
			topic: function() {
				var callback = this.callback;
				var req = http.get({
					hostname: 'localhost',
					port: 56971,
					//method: 'GET',
					path: '/'
				}, callback);
			},
			"it works": function(topic) {
				assert.isObject(topic);
			}
		}
	}
});

suite.export(module);
