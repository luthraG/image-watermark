/**
*
*	A powerful watermark library
*   based on ImageMagick for node.js
*
**/

// System Imports
var fs 	   = require('fs'),
	im     = require('imagemagick'),
	path   = require('path'),
	ratify = require('node-ratify');

var defaultOptions = {
	'text' 				: 'Sample watermark',
	'override-image'	: false,
	'change-format'		: false,
	'output-format'		: 'jpg',
	'position'			: 'Center',
	'color'				: 'grey',
	'angle'				: 'auto',
	'resize' 			: '100%'
}

function embedWatermark(source, options) {

	if (!source || source == '')
		throw new Error('Image-Watermark::Specified an invalid image source');

	// Check if file exists at the specified path
	fs.lstat(source, function(err, stats) {
		if(err || !stats.isFile()) {
			throw Error('Image-Watermark::Image file doesn\'t exists at ' + source);
		}
	});

	// If options are not properly specified, use default options
	if (!options || typeof options !== 'object') {
		options = defaultOptions;
	}

	// If we reach here that means file exists
	im.identify(source, function (err, imageData) {
	  if (err) {
	  	console.error('Image-Watermark::Unable to process image file : ' + err);
	  } else {

	  	var width = imageData.width;
        var height = imageData.height;
        var fillColor = options.color;
        var watermarkText = options.text;
        var position = null;
        var angle = null;
        var font = options.font;
        var resize = options.resize ? options.resize : defaultOptions.resize;
        var outputPath = path.dirname(source) + '/watermark' + path.extname(source);;

        // Check if fillColor is specified
        if (ratify.isEmpty(fillColor))
        	fillColor = defaultOptions.color;

        // Check if watermark text is specified
        if (ratify.isEmpty(watermarkText))
        	watermarkText = defaultOptions.text;

        // Check if position is specified
        if (ratify.isEmpty(position))
        	position = defaultOptions.position;

        // Check if font is specified
        if (ratify.isEmpty(font))
        	font = defaultOptions.font;

	  	// Check if image needs to be overriden
	  	if (options['override-image'] && ratify.isBoolean(options['override-image'])
	  		&& options['override-image'].toString() === 'true') {
	  		outputPath = source;
	  	}

	  	// Check if output format needs to be changed
	  	if (options['change-format'] && ratify.isBoolean(options['change-format']) &&
	  		options['change-format'].toString() === 'true') {

	  		var outputFormat = options['output-format'];

	  		if (ratify.isEmpty(outputFormat))
	  			outputFormat = defaultOptions['output-format'];

	  		outputPath = path.dirname(outputPath) + '/' + path.basename(outputPath, path.extname(outputPath)) + '.' + outputFormat;
	  	}

	  	if (!ratify.isNull(angle) && ratify.isNumeric(angle)) {
	  		// angle = parseFloat(angle);

	  		angle = (Math.atan(height / width) * (180/Math.PI)) * -1;
	  	} else {
	  		angle = (Math.atan(height / width) * (180/Math.PI)) * -1;
	  	}

	  	var pointWidth = width,
	  		pointHeight = height;

	  	if (resize.toString().indexOf('%') == -1) {
	  		resize = defaultOptions.resize;
	  	} else {
	  		var resizeFactor = (parseFloat(resize) / 100);
	  		
	  		pointWidth = width * resizeFactor;
	  		pointHeight = height * resizeFactor;
	  	}

	  	var pointsize = Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / watermarkText.length;

        var args = [];
        args.push(source); // original img path
        args.push('-size');
        args.push(width + 'x' + height);
        args.push('-resize');
        args.push(resize);
        if (!ratify.isNull(font)) {
        	args.push('-font');
        	args.push(font);
        }
        args.push('-fill');
        args.push(fillColor);  // Color of watermark text
        args.push('-pointsize');
        args.push(pointsize); // this needs to be calculated dynamically based on image size and length of copyright message
        args.push('-gravity');
        args.push(position);    // alignment of watermark text.
        args.push('-annotate');
        args.push(angle);   // angle of watermark message, with respect to X-axis
        args.push(watermarkText);  // Copyright text
        args.push(outputPath); // img with embedded watermark.

        im.convert(args, function(err, stdout) {
            if(err)
            	 console.log('Image-Watermark::Error in applying watermark : ' + err);
            else 
            	console.log('Image-Watermark::Successfully applied watermark. Check it at :\n ' + outputPath);
        });
	  }
	});
}


exports = module.exports = {
	embedWatermark : embedWatermark,
	version		   : JSON.parse(
  						require('fs').readFileSync(__dirname + '/package.json', 'utf8')
					 ).version
};
