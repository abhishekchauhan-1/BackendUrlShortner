const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport"); // Assuming you're using Passport for authentication
const User = require("../model/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // No token is generated during signup
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signin = (req, res, next) => {
  console.log("Sign-in request body:", req.body);

  passport.authenticate(
    "local",
    { session: false },
    async (err, user, info) => {
      try {
        if (err) {
          console.error(err);
          return next(err);
        }

        if (!user) {
          console.log("User not found");
          return res.status(401).json({ error: "Unauthorized" });
        }

        // If authentication is successful, generate a JWT token
        const token = jwt.sign({ userId: user._id }, "your_secret_key", {
          expiresIn: "1h",
        });

        console.log("Generated Token:", token);

        res.status(200).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            links: user.links,
            __v: user.__v,
          },
          token: token,
        });
        
      } catch (tokenError) {
        console.error(tokenError);
        res.status(500).json({ error: "Token Generation Error" });
      }
    }
  )(req, res, next);
};
