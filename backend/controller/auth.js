const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const Card = require('../model/cardModel');

exports.authUser = (req, res, next) => {
    axios.get(`https://graph.facebook.com/me?access_token=${req.body.fbToken}`)
    .then( response => {
        const showonly = req.body.gender === 'male' ? 'female' : 'male';
        const user = { 
            userId : req.body.userId,
            name : req.body.name,
            profileUrl : req.body.profileUrl,
            dateOfBirth : req.body.birthday,
            gender : req.body.gender,
            setting : { showOnly : showonly }
         };
         User.findOne({ userId : user.userId }).exec()
           .then(userDoc => {
                if(userDoc){
                    const token = jwt.sign(
                        {
                            userId : userDoc.userId
                        },
                        'secret',
                        {
                            expiresIn : "1h"
                        }
                    )
                    return res.status(201).json({
                        message : 'User exists',
                        data : userDoc,
                        token : token,
                        expiresIn : "3600"
                    })
                }
                const userModel = new User(user);
                return userModel.save()
                .then(userDoc => {
                    const cardInfo = {
                        userId : userDoc._id,
                        location : {
                            coordinates : [0,0]
                        },
                        shown : [userDoc._id],
                        gender : userDoc.gender
                    }
                    const cardModel = new Card(cardInfo)
                    return cardModel.save()
                    .then(resp => {
                        console.log(userDoc);
                        const token = jwt.sign(
                            {
                                userId : userDoc.userId
                            },
                            'secret',
                            {
                                expiresIn : "1h"
                            }
                        );
                        return res.status(201).json({
                            message : 'User Created',
                            data : userDoc,
                            token : token,
                            expiresIn : "3600"
                        })
                    })
               })
           })
           .catch(err => {
               err.statusCode = 500;
               next(err);
           })
    })
    .catch ( err => {
        let error = { statusCode: 401, message : 'Couldn\'t log you right now' }
        next(error);
    });
}