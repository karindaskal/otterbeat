const jwt = require('jsonwebtoken');
const generateToken = (payload) => {
    const token = jwt.sign({ payload: payload }, "123123", { expiresIn: '1h' });
    return token;
}
const decodeToken = (token) => {
    const result = jwt.decode(token)
    return result.payload;
}

module.exports = { generateToken, decodeToken }