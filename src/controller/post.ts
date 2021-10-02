import Post from '../models/post';
import {Request, Response, NextFunction} from 'express'

declare global {
   namespace Express {
      namespace Multer {
         interface File{
            location: string;
         }
      }
   }
}



// POST /    create Post  게시글을 추가하는 부분이다. 
export async function createPost(req: Request, res:Response, next: NextFunction) {  
  const {title, description} = req.body;

  const id = req.user!.id;
      try{
         const post = await Post.create({title, description, UserId : id, image: req.file?.location })
         res.json({code : 201, message : post})
      }
      catch(error)
      {
         console.log(error)
         next(error)
      }

}

// UPDATE :id/user  update user n's post    n번 유저의 게시글을 수정하는 로직 
export async function updatePost(req: Request, res:Response, next: NextFunction):Promise<void> {

   const id = req.params.id;
  try{
     const post = await Post.update({title : "연남"},{
        where : {
          title : '망원',
          id,

        }

     })
     res.json({
        code : 200,
        message : post
     })
  }
  catch(error)
  {
     console.log(error)
     next(error)
  }

}

// DELETE :id/user   delete user n's post    n번 유저의 게시글을 삭제하는 로직 
export async function deletePost(req: Request, res:Response, next: NextFunction):Promise<void> {
   const id = req.params.id;
  try{
        const post = await  Post.destroy({where : {id}})
        res.json({
           code : 204, message : '삭제완료'
        })

  }
  catch(error)
  {
     console.log(error)
     next(error)
  }

}

// GET /user/:id     select user n's post     n번 유저의 게시글ㅇ르 조회하는 로직 
export async function SelectUserPost(req: Request, res:Response, next: NextFunction):Promise<void> {

   const id = req.params.id;
  try{
    const posts = await Post.findAll({where : {UserId : id}})
    res.json({
       code : 200,
       message : posts
    })
  }
  catch(error)
  {
     console.log(error)
     next(error)
  }

}