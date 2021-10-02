
declare global {
  
    interface Error {
      status: number;
    }
  
}

export default () => {};

// declare module "express-serve-static-core"{ interface Request {user?: User;}}