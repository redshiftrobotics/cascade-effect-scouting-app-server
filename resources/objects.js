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

// objects.js - useful collection of static JSON objects for use in e.g. send.json()

module.exports = {
	apiRoot: {
		v1: {
			version: 1,
			status: 'stable',
			path: '/v1/'
		}
	},
	v1Root: {
		meta: {
			status: 200,
			msg: 'OK'
		},
		response: {
			match: '/match/',
			team: '/team/',
			tournament: '/tournament/',
			user: '/user/'
		}
	}
};
