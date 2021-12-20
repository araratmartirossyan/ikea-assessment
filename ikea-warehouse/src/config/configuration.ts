export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongo: {
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      uri: process.env.MONGO_URI,
      database: process.env.MONGO_DB,
    },
  },
});
