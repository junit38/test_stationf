var express = require('express');
var router = express.Router();
const db = require('../db/connection');
const rooms = db.get('rooms');

router.get('/', function(req, res, next) {
  res.send({
	rooms: [
	{
		_id: 0,
		name: "Salle #1",
		description: "Salle #1",
		capacity: 5,
		equipements: [
		{
			name: "TV"
		},
		{
			name: "Retro Projecteur"
		}
	],
		createdAt: "2016-12-07T12:39:29.812Z",
		updatedAt: "2016-12-08T17:31:39.489Z"
	},
	{
		id: 1,
		name: "Salle #2",
		description: "Salle #2",
		capacity: 10,
		equipements: [
		{
			name: "Retro Projecteur"
		}
	],
		createdAt: "2016-12-07T12:39:55.384Z",
		updatedAt: "2016-12-07T13:33:37.184Z"
	},
	{
		id: 2,
		name: "Salle Okjsdkso",
		description: "Salle Okjsdkso",
		capacity: 11,
		equipements: [ ],
		createdAt: "2016-12-07T14:15:55.733Z",
		updatedAt: "2016-12-09T16:45:19.025Z"
	},
	{
		id: 3,
		name: "Salle de ouf",
		description: "Salle de ouf",
		capacity: 10,
		equipements: [
		{
			name: "TV"
		},
		{
		name: "Retro Projecteur"
		}
	],
		createdAt: "2016-12-09T16:45:34.419Z",
		updatedAt: "2016-12-09T16:45:34.419Z"
	},
	{
		id: 4,
		name: "Salle nulle",
		description: "Salle nulle",
		capacity: 26,
		equipements: [
		{
			name: "TV"
		},
		{
			name: "Retro Projecteur"
		}
	],
		createdAt: "2016-12-09T16:45:49.096Z",
		updatedAt: "2016-12-09T16:45:49.096Z"
	}]
	});
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    req.body.datetime = new Date(req.body.datetime);
    req.body.datetime_end = new Date(req.body.datetime);
    req.body.datetime_end.setHours(req.body.datetime.getHours() + 1);
    rooms.insert(req.body).then((room) => {
        res.json(room);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});

router.post('/occupied', (req, res, next) => {
	var datetime = new Date(req.body.datetime);
    var datetime_end = new Date(datetime);
    datetime_end.setHours(datetime.getHours() + 1);
    rooms.find({
        datetime: {
            $gte: datetime,
            $lt: datetime_end
        }
    }).then((roomsStart) => {
        rooms.find({
            datetime_end: {
                $gt: datetime,
                $lt: datetime_end
            }
        }).then((roomsEnd) => {
            var roomsConcat = roomsStart.concat(roomsEnd);
            res.json(roomsConcat);
        });
    });
});

module.exports = router;
