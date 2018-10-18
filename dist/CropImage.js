var CropImage = (function () {
    'use strict';

    function blobToDataURL(obj, cb) {
        var f = new FileReader();
        f.onloadend = function (e) {
            cb(e.target.result);
        };
        f.readAsDataURL(obj);
    }

    function dataURLToImage(dataUrl, cb) {
        var img = new Image();
        img.src = dataUrl;
        if (typeof cb === 'function') {
            img.onload = function () {
                cb(img);
            };
        }
        return img;
    }

    function dataURLToBlob(dataUrl) {
        var arr = dataUrl.split(',');
        var mine = arr[0].match(/:(.*?);/)[1];
        var byteStr = atob(arr[1]);
        var n = byteStr.length;
        var u8array = new Uint8Array(n);
        while (n--) {
            u8array[n] = byteStr.charCodeAt(n);
        }
        return new Blob(u8array, { type: mine });
    }

    /*
     @Author:      lisper
     @Email:       leyapin@gmail.com
     @Description: Crop a picture into a rectangle by canvas
     */

    function CropImage(id) {
        var canvas = document.getElementById(id);
        var cropWidth = 100;
        var cw = canvas.getAttribute('data-width');
        cw = parseInt(cw);
        if (cw > 0 && cw < 2048) {
            cropWidth = cw;
        }
        canvas.width = cropWidth;
        canvas.height = cropWidth;

        canvas.style.width = cropWidth;
        canvas.style.height = cropWidth;

        var ctx = canvas.getContext('2d');

        this.blobToDataURL = blobToDataURL;
        this.dataURLToImage = dataURLToImage;
        this.dataURLToBlob = dataURLToBlob;

        this.onInputImageFile = function (blob, cb) {
            var img = blobToDataURL(blob, function (imgUrl) {
                var imageUrl = imgUrl;
                // let imageFile = dataURLToBlob(imageUrl);
                dataURLToImage(imgUrl, function (image) {
                    var imgWidth = image.naturalWidth;
                    var imgHeight = image.naturalHeight;
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
        };
    }

    return CropImage;

}());
