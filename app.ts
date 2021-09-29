import express from 'express';
import { sequelize } from './models';
import indexRouter from './router/index'
const app: express.Application = express();

app.use(express.json())


app.use('/', indexRouter)

sequelize.sync({force : false}).then(()=> console.log('success'))
.catch((err: Error)=> {
  console.error(err)
})

app.use((req,res,next)=>{
  console.log('잘못왔네요')
  next()
})

app.use((err: any, req: any,res: any,next: any)=> {
  console.error(err);
})


app.listen(8000)