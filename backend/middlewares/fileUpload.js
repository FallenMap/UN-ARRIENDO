const path = require('path');
const multer  = require('multer')
// const maxPhotos = 10;

// Uploads user profile photos, during registration or updates
module.exports.userPhoto = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname, '../public/userPhotos/'))
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          const fileExtension = file.mimetype.split('/')[1]
          cb(null, uniqueSuffix + '.' + fileExtension)
        }
        
      });
    const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    });
    
    return upload.single('photo')(req, res, () => {
      // Remember, the middleware will call it's next function
      // so we can inject our controller manually as the next()
  
      //if (!req.file) return res.json({ error: ErrorMessages.invalidFiletype })
      next()
    });
  };

// // Uploads listings pictures
// module.exports.listingPhotos = (req, res, next) => {
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public/listingPhotos/'))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const fileExtension = file.mimetype.split('/')[1]
//         cb(null, uniqueSuffix + '.' + fileExtension)
//     }
    
//     });
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });
// return upload.array('photos', maxPhotos)(req, res, () => {
//     // Remember, the middleware will call it's next function
//     // so we can inject our controller manually as the next()

//     //if (!req.file) return res.json({ error: ErrorMessages.invalidFiletype })
//     next()
// });
// };

// // Uploads reviews photos
// module.exports.reviewPhotos = (req, res, next) => {
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public/reviewPhotos/'))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         const fileExtension = file.mimetype.split('/')[1]
//         cb(null, uniqueSuffix + '.' + fileExtension)
//     }
    
//     });
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });
// return upload.array('photos', maxPhotos)(req, res, () => {
//     // Remember, the middleware will call it's next function
//     // so we can inject our controller manually as the next()

//     //if (!req.file) return res.json({ error: ErrorMessages.invalidFiletype })
//     next()
// });
// };