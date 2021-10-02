import express from 'express'
import * as postController from '../controller/post'
import rateLimit from '../middleware/limit'
import fs from 'fs';
import AWS from 'aws-sdk'
import multerS3 from 'multer-s3';
import path from 'path'
import { isLoggedIn } from '../middleware/auth';
import multer from 'multer'
const router = express.Router()

console.log('====================hello=======================')


try{
  fs.readdirSync('uploads')
}
catch(error)
{
 console.log(error);
 fs.mkdirSync('uploads')
}

AWS.config.update({
  accessKeyId : process.env.S3_ACCESS_KEY_ID,
  secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
})
const upload = multer({
  
  storage : multerS3({
    s3 : new AWS.S3(),
    bucket : 'boardproject',
    key(req,file,cb){
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    }
  })
,limits : { fileSize : 5*1024*1024}
})

// const upload = multer({
 
//   storage : multer.diskStorage({
//     destination(req,file,done)
//     {
//       done(null,'uploads/')
//   },

//   filename(req,file,done){
//     const ext = path.extname(file.originalname)
//     done(null,path.basename(file.originalname,ext) + Date.now() + ext)
//   }

// }),limits : { fileSize : 5*1024*1024}
// })



// 포스트를 추가하는 컨트롤러 

router.post('/',isLoggedIn ,upload.single('img'), postController.createPost)

router.get('/user/:id', isLoggedIn, rateLimit, postController.SelectUserPost)

router.put('/:id/user',isLoggedIn, rateLimit, postController.updatePost)

router.delete('/:id/user',isLoggedIn, rateLimit, postController.deletePost)






export default router;