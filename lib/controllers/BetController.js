"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _BetModel = require("../models/BetModel");

var _BetModel2 = _interopRequireDefault(_BetModel);

var _GameModel = require("../models/GameModel");

var _GameModel2 = _interopRequireDefault(_GameModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération du model
// Controller de la route '/bets'
var bets = function bets() {
  return _BetModel2.default.getBets().then(function (data) {
    if (data === null) {
      throw new Error('noBetsError');
    }

    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _bet = _step.value;

        response[response.length] = {
          id: _bet._id,
          username: _bet.username,
          GameId: _bet.GameId,
          
          bet: _bet.bet,
          createdAt: _bet.createdAt,
          updatedAt: _bet.updatedAt
        };
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

    return _lodash2.default.sortBy(response, 'username');
  });
};

var bet = function bet(_id) {
  return _BetModel2.default.getBet(_id).then(function (data) {
    if (data === null) {
      throw new Error('noBetError');
    }

    var response = {
      id: data._id,
      username: data.username,
      GameId: data.GameId,
      
      bet: data.bet,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
    return response;
  });
};

var createBet = function createBet(bet) {
  return _BetModel2.default.createBet(bet);
};

var updateBet = function updateBet(id, bet) {
  return _BetModel2.default.updateBet(id, bet);
};

var deleteBet = function deleteBet(id) {
  return _BetModel2.default.deleteBet(id);
};

exports.default = {
  // Controller des views
  getBets: function getBets(req, res) {
    bets().then(function (data) {
      res.render('bet/bets', { bets: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getBet: function getBet(req, res) {
    bet(req.params.id).then(function (data) {
      res.render('bet/bet', { bet: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateBet: function getCreateBet(req, res) {
    _GameModel2.default.getGames().then(function (data) {
      res.render('bet/createBet', { Games: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateBet: function postCreateBet(req, res) {
    var bet = {
      id: req.body.id,
      GameId: req.body.GameId,
      seats: req.body.seats
    };

    createBet(bet).then(function (data) {
      res.redirect('/bets');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateBet: function getUpdateBet(req, res) {
    Promise.all([bet(req.params.id), _GameModel2.default.getGames()]).then(function (data) {
      res.render('bet/updateBet', { bet: data[0], Games: data[1] });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateBet: function postUpdateBet(req, res) {
    var bet = {
      username: req.body.username,
      GameId: req.body.GameId,
      seats: req.body.seats
    };

    updateBet(req.params.id, bet).then(function (data) {
      res.redirect('/bets');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteBet: function getDeleteBet(req, res) {
    deleteBet(req.params.id).then(function (data) {
      res.redirect('/bets');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // Controller des Apis
  getBetsApi: function getBetsApi(req, res) {
    bets().then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getBetApi: function getBetApi(req, res) {
    bet(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateBetApi: function postCreateBetApi(req, res) {
    var bet = {
      username: req.body.username,
      GameId: req.body.GameId,
      seats: req.body.seats
    };

    createBet(bet).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateBetApi: function postUpdateBetApi(req, res) {
    var bet = {
      username: req.body.username,
      GameId: req.body.GameId,
      seats: req.body.seats
    };

    updateBet(req.params.id, bet).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteBetApi: function postDeleteBetApi(req, res) {
    deleteBet(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};