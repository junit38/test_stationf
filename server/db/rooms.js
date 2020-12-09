const Joi = require('joi');
const db = require('./connection');
 
const schema = Joi.object().keys({
    room: Joi.string().required(),
    datetime: Joi.date().required()
});
 
const rooms = db.get('rooms');

function getOccupied(datetime) {
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
            return Promise.resolve(roomsConcat);
        });
    });
}
 
function create(room) { 
    return rooms.insert(room);
}
 
module.exports = {
    create,
    getOccupied
};
