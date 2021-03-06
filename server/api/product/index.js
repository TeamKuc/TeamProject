import express from 'express';
import * as productCtrl from './product.ctrl';

const router = express.Router();

router.post('/uploadImage', productCtrl.uploadImage);
router.post('/uploadThumbnail', productCtrl.uploadThumbnail);

router.post('/productUpload', productCtrl.productUpload);
router.post('/updateUpload', productCtrl.updateUpload);
router.post('/productDelete',productCtrl.productDelete)
router.post('/searchProduct/:id', productCtrl.searchProduct);

router.get('/getProducts', productCtrl.getProducts);
router.post('/readProduct/:id', productCtrl.readProduct);
router.post('/stockDetail/:id', productCtrl.stockDetail);

router.get('/config', productCtrl.config);
router.post('/getStock', productCtrl.getStock);
router.post('/getDeal', productCtrl.getDeal);

router.get('/userPaid');
router.post('/paid', productCtrl.productPaid);
router.get('/productPaidSeller', productCtrl.productPaidSeller);

router.post('/deliveryUpload', productCtrl.deliveryUpload);

router.post('/reviewUpload', productCtrl.reviewUpload);
router.post('/readReview', productCtrl.readReview);

router.post('/endTime', productCtrl.endTime);

export default router;
