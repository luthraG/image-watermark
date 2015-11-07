# image-watermark
A powerful watermark library based on ImageMagick for node.js

## Installation

	'npm install image-watermark'

## Server-side usage

```javascript
var watermark = require('image-watermark');

watermark.embedWatermark('/path/to/image/file', [options]);
```

## Clone the repo
```javascript

https://github.com/luthraG/image-watermark.git
```

## API

### embedWatermark

API to embed watermark in given image. It takes two arguments : path of the image and options object.

Example

```javascript
var watermark = require('image-watermark');

watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark'});
```

Different Options

```javascript

// Options with watermark text, if not provided defaults to 'Sample watermark'
var watermark = require('image-watermark');

watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark'});

// Options to specify color of watermark text
var watermark = require('image-watermark');

watermark.embedWatermark('\home\user\sample.jpg', {'text' : 'sample watermark', 'color' : 'rgb(154, 50, 46)'});

// color can be specified as
grey					  #color-name
#f00                      #rgb
#ff0000                   #rrggbb
#ff0000ff                 #rrggbbaa
#ffff00000000             #rrrrggggbbbb
#ffff00000000ffff         #rrrrggggbbbbaaaa
rgb(255, 0, 0)            an integer in the range 0—255 for each component
rgb(100.0%, 0.0%, 0.0%)   a float in the range 0—100% for each component
```