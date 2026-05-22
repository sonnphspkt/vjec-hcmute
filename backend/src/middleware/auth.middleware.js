const jwt = require('jsonwebtoken');
const asyncHandler = require('./async.middleware');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User.model');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse('User not found', 404));
    }

    if (!req.user.isActive) {
      return next(new ErrorResponse('Account is deactivated', 401));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};

// Check if user owns the resource
exports.checkOwnership = (modelName) => {
  return asyncHandler(async (req, res, next) => {
    const Model = require(`../models/${modelName}.model`);
    const resource = await Model.findById(req.params.id);

    if (!resource) {
      return next(
        new ErrorResponse(`${modelName} not found with id of ${req.params.id}`, 404)
      );
    }

    // Check ownership
    const userId = resource.user?.toString() || resource.student?.toString() || resource.company?.toString();
    
    if (userId !== req.user.id && req.user.role !== 'super_admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to access this resource`,
          403
        )
      );
    }

    req.resource = resource;
    next();
  });
};
