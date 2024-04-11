// Assume this is your routes file


import { Router } from 'express';
import { scoreController } from '../controllers/score.controller.js';

const  ScoreRouter = new Router()



ScoreRouter.route('/calculatescores').post(scoreController.score);


export { ScoreRouter };


