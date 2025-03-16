import { Request, Response } from "express";
import { DetailUserService } from "../../services/users/detail_user_service";
class DetailUserController {
  async handle(req: Request, res: Response) {
    const user_id = req.id_user;

    const detailUSerService = new DetailUserService();

    const user = await detailUSerService.execute(user_id);

    return res.json(user);
  }
}

export { DetailUserController };
