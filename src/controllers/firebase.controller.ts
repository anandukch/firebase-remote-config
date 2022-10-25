import FirebaseService from "@/services/firebase.service";
import { NextFunction, Request, Response } from "express";

class FireBaseController{
  public fireBaseService = new FirebaseService();

  public getTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const template = await this.fireBaseService.getTemplate();      
      return res.status(200).json({ 
        success: true,
        data: template
       });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  public editTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const template = await this.fireBaseService.updateTemplate();      
      return res.status(200).json({ 
        success: true,
        data: template
       });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }
}

export default FireBaseController;