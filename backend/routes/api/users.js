const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const DEFAULT_PROFILE_IMAGE_URL = "https://daily-verve.s3.amazonaws.com/profile_image/default-profileImage3.png"

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({
    message: 'GET /api/users',
  });
});

// POST /api/users/register
router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email
  const user = await User.findOne({
    $or: [{ email: req.body.email }],
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error('Validation Error');
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = 'A user has already registered with this email';
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true }) :
      DEFAULT_PROFILE_IMAGE_URL;

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    profileImageUrl,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        // return res.json({ user });
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

// POST /api/users/login
router.post('/login', singleMulterUpload(""), validateLoginInput, async (req, res, next) => {
  const user = req.body
  await passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user) {
      console.log(user)
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: 'Invalid credentials' };
      return next(err);

    }
    // return res.json({ user });
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie('CSRF-TOKEN', csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email,
  });
});

module.exports = router;
