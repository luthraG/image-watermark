# image-watermark
A powerful watermark library based on ImageMagick for node.js

### Installation

	'npm install image-watermark'

### Server-side usage

```javascript
var watermark = require('image-watermark');

watermark.embedWatermark('/path/to/image/file', [options]);
```

### Clone the repo
```javascript

https://github.com/luthraG/image-watermark.git
```

### API

#### embedWatermark

API to embed watermark in given image. It takes two arguments : 
1. path of the image and 
2. options object.

#####Example

```javascript
var watermark = require('image-watermark');

watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark'});
```

#####Different Options

```javascript
//
// Options with watermark text, if not provided defaults to 'Sample watermark'
//
var watermark = require('image-watermark');
watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark'});

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

```

#### version

API to get version of this module that you are using.

```javascript
var watermark = require('image-watermark');

watermark.version;

// It outputs version of the API.
```

### Inspiration
- **https://www.npmjs.com/package/imagemagick**

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