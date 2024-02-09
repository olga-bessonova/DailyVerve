const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const users = [];

users.push(
  new User({
    firstName: 'olga',
    lastName: 'B',
    email: 'olga@user.io',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);

users.push(
  new User({
    firstName: 'Stan',
    lastName: 'H',
    email: 'stan@user.io',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
);


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

