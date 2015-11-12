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
	'text' 				    : 'Sample watermark',
	'override-image'	: false,
	'change-format'		: false,
	'output-format'		: 'jpg',
	'position'			  : 'Center',
	'color'				    : 'rgba(0,0,0,0.4)',
	'resize' 			    : '100%'
}

//
// Check if the alignment passed
// is a valid alignment value
//
// Possible values of align are : dia1, dia2, ttb, btt, ltr, rtl
//
function _isValidAlignment(align) {
	if (ratify.isEmpty(align))
		return false;

	//
	// dia1 : Diagonal 1
	// dia2 : Diagonal 2
	// ttb : top to bottom
	// btt : bottom to top
	// ltr : left to right
	// rtl : right to left
	//
	if (['dia1', 'dia2', 'ttb', 'btt', 'ltr', 'rtl'].indexOf(align.toLowerCase()) > -1)
		return true;

	return false;
}

function _parseOptions(imageData, source, options) {

	var retObj = {};

	var width = imageData.width;
    var height = imageData.height;
    var fillColor = options.color;
    var watermarkText = options.text;
    var align = _isValidAlignment(options.align) ? options.align.toLowerCase() : 'dia1';
    var font = options.font;
    var resize = options.resize ? options.resize : defaultOptions.resize;
    var outputPath = options.dstPath ? options.dstPath : 
    				 path.dirname(source) + '/watermark' + path.extname(source);
    var  position = null,
    	    angle = null,
        pointsize = null;

    // Check if fillColor is specified
    if (ratify.isEmpty(fillColor))
    	fillColor = defaultOptions.color;

    // Check if watermark text is specified
    if (ratify.isEmpty(watermarkText))
    	watermarkText = defaultOptions.text;

    // Check if position is specified
    if (ratify.isEmpty(position))
    	position = defaultOptions.position;

  	// Check if image needs to be overriden
  	if (options['override-image'] && ratify.isBoolean(options['override-image'])
  		&& options['override-image'].toString() === 'true') {
  		outputPath = source;
  	}

  	// Check if output format needs to be changed
  	if (options['change-format'] && ratify.isBoolean(options['change-format']) &&
  		options['change-format'].toString() === 'true') {

  		var outputFormat = options['output-format'];

  		if (ratify.isEmpty(outputFormat) || outputFormat.length < 2)
  			outputFormat = path.extname(source).substr(1);

  		outputPath = path.dirname(outputPath) + '/' + 
  					 path.basename(outputPath, path.extname(outputPath)) + 
  					 '.' + outputFormat;
  	}

  	// Check if extension of output path is valid
  	if (outputPath) {

  		var ext = path.extname(outputPath).substr(1);

  		if (!ext || ext.length < 2)
  			outputPath = path.dirname(outputPath) + '/' + 
  						 path.basename(outputPath, path.extname(outputPath)) + 
  						 path.extname(source);
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

  	switch(align) {
  		case 'ltr'  :
  						angle = 0;
  						pointsize = (pointWidth / watermarkText.length);
  						break; 
  		case 'rtl'  : 
  						angle = 180;
  						pointsize = (pointWidth / watermarkText.length);
  						break;
  		case 'ttb'  :
  						angle = 90;
  						pointsize = (pointHeight / watermarkText.length);
  						break;
  		case 'btt'  :
  						angle = 270;
  						pointsize = (pointHeight / watermarkText.length);
  						break;
  		case 'dia1' :
  						angle = (Math.atan(height / width) * (180/Math.PI)) * -1;
  						pointsize = Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / watermarkText.length;
  						break;
  		case 'dia2' :
  						angle = (Math.atan(height / width) * (180/Math.PI));
  						var pointsize = Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / watermarkText.length;
  						break;
  		default     : 
              angle = (Math.atan(height / width) * (180/Math.PI)) * -1;
              pointsize = Math.sqrt(pointWidth * pointWidth + pointHeight * pointHeight) / watermarkText.length;
  						break;
  	}

    var args = [];
    args.push(source); // original img path
    args.push('-size');
    args.push(width + 'x' + height);
    args.push('-resize');
    args.push(resize);
    if (!ratify.isEmpty(font)) {
    	args.push('-font');
    	args.push(font);
    }
    args.push('-fill');
    args.push(fillColor);  // color of watermark text
    args.push('-pointsize');
    args.push(pointsize); // this needs to be calculated dynamically based on image size and length of copyright message
    args.push('-gravity');
    args.push(position);    // alignment of watermark text.
    args.push('-annotate');
    args.push(angle);   // angle of watermark message, with respect to X-axis
    args.push(watermarkText);  // copyright text
    args.push(outputPath); // img with embedded watermark

    retObj.args = args;
    retObj.outputPath = outputPath;

    return retObj;
}

function embedWatermark(source, options) {

	if (!source || source == '')
		throw new Error('Image-Watermark::embedWatermark : Specified an invalid image source');

	// Check if file exists at the specified path
	stats = fs.lstatSync(source);

	if (!stats.isFile())
		throw new Error('Image-Watermark::embedWatermark : Image does not exists at : ' + source);		

	// If options are not properly specified, use default options
	if (!options || typeof options !== 'object')
		options = defaultOptions;

	// If we reach here that means file exists
	im.identify(source, function (err, imageData) {
	  if (err)
	  	throw new Error('Image-Watermark::embedWatermark : Unable to process image file : ' + err);

	  var retObj = _parseOptions(imageData, source, options);

	  im.convert(retObj.args, function(err, stdout) {
	  	if (err)
	    	console.log('Image-Watermark::embedWatermark : Error in applying watermark : ' + err);
	    else 
	      	console.log('Image-Watermark::embedWatermark : Successfully applied watermark. Please check it at :\n ' + retObj.outputPath);
	  });
	});
}

function embedWatermarkWithCb(source, options, callback) {

	var error;
	
	if ((arguments.length < 2) ||
		(arguments.length === 2 && !ratify.isFunction(arguments[1])) ||
		(arguments.length > 2 && !ratify.isFunction(arguments[2]))) {
		throw new Error('Image-Watermark::embedWatermarkWithCb : Invalid arguments to method embedWatermarkWithCb');
	} else if (arguments.length === 2 && ratify.isFunction(arguments[1])) {
		callback = arguments[1];
		options = null;
	}

	if (!source || source == '') {
		error = new Error('Image-Watermark::embedWatermarkWithCb : Specified an invalid image source');
		return callback(error);
	}

	// Check if file exists at the specified path
	fs.lstat(source, function(err, stats) {
		if (err || !stats.isFile()) {
			error = new Error('Image-Watermark::embedWatermarkWithCb : Image file doesn\'t exists at ' + source);
			return callback(error);
		} else if (!err) {

			// If options are not properly specified, use default options
			if (!options || typeof options !== 'object')
				options = defaultOptions;

			// If we reach here that means file exists
			im.identify(source, function (err, imageData) {
				if (err) {
			  		error = new Error('Image-Watermark::embedWatermarkWithCb : Unable to process image file : ' + err);
			  		return callback(error);
			  	}

			  	var retObj = _parseOptions(imageData, source, options);

		        im.convert(retObj.args, function(err, stdout) {
		            if (err) {
		            	error = new Error('Image-Watermark::embedWatermarkWithCb : Error in applying watermark : ' + err);
		            	return callback(error);
		            } else {
		            	console.log('Image-Watermark::embedWatermarkWithCb : Successfully applied watermark. Please check it at :\n ' + retObj.outputPath);
		            	return callback(null);
		            }
		        });
			});
		}
	});
	
	return;
}


exports = module.exports = {
	embedWatermark 		    : embedWatermark,
	embedWatermarkWithCb  : embedWatermarkWithCb,
	version		   		      : JSON.parse(
  							           require('fs').readFileSync(__dirname + '/package.json', 'utf8')
					 	               ).version
};
