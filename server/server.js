require('dotenv').config();
const { app } = require('./app');
const { db } = require('./database/database.config');
const PORT = process.env.PORT || 4000;

/* ------------------------- Testing the connection ------------------------- */
(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

/* -------------------------- Model synchronization ------------------------- */
(async () => {
  await db.sync();
  console.log('All models were synchronized successfully.');
})();

/* ----------------------------- Server spin-up ----------------------------- */
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
