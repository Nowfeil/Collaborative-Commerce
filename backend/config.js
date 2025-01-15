module.exports = {
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/CollabCommerce',
    JWT_SECRET:process.env.JWT_SECRET || 'YOUR_SECRET_KEY'
}
