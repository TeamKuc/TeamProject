import Product from '../../models/product';
import Pay from '../../models/payment';
import multer from 'multer';
import multerS3 from 'multer-s3';
import mongoose from 'mongoose';
import Deal from '../../models/deal';
import Seller from '../../models/seller';
import Review from '../../models/review';
import path from 'path';
import AWS from 'aws-sdk';
import Payment from '../../models/payment';

AWS.config.loadFromPath('config/awsconfig.json');

let s3 = new AWS.S3();

const ObjectId = mongoose.Types.ObjectId;

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'teamkucc2',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
}).single('file');

let upload2 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'teamkucc',
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: 'public-read-write',
  }),
}).single('file');

export const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: req.file,
    });
  });
};

export const uploadThumbnail = (req, res) => {
  upload2(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: req.file,
    });
  });
};

export const productUpload = (req, res) => {
  console.log(req.body);
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true });
  });
};

export const productPaid = async (req, res) => {
  const pay = new Pay(req.body);
  await pay.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true });
  });
  await Product.updateOne({ _id: req.body.product }, { $inc: { stock: -1 } });
};

export const productPaidSeller = (req, res) => {
  const paid = new Seller(req.body);
  paid.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true });
  });
};

export const getProducts = (req, res) => {
  const product = [];
  Product.find({}, (err, result) => {
    if (err)
      return res.status(409).json({
        success: false,
        err,
      });
    result.forEach((element) => {
      if (element.enable&&!element.isDelete) {
        product.push(element);
      }
    });
    res.json(product);
  });
};

export const readProduct = (req, res) => {
  const { id } = req.params;
  Product.findOne({ _id: id }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.json(result);
  });
};

export const productDelete = (req,res)=>{
  console.log('call')
  console.log(req.body)
  Product.findOneAndUpdate({_id:req.body.id},{isDelete:true},(err,result)=>{
    if(err) return res.status(400).json({
      message:'error!:'+err
    })
    res.json(result)
  })
}

export const config = (req, res) => {
  const { headers } = req;
  const token = headers._id;

  BootpayRest.setConfig(
    '5f1fb31b02f57e00333052f9',
    'bVk2alHM4fcHf9b9MYX6SwjT2f3txa8EzFdgEW5Suas=',
  );

  BootpayRest.getAccessToken().then(function (response) {
    if (response.status === 200 && response.data.token !== undefined) {
      BootpayRest.verify('5df6e67d4f74b4002a77e0eb').then(function (_response) {
        res.json({
          _response,
        });
      });
    }
  });
};

export const getStock = (req, res) => {
  Product.find({ seller: req.body.seller }, (err, result) => {
    if (err)
      return res.status(409).json({
        success: false,
        err,
      });
    res.json(result);
  });
};

export const updateUpload = (req, res) => {
  const {
    stock,
    thumbnails,
    title,
    description,
    price,
    images,
    discount,
    person,
    enable,
  } = req.body;
  Product.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        stock: stock,
        thumbnails: thumbnails,
        title: title,
        description: description,
        price: price,
        images: images,
        discount: discount,
        person: person,
        enable: enable,
      },
    },
    (err, result) => {
      if (err)
        return res.status(404).json({
          message: 'Changed error',
          Change: false,
        });
      res.json({
        message: 'Success User Infomation Change',
        Change: true,
      });
    },
  );
};

export const stockDetail = (req, res) => {
  const { id } = req.params;
  Product.findOne({ _id: id }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.json(result);
  });
};

export const getDeal = (req, res) => {
  Deal.find({ product: req.body.product }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    res.json(result);
  });
};

export const searchProduct = (req, res) => {
  const { id } = req.params;
  Product.find({ title: { $regex: id } }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    res.json(result);
  });
};

const existReview = (req) => {
  Review.findOne(
    { $and: [{ id: req.body.id }, { user: req.body.user }] },
    (err, result) => {
      console.log('result' + result);
      if (err) return err;
      return result;
    },
  );
};

export const reviewUpload = (req, res) => {
  const exist = existReview(req);

  if (exist)
    return res.status(409).json({
      message: 'Review already exist',
      success: false,
    });
  const review = new Review(req.body);

  Payment.findOne(
    { $and: [{ product: req.body.id }, { user: req.body.user }] },
    (err, result) => {
      console.log('This is result:' + typeof result);
      if (result) {
        review.save((err) => {
          if (err)
            return res.status(400).json({ success: false, Message: err });
          return res.status(200).json({ success: true });
        });
      } else {
        res.status(409).json({
          message: 'Please Buy product',
          success: false,
        });
      }
    },
  );
};

export const readReview = (req, res) => {
  Review.find({ id: req.body.id }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.json(result.sort((a, b) => a.created - b.created));
  });
};

export const deliveryUpload = (req, res) => {
  const { id, delivery, deliveryNumber } = req.body;
  Payment.findOneAndUpdate(
    { _id: id },
    { $set: { delivery: delivery, deliveryNumber: deliveryNumber } },
    (err) => {
      if (err) return res.status(400).json({ success: false, Message: err });
      return res.status(200).json({ success: true });
    },
  );
};

export const endTime = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.body.product },
    { enable: false },
    (err, result) => {
      if (err)
        return res.status(409).json({
          message: err,
          success: false,
        });
      res.status(200).json(result);
    },
  );
};
