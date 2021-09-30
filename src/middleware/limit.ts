import RateLimit from 'express-rate-limit';

import {Request, Response} from 'express'

const apiLimiter = RateLimit({
  windowMs : 1000* 10, 
  max : 5, 
  handler(req: Request,res: Response){
    res.status(this.statusCode!).json({
      code : this.statusCode,
      message : '10초에 5번만 호출 가능합니다'
    })
  }
})

export default apiLimiter;