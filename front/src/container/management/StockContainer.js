import React, { useEffect } from 'react';
import Stock from '../../components/management/Stock';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockManagement } from '../../modules/management';
import {
  updateUpload,
  removeProduct,
  readProduct,
} from '../../lib/api/product';
import { setOriginalUpload } from '../../modules/upload';

const StockContainer = ({ match, history }) => {
  // console.log(match)
  // console.log(history)
  const dispatch = useDispatch();
  const {
    management,
    loading,
    seller,
  } = useSelector(({ management, loading, user}) => ({
    management: management.management,
    managementError: management.managementError,
    loading: loading['management/STOCK_MANAGEMENT'],
    seller: user.user,
  }));

  console.log(management);
  const onCheckedChange = (e) => {
    // enable ? true : false
    console.log(e.target.value);
  };

  const onRemove = async () => {
    // try{
    //   await removeProduct(management._id)
    //   history.push('/')
    // } catch (e) {
    //   console.log(e)
    // }
  };

  useEffect(() => {
    dispatch(stockManagement({seller}));
  }, [dispatch]);

  return (
    <Stock
      Products={management}
      onCheckedChange={onCheckedChange}
      onRemove={onRemove}
    />
  );
};
export default withRouter(StockContainer);
