const expressJwt = require('express-jwt');
const config = require('./env.config');

module.exports = jwt;
function jwt() {
    return expressJwt({"secret":config.jwt_secret}).unless({
        path: [
            // public routes that don't require authentication
            '/auth'
        ]
    });
}