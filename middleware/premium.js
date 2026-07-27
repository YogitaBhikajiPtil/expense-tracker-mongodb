const checkPremium = (req, res, next) => {
  if (!req.user.isPremiumUser) {
    return res.status(403).json({
      message: "This feature is only for premium users"
    });
  }
  next();
};

module.exports = {checkPremium}