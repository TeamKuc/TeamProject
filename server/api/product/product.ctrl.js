import Product from '../../models/product';
import Pay from '../../models/payment';
import multer from 'multer';
import mongoose from 'mongoose'
import Deal from '../../models/deal';
import Delivery from '../../models/delivery'
import Seller from '../../models/seller';


const ObjectId = mongoose.Types.ObjectId;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(
        res.status(400).end('jpg, png 파일만 업로드 가능합니다!'),
        false,
      );
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single('file');

let storageThumbnail = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'thumbnails/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(
        res.status(400).end('jpg, png 파일만 업로드 가능합니다!'),
        false,
      );
    }
    cb(null, true);
  },
});

let upload2 = multer({ storage: storageThumbnail }).single('file');

export const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);

    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

export const uploadThumbnail = (req, res) => {
  console.log(req.body);
  upload2(req, res, (err) => {
    console.log(req.file);
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

export const productUpload = (req, res) => {
  // console.log(req.body);
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true });
  });
};

export const productPaid = async (req, res) => {
  console.log(req.body)
  const pay = new Pay(req.body);
  await pay.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true })
  })
  await Product.updateOne({ _id: req.body.product }, { $inc: { stock: -1 } })
}

export const productPaidSeller = (req, res) => {
  const paid = new Seller(req.body)
  paid.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true })
  })
}

export const getProducts = (req, res) => {
  Product.find({}, (err, result) => {
    if (err)
      return res.status(409).json({
        success: false,
        err,
      });
    res.json(result);
  });
};

export const readProduct = (req, res) => {

  const { id } = req.params;
  Product.findOne({ _id: id }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.json(result);
  });
};

export const config = (req, res) => {
  const { headers } = req;
  console.log(headers._id);
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
  // const {id} = req.body
  Product.find({}, (err, result) => {
    if (err)
      return res.status(409).json({
        success: false,
        err,
      });
    res.json(result);
  });
};


export const updateUpload = (req, res) => {
  console.log(req.body)
  // const { id } = req.params;
  const { stock, thumbnails, title, description, price, images, discount, person, enable } = req.body
  Product.findOneAndUpdate({ _id: req.body.id }, { $set: { stock: stock, thumbnails: thumbnails, title: title, description: description, price: price, images: images, discount: discount, person: person, enable: enable } }, (err, result) => {
    if (err) return res.status(404).json({
      message: 'Changed error',
      Change: false
    })
    res.json({
      message: 'Success User Infomation Change',
      Change: true
    })
  })
}

export const stockDetail = (req, res) => {
  console.log(req.params)
  const { id } = req.params;
  Product.findOne({ _id: id }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.json(result);
  });
}

export const getDeal = (req, res) => {
  console.log(req.body.product)
  Deal.find({ product: req.body.product }, (err, result) => {
    if (err) return res.status(400).json({ success: false, Message: err })
    res.json(result)
  })
}

export const deliveryUpload = (req, res) => {
  console.log(req.body);
  const delivery = new Delivery(req.body);
  delivery.save((err) => {
    if (err) return res.status(400).json({ success: false, Message: err });
    return res.status(200).json({ success: true });
  });
};