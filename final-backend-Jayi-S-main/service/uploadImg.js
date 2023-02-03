import multer from 'multer'
import stream from 'stream'
import cloudinary from 'cloudinary'

if (!process.env.CLOUDINARY_URL) {
    process.env.CLOUDINARY_URL = "cloudinary://986249963396237:Aj9ZF1Vjn9ptb1Jx5tboiEuMx20@dkqjt7gvj"
}

const doUpload = (publicId, req, res, next) => {

	const uploadStream = cloudinary.uploader.upload_stream(result => {    	
         req.fileurl = result.url
         req.fileid = result.public_id
         next()
	}, { public_id: req.body[publicId]})
    
    if (!req.file) {
        res.send({
            code: 400
        })
        return
    }

	const s = new stream.PassThrough()
    console.log(req.file, '-------------file')
	s.end(req.file.buffer)
	s.pipe(uploadStream)
	s.on('end', uploadStream.end)
}

export const uploadImage = (publicId) => (req, res, next) =>
     multer().single('image')(req, res, () => 
               doUpload(publicId, req, res, next))


export function postImage(req, res) {
   const image = cloudinary.image(req.fileid, {
       format: "png", width: 100, height: 130, crop: "fill" 
   })
   // req.fileurl
   res.send({
    "code": 0,
    "data": {
        "url": req.fileurl
    }
   });
}

