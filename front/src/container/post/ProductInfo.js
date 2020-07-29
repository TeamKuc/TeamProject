import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { readProduct, unloadProduct } from '../../modules/landing';
import Product from '../../components/post/Product'
import ProductImage from '../../components/post/ProductImage'


const ProductInfo = ({ params, history }) => {
    const { IMP } = window;
    const { productId } = '';
    const dispatch = useDispatch()
    const { product, user } = useSelector(({ landing, user }) => ({
        product: landing.product,
        user: user.user
    }))
    console.log(params)
    useEffect(() => {
        try {
            dispatch(readProduct(productId))
            return () => {
                dispatch(unloadProduct())
            }
        } catch (error) {

        }
    }, [dispatch])

    const onPay = (e) => {
        const userCode = 'imp97305641'
        e.preventDefault();
        const data = {
            pg: 'kg_inisis',
            pay_method: 'vstf',
            merchant_uid: user._id + product._id,
            name: product.title,
            amount: product.amount,
            buyer_name: user.name,
            buyer_tel: user.phone,
            buyer_email: user.email,
            escrow: false,
        }

        IMP.init(userCode);
        IMP.request_pay(data, callback);
    }
    const callback = (response) => {
        console.log(response)
        if (response.success) {

        } else {
            alert('결제오류!')
            return
        }
    }
    return (
        <div>
            <Product info={product} buyProduct={onPay} />
            <ProductImage info={product} />
        </div>
    )
}

export default ProductInfo