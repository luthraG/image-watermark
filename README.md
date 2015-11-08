# image-watermark
A powerful watermark library based on ImageMagick for node.js. This can be used to embed watermark in single page image, multipage image or pdf file.

### Installation

	'npm install image-watermark'

### Server-side usage

```javascript
var watermark = require('image-watermark');

watermark.embedWatermark('/path/to/image_or_pdf/file', [options]);
```

### Clone the repo

git clone https://github.com/luthraG/image-watermark.git

### API

#### embedWatermark(source, [options])

API to embed watermark in given image/pdf. It takes two arguments : 
1. path of the image and 
2. options object. This argument is optional


**Options**

Various options supported by this API are :
- **text** - To specify watermark text. Default is 'Sample watermark'.
- **color** - To specify color of watermark text. Default is 'Grey'.
- **dstPath** - To specify the output path. Default is 'watermark.{sourceFile ext}'.
- **override-image** - To specify if same image needs to be overriden. Default is 'false'.
- **change-format** - To specify if the format of output file needs to be changed. Default is 'false'.
- **output-format** - Used in conjuction with change-format to specify the format of output file.
- **align** - To specify the watermark text alignment. Default is 'dia1'.
- **font** - To specify font of watermark text.
- **resize** - To specify the resize percentage for output file.

**Example**

```javascript
var watermark = require('image-watermark');

watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark'});
```

**Different Options**

```javascript
//
// Options with watermark text, if not provided defaults to 'Sample watermark'
//
var watermark = require('image-watermark');
watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark'});

//
// Options to specify output path
//
var watermark = require('image-watermark');
var options = {
	'text' : 'sample watermark', 
	'dstPath' : '\home\user\documents\watermark.jpg'
};
watermark.embedWatermark('\home\user\sample.jpg', options);

//
// Options to specify color of watermark text
//
var watermark = require('image-watermark');
var options = {
	'text' : 'sample watermark', 
	'color' : 'rgb(154, 50, 46)'
};
watermark.embedWatermark('\home\user\sample.jpg', options);

// color can be specified in one of the following forms
grey					  #color-name
#f00                      #rgb
#ff0000                   #rrggbb
#ff0000ff                 #rrggbbaa
#ffff00000000             #rrrrggggbbbb
#ffff00000000ffff         #rrrrggggbbbbaaaa
rgb(255, 0, 0)            an integer in the range 0—255 for each component
rgb(100.0%, 0.0%, 0.0%)   a float in the range 0—100% for each component


//
// Options to specify resize factor i.e. if image needs to be resized
// after adding watermark text
//
var watermark = require('image-watermark');
var options = {
	'text' : 'sample watermark', 
	'resize' : '200%'
};
watermark.embedWatermark('\home\user\sample.jpg', options);


//
// Options to override same image i.e. if same image needs to
// be overriden after adding watermark, By default is false
//
var watermark = require('image-watermark');
var options = {
	'text' : 'sample watermark', 
	'override-image' : true
};
watermark.embedWatermark('\home\user\sample.jpg', options);

// This overrides the same image, if not specified it creates
// output image parallel to this image with name "watermark"

//
// Options to change the format of image
//
var watermark = require('image-watermark');
var options = {
	'text' 			: 'sample watermark', 
	'change-format' : true,
	'output-format' : 'bmp'
};
watermark.embedWatermark('\home\user\sample.jpg', options);

//
// Options to specify the font of watermark text
//
var watermark = require('image-watermark');
var options = {
	'text' : 'sample watermark', 
	'font' : 'Arial.ttf'
};
watermark.embedWatermark('\home\user\sample.jpg', options);

//
// Options to specify the alignment of watermark text
//
var watermark = require('image-watermark');
var options = {
	'text' : 'sample watermark', 
	'align' : 'ltr'
};
watermark.embedWatermark('\home\user\sample.jpg', options);

// Various possble values of align are:

//
// dia1 : Diagonal 1
// dia2 : Diagonal 2
// ttb : top to bottom
// btt : bottom to top
// ltr : left to right
// rtl : right to left
//

// If an invalid value is specified or in case no value
// is specified then 'dial1' is treated as default alignment

```

#### embedWatermarkWithCb(source, [options], callback)
API to embed watermark in given image/pdf with callback method. It takes three arguments : 
1. path of the image and 
2. options object. This argument is optional
3. The callback method


```javascript

// Embed watermark with option object and callback method
var watermark = require('image-watermark');
var option = {'text' : 'sample watermark'};

watermark.embedWatermarkWithCb('\home\user\sample.jpg', option, function(err) {
	if (!err)
		console.log('Succefully embeded watermark');
});

// Embed watermark with no option object and callback method
var watermark = require('image-watermark');

watermark.embedWatermarkWithCb('\home\user\sample.jpg', function(err) {
	if (!err)
		console.log('Succefully embeded watermark');
});

```

#### version

API to get version of this module that you are using.

```javascript
var watermark = require('image-watermark');

watermark.version;

// It outputs version of the API.
```

### Inspiration
[https://www.npmjs.com/package/imagemagick](https://www.npmjs.com/package/imagemagick)

### License(MIT)

Copyright (c) 2015 Gaurav Luthra(luthra.zenith@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.