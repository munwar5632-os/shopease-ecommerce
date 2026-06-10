// ============================================
// WHY: We need to generate JWT tokens in multiple places (login, register, password reset).
//      This function keeps the token generation logic in one place.
// ============================================

import jwt from "jsonwebtoken";

// WHAT: Takes a user ID and returns a signed JWT token
// HOW: jwt.sign() creates a token with the user ID as payload
//      The token expires in 30 days
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateToken;
