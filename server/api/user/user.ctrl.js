import User from '../../models/user';
import Pay from '../../models/payment'
import Product from '../../models/product';
import Deal from '../../models/deal'


export const list = (req, res) => {
    if (!req.decode.admin) {
        return res.status(403).json({
            message: 'you are not adimn',
        });
    }
    User.find({}).then((users) => {
        res.json({ users });
    });
};

export const userInfo = (req, res) => {
    const { _id } = req.params
    // console.log(_id)
    User.findOne({ _id: _id }, (err, result) => {
        if (err) res.status(404).json({
            message: err
        });
        res.json(result)
    })
}

export const userUpdate = async (req, res) => {

    const { userID, name, password, email } = req.body

    User.findOneAndUpdate({ _id: req.body._id }, { userID: userID, name: name, password: password, email: email }, (err, result) => {
        if (err) return res.status(404).json({
            message: 'Changed error',
            Change: false
        })
        res.json({
            message: 'Success User Infomation Change',
            Change: true,
            result: result
        })
    })
}

export const gethistory = (req, res) => {
    console.log(req.body)
    Pay.find({ user: req.body.user }, (err, result) => {
        if (err) return res.status(500).json({
            message: err,
            success: false
        })
        res.json(result);

    })
}

export const sellHistory = (req, res) => {
    console.log(req.body)
    Pay.find({ seller: req.body.user }, (err, result) => {
        if (err) return res.status(500).json({
            success: false,
            message: err
        })
        res.status(200).json(result)
    })
}

export const findDeal = (req, res) => {
    console.log("product:" + req.body._id)
    Deal.find({ product: req.body._id }, (err, result) => {
        console.log(result)
        if (err) res.status(400).json({
            success: false,
            message: err
        })
        res.json(result)
    })
}

export const makeDeal = (req, res) => {
    console.log('make call')
    const deal = new Deal(req.body)
    console.log(req.body)
    const user = req.body.user

    Deal.findOne({ $and: [{ product: req.body.product }, { user: req.body.user }] }, (err, result) => {
        console.log("deal:" + result)
        if (result) {
            console.log('deal exist')
            res.status(409).json({
                success: false,
                message: '이미 딜을 생성하셨습니다'
            })
        } else {
            console.log('deal save')
            deal.save((err, result) => {
                if (err) res.status(400).json({
                    success: false,
                    message: err
                })
                res.json(result)
            })
        }
    }
    )
}



export const joinDeal = (req, res) => {
    console.log('call')
    console.log(req.body)

    Deal.findOneAndUpdate({ _id: req.body._id }, { $push: { user: req.body.user } }, (err, result) => {
        console.log(result)
        if (err) res.status(400).json({
            success: false,
            message: err
        })
        Product.findOne({ _id: result.product }, (err, resP) => {
            if (resP.person === result.user.length + 1) {
                Deal.findOneAndUpdate({ product: resP._id }, { complete: true }, (err, resultD) => {
                    console.log(resultD)
                })
            }
        });
        res.status(200).json({
            message: 'join success'
        })
    })
}

export const checkDeal = (req, res) => {
    console.log(req.body)
    Deal.findOne({ user: req.body.user }, (err, result) => {
        console.log(result.complete)
        if (err) return res.status(500).json({
            success: false,
            message: 'server error'
        })
        if (result.complete) {
            res.status(200).json(result.complete)
        } else {
            res.status(409).json({
                success: false,
                message: '딜에 참여해주세요!'
            })

        }
    })
}

