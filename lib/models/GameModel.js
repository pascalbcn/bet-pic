"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seedGame$getGames$ge;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _GameSeeds = require("../helpers/GameSeeds");

var _GameSeeds2 = _interopRequireDefault(_GameSeeds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } // Model de la route '/Games'

_mongoose2.default.Promise = global.Promise;

var Schema = new _mongoose2.default.Schema({
  id: { type: Number }, // Game number
  team_A: { type: String }, // home team
  team_B: { type: String }, // away team
  date: { type: Number }, // Game date
  stadium: { type: String }, // stadium
  league: { type: String }, // league
  goals_team_A: { type: Number }, // goals scored by home team 
  goals_team_B: { type: Number } // goals scored by away team

});

var Model = _mongoose2.default.model('Game', Schema);

exports.default = (_seedGame$getGames$ge = {
  seedGame: function seedGame() {
    var promises = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _GameSeeds2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var Game = _step.value;

        promises[promises.legth] = Model.create(Game);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return Promise.all(promises);
  },

  getGames: function getGames() {
    return Model.find({}).exec();
  }

}, _defineProperty(_seedGame$getGames$ge, "getGames", function getGames(_id) {
  return Model.findOne({ _id: _id }).exec();
}), _defineProperty(_seedGame$getGames$ge, "createGame", function createGame(Game) {
  return Model.create({
    id: Game.id,
    team_A: Game.team_A,
    team_B: Game.team_B,
    date: Game.date,
    stadium: Game.stadium,
    league: Game.league,
    goals_team_A: Game.goals_team_A,
    goals_team_B: Game.goals_team_B

  });
}), _defineProperty(_seedGame$getGames$ge, "updateGame", function updateGame(_id, Game) {
  return Model.findOneAndUpdate({ _id: _id }, {
    id: Game.id,
    team_A: Game.team_A,
    team_B: Game.team_B,
    date: Game.date,
    stadium: Game.stadium,
    league: Game.league,
    goals_team_A: Game.goals_team_A,
    goals_team_B: Game.goals_team_B
  }, { upsert: true }).exec();
}), _defineProperty(_seedGame$getGames$ge, "deleteGames", function deleteGames() {
  return Model.remove({}).exec();
}), _defineProperty(_seedGame$getGames$ge, "deleteGames", function deleteGames(_id) {
  return Model.remove({ _id: _id }).exec();
}), _seedGame$getGames$ge);