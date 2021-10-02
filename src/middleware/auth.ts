
import * as express from 'express'

export function isLoggedIn  (req: express.Request,res: express.Response,next:express.NextFunction){
  if(req.isAuthenticated())
  {
    next()
  }
  else
  {
    res.status(403).send('로그인필요')
  }
}

// exports.''' 를 사용하면 모듈 하나에 묶어서 다 보낼 수 있다. 

export function isNotLoggedIn(req: express.Request,res: express.Response,next:express.NextFunction){
  if(!req.isAuthenticated())
  {
    next()
  }
  else{
    const message = encodeURIComponent('로그인한 상태입니다')
    console.log('helloOE2q3')
    res.send('이미 로그인이 된 상태')
  }
}


// 헤더의 authorization에 저장되어있는 토큰 확인해서 req.decoded에 실어주자


