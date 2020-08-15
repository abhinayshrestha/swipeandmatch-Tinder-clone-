const User =  require('../model/userModel');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

mongoose.set('useFindAndModify', false);

exports.fileUpload = (req, res, next) => {
    const url = 'https://swipeandmatch.herokuapp.com/'+req.file.path.replace(/\\/g, "/");
    User.findOneAndUpdate({ userId : req.userId }, {$push: {photos: url}}).select('photos')
        .then(photos => {
            photos.photos.push(url);
            res.status(200).json({
                data : url
            })
        }) 
        .catch(err => {
            err.statusCode = 500;
            next(err);
        })
}

exports.getFile = (req, res, next) => {
    User.findOne({ userId : req.userId }).select('photos')
        .then(photos => {
            res.status(200).json({
                data : photos 
            })
        })
        .catch(err => {
            err.statusCode = 500;
            next(err);
        })
}

exports.deleteFile = (req, res, next) => {
    const url = req.body.url
    removeFile(url,next);               
    User.findOne({ userId : req.userId }).select('photos')
         .then(response => {
            const index = response.photos.findIndex((el,i,arr) => url===el) 
            response.photos.splice(index,1);
            return response.save();
         })
         .then(response => {
            res.json({
                message : response
            })
         })
         .catch(err => {
            res.json({
                message : err
            })
         })
}


exports.deleteProfilePic = (req, res, next) => {
    const url = 'http://localhost:8080/'+req.file.path.replace(/\\/g, "/");
    User.findOne({ userId : req.userId }).select('profileUrl')
        .then(response => {
            response.profileUrl = url;
            return response.save()
        })
        .then(response => {
            res.json({
                message : response
            })
        })
        .catch(err => {
            err.statusCode = 500;
            next(err);
        })
}

const removeFile = (url,next) => {
    const fileName = url.slice(url.lastIndexOf('/') + 1)    
    const link = path.join('public','uploads',fileName);
    fs.unlink(link, err => {
        if(err){
            next(err);
        }
    })
 } 