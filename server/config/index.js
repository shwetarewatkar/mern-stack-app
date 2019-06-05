const config = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'mkT23j#u!45',
    mongoURI: process.env.MONGODB_URI || 'mongodb+srv://user1:user1234@cluster0-rzmux.mongodb.net/mern?retryWrites=true&w=majority'
};

export default config;