"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _Errors = require("../helpers/Errors");

var _Errors2 = _interopRequireDefault(_Errors);

var _GameModel = require("../models/GameModel");

var _GameModel2 = _interopRequireDefault(_GameModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Games = function Games() {
  // On fait appel à la fonction getGames du model
  // Celle ci renvoie tous les Games présents en base
  return _GameModel2.default.getGames().then(function (data) {
    // On récupère ici data qui est une liste de Games

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noGamesError'
      throw new Error('noGamesError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un tableau
    var response = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _Game = _step.value;

        // On parcours data. pour chaque élément, on garde les champs name, venue, description, capacity, price, image et date
        response[response.length] = {
          id: _Game._id,
          team_A: _Game.team_A,
          team_B: _Game.team_B,
          date: _Game.date,
          stadium: _Game.stadium,
          league: _Game.league,
          goals_team_A: _Game.goals_team_A,
          goals_team_B: _Game.goals_team_B

        };
      }

      // Avant d'envoyer la réponse on la tri par ordre alphabétique croissant sur le champs name
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

    return _lodash2.default.sortBy(response, 'team_A');
  });
};

// Récupération du model
// Controller de la route '/Games'


var Game = function Game(_id) {
  // On fait appel à la fonction getGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return _GameModel2.default.getGame(_id).then(function (data) {
    // On récupère ici data qui est une liste de Games

    if (data === null) {
      // Si data est vide, nous renvoyons l'erreur 'noGameError'
      throw new Error('noGameError');
    }

    // On prépare ici la réponse que va renvoyer l'api, il s'agit d'un élement
    var response = {
      id: data._id,
      team_A: data.team_A,
      team_B: data.team_B,
      date: data.date,
      stadium: data.stadium,
      league: data.league,
      goals_team_A: data.goals_team_A,
      goals_team_B: data.goals_team_B
    };
    return response;
  });
};

var createGame = function createGame(Game) {
  // On fait appel à la fonction createGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return _GameModel2.default.createGame(Game);
};

var updateGame = function updateGame(id, Game) {
  // On fait appel à la fonction updateGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return _GameModel2.default.updateGame(id, Game);
};

var deleteGame = function deleteGame(id) {
  // On fait appel à la fonction deleteGame du model
  // Celle ci renvoie le Game dont l'id est _id
  return _GameModel2.default.deleteGame(id);
};

exports.default = {
  // Controller des views
  getGames: function getGames(req, res) {
    Games().then(function (data) {
      // data contient une liste de Games
      res.render('Game/Games', { Games: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getGame: function getGame(req, res) {
    Game(req.params.id).then(function (data) {
      res.render('Game/Game', { Game: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getCreateGame: function getCreateGame(req, res) {
    res.render('Game/createGame');
  },

  postCreateGame: function postCreateGame(req, res) {
    var Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    createGame(Game).then(function (data) {
      res.redirect('/Games');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getUpdateGame: function getUpdateGame(req, res) {
    Game(req.params.id).then(function (data) {
      res.render('Game/updateGame', { Game: data });
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateGame: function postUpdateGame(req, res) {
    var Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    updateGame(req.params.id, Game).then(function (data) {
      res.redirect('/Games');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getDeleteGame: function getDeleteGame(req, res) {
    deleteGame(req.params.id).then(function (data) {
      res.redirect('/Games');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  // ************ API FROM THERE ************ //

  // Controller des Apis
  getGamesApi: function getGamesApi(req, res) {
    Games().then(function (data) {
      // data contient maintenant la valeur retournée par la fonction _.sortBy
      // Si les opérations précédentes se sont bien passées, l'api renvoie une liste de Games
      res.send(data);
    }, function (err) {
      // Si une erreur a été renvoyée avec la fonctions throw new Error(), nous atterrissons ici
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  getGameApi: function getGameApi(req, res) {
    Game(req.params.id).then(function (data) {
      res.send(data);
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postCreateGameApi: function postCreateGameApi(req, res) {
    var Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    createGame(Game).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postUpdateGameApi: function postUpdateGameApi(req, res) {
    var Game = {
      id: req.body.id,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      date: req.body.date,
      stadium: req.body.stadium,
      league: req.body.league,
      goals_team_A: req.body.goals_team_A,
      goals_team_B: req.body.goals_team_B
    };

    updateGame(req.params.id, Game).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  },

  postDeleteGameApi: function postDeleteGameApi(req, res) {
    deleteGame(req.params.id).then(function (data) {
      res.send('ok');
    }, function (err) {
      console.log(err);
      res.status((0, _Errors2.default)(err).code).send((0, _Errors2.default)(err));
    });
  }
};