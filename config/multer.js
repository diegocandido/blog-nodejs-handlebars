const multer = require('multer')
const crypto = require('crypto')

module.exports = {

    storage : multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '../uploads/')
        },
        filename: function (req, file, cb) {
            // Extração da extensão do arquivo original:
            const extensaoArquivo = file.originalname.split('.')[1];
    
            // Cria um código randômico que será o nome do arquivo
            const novoNomeArquivo = require('crypto')
                .randomBytes(64)
                .toString('hex');
    
            // Indica o novo nome do arquivo:
            cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
        }
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'image/gif'
        ];
    }
}