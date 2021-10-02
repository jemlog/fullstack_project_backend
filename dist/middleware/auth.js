"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotLoggedIn = exports.isLoggedIn = void 0;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('로그인된 상태입니다! ');
        next();
    }
    else {
        res.status(403).send('로그인필요');
    }
}
exports.isLoggedIn = isLoggedIn;
// exports.''' 를 사용하면 모듈 하나에 묶어서 다 보낼 수 있다. 
function isNotLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    else {
        const message = encodeURIComponent('로그인한 상태입니다');
        console.log('helloOE2q3');
        res.send('이미 로그인이 된 상태');
    }
}
exports.isNotLoggedIn = isNotLoggedIn;
// 헤더의 authorization에 저장되어있는 토큰 확인해서 req.decoded에 실어주자
//# sourceMappingURL=auth.js.map