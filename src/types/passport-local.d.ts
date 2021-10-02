

declare module "passport-local" {
  // 내 프로젝트에서 쓰는 타입 
  // 배포용은 방법이 다르다 
  import {Strategy as PassportStrategy} from 'passport'
  export interface IVerifyOptions{
    [key: string]: any;
  }

  export interface IStrategyOptions{
     usernameField: string;
     passwordField: string;
  }

  export interface Done{
    (error: Error | null, user?: any, options?: IVerifyOptions): void;
  }
  export interface VerifyFunction{
     (username: string, password: string, done: Done): void;  // 함수로 선언 해주는 법 
  }
  // 사람들이 사용하기 쉽게 해줘야함


  // 커스터마이징 할때는 내가 쓰는것만 
  export class Strategy extends PassportStrategy {
    constructor(options: IStrategyOptions, verify: VerifyFunction)
  }

}