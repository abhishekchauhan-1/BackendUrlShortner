const express = require("express");
const cors = require('cors');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;

const mongoDB = require("./config/mongoose");
const Link = require("./model/link");
const User = require("./model/user");
const authRoutes = require("./routes/authRoutes");
const linkRoutes = require("./routes/linkRoutes");


const app = express();
const PORT = 8001;

app.use(cors());

app.use(express.json());

// Configure passport
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your_secret_key",
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.userId);
  
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  });
  

passport.use(jwtStrategy);

// passport local configuration
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // specify the correct field
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));


// Use Passport middleware
app.use(passport.initialize());



// User Signup
app.use("/auth", authRoutes);
app.use("/link",linkRoutes);




app.get('/:id', async (req, res) => {
  const ID = req.params.id;
  const link = await Link.findOne({ code: ID });

  if (!link) {
    return res.status(404).json({ error: "URL not found" });
  }

  // Check if the link is expired
  const currentTime = new Date();
  const creationTime = link.createdAt;
  const tenMinutesInMilliseconds = 10 * 60 * 1000; // 10 minutes in milliseconds

  if (currentTime - creationTime > tenMinutesInMilliseconds) {
    // Move the link to expiredLinks array
    link.expiredLinks.push({
      originalURL: link.originalURL,
      code: link.code,
      shortenedURL: link.shortenedURL,
    });

    // Increment expired link count
    link.expiredLinkCount++;

    // Save the changes
    await link.save();

    return res.status(410).json({ error: "URL has expired" });
  }

  link.visited++;
  await link.save();

  return res.redirect(link.originalURL);
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
