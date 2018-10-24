const Asset = require('../models/asset');

exports.createAsset = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const photos = [];

  for (let i = 0; i < req.body.photosAmount; i++) {
    const path = url + '/images/' + req.files[i]['filename'];
    photos.push(path);
  }

  let totalFloors = req.body.totalFloors;
  let assetFloor = req.body.assetFloor;
  if (totalFloors === null) {
    totalFloors = 0;
  }
  if (assetFloor === null) {
    assetFloor = 0;
  }

  const asset = new Asset({
    type: req.body.type,
    address: req.body.address,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    roomsAmount: req.body.roomsAmount,
    size: req.body.size,
    photos: photos,
    neighborhood: req.body.neighborhood,
    totalFloors: totalFloors,
    assetFloor: assetFloor,
    entranceDate: req.body.entranceDate,
    isAirCondition: req.body.isAirCondition,
    isElevator: req.body.isElevator,
    isBalcony: req.body.isBalcony,
    isParking: req.body.isParking,
    isShield: req.body.isShield,
    isStroeroom: req.body.isStroeroom
  });
  console.log(asset);
  asset.save()
    .then(savedAsset => {
      if (savedAsset) {
        res.status(200).json({
          message: 'Asset created successfully.'
        });
      } else {
        res.status(401).json({
          message: 'Asset creation failed.'
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

exports.getAssetsByType = (req, res, next) => {
  console.log(req.query.type);
  Asset.find({ type: req.query.type })
    .then(assets => {
      if (assets) {
        console.log(assets);
        res.status(200).json({
          message: 'Assets fetched successfully.',
          assets: assets
        });
      } else {
        res.status(401).json({
          message: 'Failed to fetch assets.'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Unknown error occurred.'
      });
    });
}

exports.getAssetById = (req, res, next) => {
  Asset.findOne({ _id: req.params.id })
    .then(asset => {
      if (asset) {
        res.status(200).json({
          message: 'Asset fetched successfully.',
          asset: asset
        });
      } else {
        res.status(401).json({
          message: 'Failed to fetch the asset.'
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

exports.deleteAsset = (req, res, next) => {
  Asset.deleteOne({ _id: req.params.id })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: 'Asset deleted successfully.',
          status: 200
        });
      } else {
        res.status(401).jaon({
          message: 'Failed to delete asset.',
          status: 401
        });
      }
    })
    .catch(error => {
      res.status(500).jaon({
        message: 'Asset not found or unknown error occurred.',
        error: error,
        status: 500
      });
    });
}
