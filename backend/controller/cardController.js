const Card = require('../model/cardModel');
const User = require('../model/userModel');

exports.getCards = (req, res, next) => {
    Card.findOneAndUpdate({ userId : req.body.userId }, { location :  {
        type : "Point",
        coordinates : [Number(req.body.lng),Number(req.body.lat)]
    }})
    .then(response => {
                Card.find({$and : [
                    { userId : { $nin : response.shown }},
                    {
                        location : {
                            $near : {
                                $maxDistance : req.body.maxDistance * 1000,
                                $geometry : {
                                    type : "Point",
                                    coordinates : [req.body.lng,req.body.lat]
                                }
                            }
                        }
                    },
                    { gender : req.body.showOnly }
                ]})
                .populate({path : 'userId'})
                        .then(cards => {  
                            let newCards = [];
                            cards.map( card => {
                                  const newCard = card.toObject();
                                  newCard.age = new Date().getFullYear() - card.userId.dateOfBirth.getFullYear();
                                  newCard.distance = distance(req.body.lat,req.body.lng,newCard.location.coordinates[1],newCard.location.coordinates[0],'K');
                                  newCards.push(newCard);
                            })
                            res.status(200).json({
                                message : newCards
                            })
                        })
            })

    .catch(err => {
        err.statusCode = 500;
        next(err);
    })
  
}

function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		if(dist < 1){
            return Math.round(dist * 1000) + ' meter'
        }
        else {
            return Math.round(dist) + ' KM'
        }
	}
}

exports.swipeCards = (req,res,next) => {
    Card.findOneAndUpdate({ userId : req.body.userId }, { $push : { shown : req.body.id } })
    .then(response => {
        if(req.body.direction === 1){
              Card.findOneAndUpdate({ userId : req.body.userId }, { $push : { liked : req.body.id } })
              .then(likedRes => {
                  const match = req.body.liked.includes(req.body.userId)
                  if(match){
                      Card.findOneAndUpdate({ userId : req.body.userId }, { $push : { matches : req.body.id } })
                      .then(matchRes => {
                            Card.findOneAndUpdate({ userId : req.body.id }, { $push : { matches : req.body.userId } })
                            .then(matchRes => {
                                res.status(200).json({
                                    message : matchRes
                                })        
                            })
                            .catch(err => {
                                err.statusCode = 500;
                                next(err);
                            });
                      })
                      .catch(err => {
                            err.statusCode = 500;
                            next(err);
                      });
                  }
                  else{
                    res.status(200).json({
                        message : likedRes
                    })
                  }
              })
              .catch(err => {
                err.statusCode = 500;
                next(err);
              })  
        }
        else{
            res.status(200).json({
                message : response
            })
        }
    })
    .catch(err => {
        err.statusCode = 500;
        next(err);
    })
    
}

exports.getMatches =  (req,res,next) => {
    User.find({ _id : { $in : req.body.matches } })
       .then(response => {
            res.status(200).json({
                message : response
            })
       })
       .catch(err => {
            err.statusCode = 500;
            next(err);
       })
}