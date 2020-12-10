const db = require('../db/connection');
const reservations = db.get('reservations');
const roomsJson = require('../json/rooms.json');

exports.create = function(req, res) {
  	if (req.reservation)
  	{
  		res.status(400);
		res.send("Reservation already exist for this room and datetime.");
  	}
  	else
  	{
  		let reservation = {
			room: req.body.room,
			datetime: req.body.datetime
		}
		if (!reservation.room)
		{
			res.status(400);
			res.send("Missing room name.");
		}
		else
		{
			reservation.datetime = new Date(reservation.datetime);
		    if (reservation.datetime < new Date())
		    {
		    	res.status(400);
		        res.send("Reservation datetime must be after current date.");
		    }
		    else
		    {
		    	let exist = false;
			    for (i = 0; i < roomsJson.rooms.length; i++)
			    {
			    	if (roomsJson.rooms[i].name == reservation.room)
			    		exist = true;
			    }
			    if (exist === false)
			    {
			    	res.status(400);
			        res.send("Room doesn't exist");
			    }
			    else
			    {
			    	reservation.datetime_end = new Date(reservation.datetime);
				    reservation.datetime_end.setHours(reservation.datetime.getHours() + 1);
				    reservations.insert(reservation).then((reservation) => {
				        res.json(reservation);
				    }).catch((error) => {
				        res.status(500);
				        res.send(error);
				    });
			    }
			}
		}
  	}
};

exports.getOccupiedByName = function(req, res, next) {
	let datetime = req.body.datetime;
	let room = req.body.room;
	if (!datetime)
	{
		res.status(400)
		res.send("Missing reservation datetime.");
	}
	else {
		datetime = new Date(datetime);
		if (datetime < new Date())
	    {
	    	res.status(400);
	        res.send("Reservation datetime must be after current date.");
	    }
	    else
	    {
		    var datetime_end = new Date(datetime);
		    datetime_end.setHours(datetime.getHours() + 1);
		    reservations.findOne({
		    	room: room,
		        datetime: {
		            $gte: datetime,
		            $lt: datetime_end
		        }
		    }).then((reservation) => {
		    	if (reservation)
		    	{
		    		console.log('here1');
			        req.reservation = reservation;
		            next();
		    	}
		    	else
		    	{
		    		reservations.findOne({
			        	room: room,
			            datetime_end: {
			                $gt: datetime,
			                $lt: datetime_end
			            }
			        }).then((reservation) => {
			        	if (reservation)
			            	req.reservation = reservation;
			            next();
			        }).catch((error) => {
				    	res.status(500);
				    	res.send(error);
				    });
		    	}
		    }).catch((error) => {
		    	res.status(500);
		    	res.send(error);
		    });
		}
	}
}

exports.getOccupied = function(req, res, next) {
	let datetime = req.body.datetime;
	if (!datetime)
	{
		res.status(400)
		res.send("Missing reservation datetime.");
	}
	else
	{
		datetime = new Date(datetime);
		if (datetime < new Date())
	    {
	    	res.status(400);
	        res.send("Reservation datetime must be after current date.");
	    }
	    else
	    {
		    var datetime_end = new Date(datetime);
		    datetime_end.setHours(datetime.getHours() + 1);
		    reservations.find({
		        datetime: {
		            $gte: datetime,
		            $lt: datetime_end
		        }
		    }).then((reservationsStart) => {
		        reservations.find({
		            datetime_end: {
		                $gt: datetime,
		                $lt: datetime_end
		            }
		        }).then((reservationsEnd) => {
		            var reservationsConcat = reservationsStart.concat(reservationsEnd);
		            req.reservations = reservationsConcat;
		            next();
		        }).catch((error) => {
			    	res.status(500);
			    	res.send(error);
			    });
		    }).catch((error) => {
		    	res.status(500);
		    	res.send(error);
		    });
		}
	}
}

exports.send = function(req, res) {
	res.json(req.reservations);
}
