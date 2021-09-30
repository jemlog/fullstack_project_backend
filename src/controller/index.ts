import User from '../models/user';
import {Request, Response, NextFunction} from 'express'

export async function getAll(req: Request, res:Response, next: NextFunction):Promise<void> {

    try{
      const user = await User.findAll()
      res.json(user)
    }
    catch(err: any)
    {
      console.error(err)
      next(err)
    }

    

}

export async function createUser(req: Request, res:Response, next: NextFunction): Promise<void>
{
   console.log('hello')
   const {nickname , userId, password} = req.body;
   try
   {
     const newUser = await User.create({
       nickname,
       userId,
       password
     })
     res.json(newUser)
   }
   catch(err: any)
   {
     console.error(err)
     next(err)
   }
}

