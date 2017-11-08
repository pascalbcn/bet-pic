"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _GameModel = require("../models/GameModel");

var _GameModel2 = _interopRequireDefault(_GameModel);

var _BookingModel = require("../models/BookingModel");

var _BookingModel2 = _interopRequireDefault(_BookingModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération du model
exports.default = {
  seedDb: function seedDb(req, res) {
    return Promise.all([_GameModel2.default.deleteGames(), _BookingModel2.default.deleteBookings()]).then(function (data) {
      return Promise.all([_GameModel2.default.seedGames()]);
    }).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
}; // Controller de la route '/Games'