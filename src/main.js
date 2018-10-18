/*
 @Author:      lisper
 @Email:       leyapin@gmail.com
 @Description: Crop a picture into a rectangle by canvas
 */

import {blobToDataURL, dataURLToImage, dataURLToBlob} from './convertLib';

function CropImage(canvas) {
    if (!canvas) {
        return console.log('error');
    }
    let cropWidth = 100;
    let cw = canvas.getAttribute('data-width');
    cw = parseInt(cw);
    if (cw > 0 && cw < 2048) {
        cropWidth = cw;
    }
    canvas.width = cropWidth;
    canvas.height = cropWidth;

    canvas.style.width = cropWidth;
    canvas.style.height = cropWidth;

    let ctx = canvas.getContext('2d');

    this.blobToDataURL = blobToDataURL;
    this.dataURLToImage = dataURLToImage;
    this.dataURLToBlob = dataURLToBlob;

    this.onInputImageFile = function (blob, cb) {
        var img = blobToDataURL(blob, function (imgUrl) {
            let imageUrl = imgUrl;
            // let imageFile = dataURLToBlob(imageUrl);
            dataURLToImage(imgUrl, function (image) {
                let imgWidth = image.naturalWidth;
                let imgHeight = image.naturalHeight;
                if (imgWidth > imgHeight) {
                    var drawWidth = imgWidth * cropWidth / imgHeight;
                    var drawHeight = cropWidth;
                    var drawX = -(drawWidth - cropWidth) / 2;
                    var drawY = 0;
                } else {
                    var drawWidth = cropWidth;
                    var drawHeight = imgHeight * cropWidth / imgWidth;
                    var drawX = 0;
                    var drawY = -(drawHeight - cropWidth) / 2;
                }
                ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
                cb(imageUrl);
            });
        });
    }
}

export default CropImage;
