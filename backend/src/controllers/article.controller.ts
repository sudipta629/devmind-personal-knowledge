import { Request, Response, NextFunction } from 'express';

class ArticleController {
  public async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {}
  public async getById(req: Request, res: Response, next: NextFunction): Promise<void> {}
  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {}
  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {}
  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}
}
export const articleController = new ArticleController();
