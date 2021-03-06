import passport from "passport";
import * as passportLocal from 'passport-local'   // ๐งจ ์ด๋ถ๋ถ ๊ผญ ๋ค์ ์ฒดํฌํ๊ณ  ๋์ด๊ฐ๊ธฐ 
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
           done(null,false, {message : '๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํ์ง ์์ต๋๋ค'})
         }
       }
       else{
         done(null, false, {message : '๊ฐ์ํ์ง ์์ ํ์์๋๋ค!'}) // done์ด๋? done ์ฒซ๋ฒ์งธ ๊ธฐ๋ณธ๊ฐ null ์๋ฒ ์๋ฌ ๋๋ฉด error ๋ฃ์ด์ค
         // ๋ก๊ทธ์ธ ์ฑ๊ณตํ๋ฉด ๋๋ฒ์งธ ์ธ์์ ์ ์  ๊ฐ์ฒด ๋ฃ์ด์ฃผ๊ธฐ 
         // ์ธ๋ฒ์งธ๋ ๋ก๊ทธ์ธ ์คํจํ์๋ ๋ฉ์ธ์ง ์ด๋ค! 
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

// ์ ๋๋ ์ด์  localstrategy๋ก ์์ด 
// ์ฌ๊ธฐ์ ๋ก๊ทธ์ธ์ ์ฒ๋ฆฌํ๋ ๋ก์ง์ ์์ฑํด ์ค๊บผ์ผ

