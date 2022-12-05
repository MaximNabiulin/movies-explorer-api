module.exports.corsOptions = {
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://movies.nabiulin.nomoredomains.club',
    'https://movies.nabiulin.nomoredomains.club',
  ],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
