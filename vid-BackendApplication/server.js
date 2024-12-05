const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/route');


dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());

// Google OAuth Setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    scope: ['profile', 'email'],  // Add the scope parameter here
  }, (accessToken, refreshToken, profile, done) => {
    // Store the profile in the session or database
    return done(null, profile);
  }));
  

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/users', userRoutes);  // User-related routes

// Google OAuth Routes
app.get('/auth/google', (req, res) => {
  res.redirect('/auth/google');
});

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      // Assuming you have generated a token or some other value to send to the frontend
      const user = req.user; // This will contain the user's Google profile
  
      // Here, we'll send a redirect to the frontend (localhost:4200/admin)
      // You can append any necessary data (such as a token) as query parameters.
      const token = "your_generated_token"; // Replace with actual token generation logic
      
      // You could also send the user profile or any other information
      res.redirect(`http://localhost:4200/auth/callback?token=${token}&user=${JSON.stringify(user)}`);
    }
  );
  

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.send('Logged out');
  });
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json(req.user);
  }
  res.status(401).send('You are not logged in');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 