const Contact = require('../models/contact');
const Review = require('../models/review');

exports.createContact = (req, res, next) => {
  let contact;
  if (req.body.assetId) {
    contact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      message: req.body.message,
      assetId: req.body.assetId,
      address: req.body.address,
      type: req.body.type
    });
    contact.save()
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'success'
          });
        } else {
          res.status(401).json({
            message: 'failed'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Unknown error occurred.',
          error: error
        });
      });
  } else {
    contact = new Contact({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      message: req.body.message,
      assetId: '',
      address: '',
      type: ''
    });
    contact.save()
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'success'
          });
        } else {
          res.status(401).json({
            message: 'failed'
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: 'Unknown error occurred.',
          error: error
        });
      });
  }
}

exports.getAllMessages = (req, res, next) => {
  Contact.find()
    .then(messages => {
      if (messages) {
        res.status(200).json({
          message: 'Messages fetched successfully',
          messages: messages
        });
      } else {
        res.status(401).json({
          message: 'Failed to find any messages'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
}

exports.deleteMessage = (req, res, next) => {
  Contact.findOneAndDelete({ _id: req.params.id })
    .then(deletedMsg => {
      if (deletedMsg) {
        res.status(200).json({
          message: 'success'
        });
      } else {
        res.status(401).json({
          message: 'failed'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Unknown error occurred.',
        error: error
      });
    });
}

exports.createReview = (req, res, next) => {
  const review = new Review({
    name: req.body.name,
    email: req.body.email,
    date: Date.now(),
    message: req.body.message,
    rating: req.body.rating
  });

  review.save()
    .then(result => {
      if (result) {
        res.status(200).json({ message: 'success' });
      }
      else {
        res.status(401).json({ message: 'failed' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error});
    });
}

exports.getAllReviews = (req, res, next) => {
  Review.find()
    .then(reviews => {
      if (reviews) {
        res.status(200).json({
          message: 'Fetched reviews successfully.',
          reviews: reviews
        });
      } else {
        res.status(401).json({
          message: 'Fetched reviews failed.'
        });
      }
    })
    .catch(errror => {
      res.status(500).json({
        message: 'Unknown error occurred.',
        error: error
      });
    });
}

exports.deleteReview = (req, res, next) => {
  Review.findOneAndDelete({ _id: req.params.id })
    .then(deletedReview => {
      if (deletedReview) {
        res.status(200).json({ message: 'success' });
      } else {
        res.status(401).json({ message: 'failed' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
}
