const express = require('express');
const router = express.Router({ mergeParams: true });

const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

// Static URL routes
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// Dynamic URL routes
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;