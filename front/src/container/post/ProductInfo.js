import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { readProduct, unloadProduct } from '../../modules/landing';
import Product from '../../components/post/Product'
import ProductImage from '../../components/post/ProductImage'
import { withRouter } from 'react-router-dom';
import { productPaid } from '../../modules/upload';

const ProductInfo = ({ match, history }) => {
    const dispatch = useDispatch()
    const { IMP } = window;
    const { product, user } = useSelector(({ landing, user }) => ({
        product: landing.productDetail,
        user: user.user
    }))
    // console.log(params)
    useEffect(() => {
        const { id } = match.params
        dispatch(readProduct(id))
        return () => {
            dispatch(unloadProduct())
        }
    }, [dispatch])

    const onClick = () => {
        if(!user) return alert('권한이 없습니다');
        IMP.init('imp97305641');
        IMP.request_pay({
            pg: 'kakao', // version 1.1.0부터 지원.
            pay_method: 'card',
            merchant_uid: 'merchant_' + new Date().getTime(),
            name: product.title,
            amount: 1000,
        }, function (rsp) {
            if (rsp.success) {
                var msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + rsp.imp_uid;
                msg += '상점 거래ID : ' + rsp.merchant_uid;
                msg += '결제 금액 : ' + rsp.paid_amount;
                msg += '카드 승인번호 : ' + rsp.apply_num;
                dispatch(productPaid({user,product:product._id,seller:product.user}))
                // window.location.reload()
            } else {
                var msg = '결제에 실패하였습니다.';
                msg += '에러내용 : ' + rsp.error_msg;
            }
            alert(msg);
        });
    }

    return (
        <>
            <ProductImage info={product} />
            <Product info={product} buy={onClick} />
        </>
    )
}

export default withRouter(ProductInfo)