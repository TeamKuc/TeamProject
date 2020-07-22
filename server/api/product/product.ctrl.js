<<<<<<< HEAD
import Product from '../../models/product';
import multer from 'multer';

var storage = multer.diskStorage({
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
    cb(null, 'thumbnail/');
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
  console.log(req.body);
  upload(req, res, (err) => {
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
  upload2(req, res, (err) => {
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

export const uploadProduct = (req, res) => {
  console.log(req.body)
  const product = new Product(req.body);

  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
};

export const getProducts = (req, res)=>{
  Product.find({},(err,result)=>{
    if(err) return res.status(409).json({
      success:false, err
    })
    res.json(result)
  })
}
=======
// import Product from '../../models/product';
// import multer from 'multer';

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log(file);
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== '.jpg' || ext !== '.png') {
//       return cb(
//         res.status(400).end('jpg, png 파일만 업로드 가능합니다!'),
//         false,
//       );
//     }
//     cb(null, true);
//   },
// });

// var upload = multer({ storage: storage }).single('file');

// export const uploadImage = (req, res) => {
//   console.log(req.body);
//   upload(req, res, (err) => {
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     return res.json({
//       success: true,
//       image: res.req.file.path,
//       fileName: res.req.file.filename,
//     });
//   });
// };

// export const uploadThumbnail = (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       return res.json({ success: false, err });
//     }
//     return res.json({
//       success: true,
//       image: res.req.file.path,
//       fileName: res.req.file.filename,
//     });
//   });
// };

// export const uploadProduct = (req, res) => {
//   const product = new Product(req.body);

//   product.save((err) => {
//     if (err) return res.status(400).json({ success: false, err });
//     return res.status(200).json({ success: true });
//   });
// };
>>>>>>> 173e0f07595014dd2b535d0d6b2189995cf14739