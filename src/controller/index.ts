import User from '../models/user';
import {Request, Response, NextFunction} from 'express'
import Post from '../models/post';

// GET /    완전 초기 화면, 모든 user의 post를 종합해서 보여주자 
export async function getAll(req: Request, res:Response, next: NextFunction):Promise<void> {

    try{
      const posts = await Post.findAll();
      res.json(posts)
    }
    catch(err: any)
    {
      console.error(err)
      next(err)
    }

}


