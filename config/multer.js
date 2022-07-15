const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {

    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
            },
            filename: (req, file, cb) => {
                crypto.ramdomBytes(16, (err, hash ) => {
                    const fileName = `${hash.toString('hex')}`.jpg
                
                    cb(null, fileName)
                })
            },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif'
        ];
    }
}