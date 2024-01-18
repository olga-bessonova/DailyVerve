const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

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


);

const NUM_SEED_TWEETS = 30;
// Create tweets
const tweets = [];

for (let i = 0; i < NUM_SEED_TWEETS; i++) {
  tweets.push(
    new Tweet({
      text: faker.hacker.phrase(),
      author: users[Math.floor(Math.random() * users.length)]._id,
    })
  );
}

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

const insertSeeds = () => {
  console.log('Resetting db and seeding users and tweets...');

  User.collection
    .drop()
    .then(() => Tweet.collection.drop())
    .then(() => User.insertMany(users))
    .then(() => Tweet.insertMany(tweets))
    .then(() => {
      console.log('Done!');
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
