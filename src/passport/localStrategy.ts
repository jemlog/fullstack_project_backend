import passport from "passport";
import * as passportLocal from 'passport-local';   // 🧨 이부분 꼭 다시 체크하고 넘어가기 
const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcrypt'

import User from '../models/user'

export default  () => {
  passport.use(new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password'
  }, async (email: string, password: string, done: Function):Promise<void> => {
    try{
       const exUser = await User.findOne({where : {email}})
       if(exUser)
       {
         const result = await bcrypt.compare(password, exUser.password)
         if(result)
         {
           done(null, exUser)
         }
         else{
           done(null,false, {message : '비밀번호가 일치하지 않습니다'})
         }
       }
       else{
         done(null, false, {message : '가입하지 않은 회원입니다!'}) // done이란? done 첫번째 기본값 null 서버 에러 나면 error 넣어줌
         // 로그인 성공하면 두번째 인자에 유저 객체 넣어주기 
         // 세번째는 로그인 실패했을때 메세지 이다! 
       }
    }
    catch(error)
    {
       console.error(error)
       done(error)
    }
  } 
  ))
}

// 자 나는 이제 localstrategy로 왔어 
// 여기서 로그인을 처리하는 로직을 작성해 줄꺼야

