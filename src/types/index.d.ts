
declare global {
  
   export namespace Express {
     interface Request {
       user?: User;
     }
   }
}

export default () => {};

// declare module "express-serve-static-core"{ interface Request {user?: User;}}