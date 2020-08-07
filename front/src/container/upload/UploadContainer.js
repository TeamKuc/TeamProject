import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  productUpload,
  changeField,
  initialize,
  updateUpload,
} from '../../modules/upload';
import UploadProduct from '../../components/upload/UploadProduct2';

const UploadContainer = ({ history }) => {
  const dispatch = useDispatch();

  const {
    user,
    stock,
    thumbnails,
    title,
    description,
    price,
    images,
    discount,
    person,
    enable,
    productId,
    category,
  } = useSelector(({ upload, user }) => ({
    user: user.user,
    stock: upload.stock,
    thumbnails: upload.thumbnails,
    title: upload.title,
    description: upload.description,
    price: upload.price,
    images: upload.images,
    discount: upload.discount,
    person: upload.person,
    enable: upload.enable,
    productId: upload.productId,
    category: upload.category,
  }));

  const product = {
    stock,
    thumbnails,
    title,
    description,
    price,
    images,
    discount,
    person,
    enable,
    category,
  };

  const onPublish = () => {
    if (productId) {
      dispatch(
        updateUpload({
          id: productId,
          stock,
          thumbnails,
          title,
          description,
          price,
          images,
          discount,
          person,
          enable,
          category,
        }))
        return
    }
    dispatch(
      productUpload({
        // user,
        stock,
        thumbnails,
        title,
        description,
        price,
        images,
        discount,
        person,
        enable,
        category,
      }),
    );
    // history.push('/');
  };

  const onChange = (e) => {
    console.log('call');
    const { value, name } = e.target;
    dispatch(
      changeField({
        key: name,
        value,
      }),
    );
  };

  // useEffect(() => {
  //   return () => {
  //     dispatch(initialize());
  //   };
  // }, [dispatch]);

  console.log(product)

  return (
    <UploadProduct
      onPublish={onPublish}
      onChange={onChange}
      product={product}
    />
  );
};

export default withRouter(UploadContainer);
