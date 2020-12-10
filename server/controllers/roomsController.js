const roomsJson = require('../json/rooms.json');

exports.get = function(req, res) {
  res.send(roomsJson);
};
