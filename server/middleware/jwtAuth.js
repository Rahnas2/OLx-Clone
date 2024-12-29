
const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    console.log('jwt checking')
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        res.status(404).json({ msg: 'Access denied' })
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decode ',decode)
        req.user = decode
        next()
    } catch (error) {
        res.status(404).json({msg: 'invalid or expired token'})
    }
}

module.exports = authenticateToken