import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import FireBaseController from '@/controllers/firebase.controller';

class FireBaseRoute implements Routes {
  public path = '/firebase';
  public router = Router();
  public firebaseController = new FireBaseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.firebaseController.getTemplate);
    this.router.put(`${this.path}`, this.firebaseController.editTemplate);
  }
}

export default FireBaseRoute;
