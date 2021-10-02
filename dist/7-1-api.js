"use strict";
let letterRegexp = /&[A-Za-z]+$/;
class LettersOnlyValidator {
    isAcceptable(s) {
        return letterRegexp.test(s);
    }
}
//# sourceMappingURL=7-1-api.js.map