// Controller de la route '/Games'
import Errors from "../helpers/Errors";

// Récupération du model
import GameModel from "../models/GameModel";
import BookingModel from "../models/BookingModel";

export default {
  seedDb: (req, res) => {
    return Promise.all([
      GameModel.deleteGames(),
      BookingModel.deleteBookings(),
    ])
    .then((data) => {
      return Promise.all([
        GameModel.seedGames(),
      ]);
    })
    .then((data) => {
      res.send('ok');
    }, (err) => {
      console.log(err);
      res.status(Errors(err).code).send(Errors(err));
    });
  },
};