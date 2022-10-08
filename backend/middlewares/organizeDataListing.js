module.exports = (req, res, next) => {
    let characteristics = [
        'furnished',
        'stratum',
        'privateArea',
        'rooms',
        'privateBathrooms',
        'petFriendly',
        'carParking',
        'bicycleParking',
        'storage',
        'communalAreas'
    ];

    if (req.body.type.toLowerCase() == "apartment") {

        characteristics = [...characteristics, 
            'kitchen'
        ];


    } else if (req.body.type.toLowerCase() == "room") {

        characteristics = [...characteristics, 
            'publicArea',
            'sharedBathrooms',
            'sharedKitchen',
            'sharedCleaningArea',
            'includedServices',
            'genderSpecific',
            'curfew'
        ];


    }else if(req.body.type.toLowerCase() == "studioapartment"){
        
        characteristics = [...characteristics, 
            'cleaningArea'
        ];

    }

    let group = {};

    for(let i in characteristics){
        if(req.body[i]){
            group[i]=req.body[i];
            delete req.body[i];
        }
    }

    req.body['characteristics'] = group;
    next();
}