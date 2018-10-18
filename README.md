# CropImage
Crop a picture into a rectangle by canvas

## How to use?
demo: index.html

````
<canvas id="canvas" data-width="100"></canvas>
<script>
    cropImage = new CropImage('canvas');
    
    //in onchange of input[type=file]
    cropImage.onInputImageFile(file);
</script>
````
