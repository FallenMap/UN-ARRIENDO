
const path = require("path");
const { createReadStream, accessSync } = require('node:fs');

module.exports.getImageProfile = (req, res) => {

    try {
        let filename = path.join(__dirname, "../public/userPhotos", req.params.image);
        
        accessSync(filename);

        let readStream = createReadStream(filename);

        readStream?.on('open', () => {
            readStream.pipe(res);
        })

        readStream?.on('error', (err) => {
            res.end(err);
        })
    } catch (err) {
        res.end(err+"\nNo se encontró la imagen en el servidor.");
    }

}

module.exports.getImageListing = (req, res) => {
    try {
        let filename = path.join(__dirname, "../public/listingPhotos", req.params.image);
        
        accessSync(filename);

        let readStream = createReadStream(filename);

        readStream?.on('open', () => {
            readStream.pipe(res);
        })

        readStream?.on('error', (err) => {
            res.end(err);
        })
    } catch (err) {
        res.end(err+"\nNo se encontró la imagen en el servidor.");
    }
}
