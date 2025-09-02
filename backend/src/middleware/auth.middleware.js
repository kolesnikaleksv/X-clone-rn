export const protectRoute = async (req, res, next) => {
  console.log('Auth payload:', req.auth);
  if (!req.auth.isAuthenticated) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - you must be logged in' });
  }
  next();
};
