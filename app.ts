import express from 'express';
import { sequelize } from './models';
const app = express();

app.get('/', (req,res)=> {
  res.send('hello')
})

sequelize.sync({force : false}).then(()=> console.log('success'))
.catch((err: Error)=> {
  console.error(err)
})


app.listen()