function blobToDataURL(obj, cb) {
    let f = new FileReader();
    f.onloadend = function (e) {
        cb(e.target.result);
    };
    f.readAsDataURL(obj);
}

function dataURLToImage(dataUrl, cb) {
    let img = new Image();
    img.src = dataUrl;
    if (typeof cb === 'function') {
        img.onload = function () {
            cb(img);
        }
    }
    return img;
}

function dataURLToBlob(dataUrl) {
    let arr = dataUrl.split(',');
    let mine = arr[0].match(/:(.*?);/)[1];
    let byteStr = atob(arr[1]);
    var n = byteStr.length;
    var u8array = new Uint8Array(n);
    while (n--) {
        u8array[n] = byteStr.charCodeAt(n);
    }
    return new Blob(u8array, {type: mine});
}

export {blobToDataURL, dataURLToImage, dataURLToBlob};

