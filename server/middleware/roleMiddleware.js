// middleware/checkRole.js
const User = require('../models/User'); // Adjust the path according to your structure

const checkRole = (requiredRole) => {
  
  return async (req, res, next) => {
    try {
      // Assuming req.user is set by authentication middleware
      
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(401).json({ msg: 'User not found' });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ msg: 'Access denied' });
      }

      next(); // Role is correct, proceed to the next middleware or route handler
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
};

module.exports = checkRole;
