import express, {Request,Response,NextFunction} from 'express'
import User from '../models/user'
import passport from 'passport'
const bcrypt = require('bcrypt')

import {isLoggedIn , isNotLoggedIn }  from'../middleware/auth'
const router = express.Router()

router.post('/join',isNotLoggedIn, async (req: Request, res:Response, next: NextFunction) => {

  const {email, nick, password} = req.body; // user에 관련된 email, nick, password를 전달해 줄꺼야 
  try{
      
    const exUser = await User.findOne({where : { email }}) // 먼저 이메일로 기존 사용자가 있는지 체크해주자 있으면 에러 
    if(exUser)
    {
      return res.json({message : '이미 존재하는 회원입니다'}) // 프론트엔드가 error=exist를 보고 에러 메세지를 띄운다. 
    }

    const hash = await bcrypt.hash(password, 12); // 저장할때는 이제 hash 해서 저장할꺼야! 
    await User.create({
      email, 
      nick,
      password : hash
    });
    return res.json({message : '회원가입 완료'})
  }
  catch(err)
  {
    console.error(err)
    return next(err)
  }
})

// 미들웨어 안에 미들웨어를 넣었기 때문에 확장법을 사용했다. 
router.post('/login',isNotLoggedIn, (req: Request, res:Response, next: NextFunction) => {
  // authenticate 걸리면 인증시작~ 이제 index로 넘어간다. 
  // autherror는 아예 초기 에러 , user 는 성공했을때의 exUser, info는 로그인 실패시의 메세지 
  passport.authenticate('local', (autherror: Error, user: User, info: {message : string}) => {
    if(autherror)
    {
      console.error(autherror)
      return next(autherror)
    }     // 애초에 에러가 났을때 
    if(!user)
    {
      console.log(user)
      return res.redirect(`/?loginErro=${info.message}`)
    }  // user가 없고 info에 메세지만 담겨 있다면 
    // 성공했을때 
    // req.login 하는 순간 index로 간다. 
    return req.logIn(user, (loginError: Error)=>{  // 여기서 serialize로 이동 
      if(loginError)
      {
        console.error(loginError)
        return next(loginError)
      }
      res.header("Access-Control-Allow-Origin","*")
      return res.json({
        code : 200,
        message : '로그인 완료',
        success : true
      })
      // 이 순간 세션쿠키를 브라우저로 보낸다. 
    })
  })(req,res,next)
})

router.get('/logout',  (req, res) => {
  req.logOut()  // 서버에서 세션이 사라진다. 
  req.session!.destroy()
  res.json({
    code : 204, 
    success : true, 
    message : '로그아웃 완료'
  })
  

})


// 만약에 User라는 객체에 없는 요소를 추가 하고 싶다면 IUser 라는 인터페이스에 extends User 해서 요소들을 추가해준다. 


export default router;



