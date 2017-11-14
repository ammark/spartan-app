var aws = require('aws-sdk');
var async = require('async');
var fs = require('fs');
var path = require('path');
var imageDirectory = path.join(__dirname, 'images/');

var BUCKET_NAME = 'spartan-app';
var IMAGE = './images/screenshot.png';
var s3 = new aws.S3();


// Use personal account credentials
aws.config.credentials = new aws.SharedIniFileCredentials({profile: 'personal-account'});
aws.config.update({region: 'us-west-2'});
s3 = new aws.S3({apiVersion: '2006-03-01'});

// Set params for the put object
var uploadParams = {
    Bucket: BUCKET_NAME,
    Key: '',
    Body: '',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
}



fs.readdir(path.join(__dirname, 'images/'), function(err, filenames) {
    if (err) {
        onerror(err);
        return;
    }
    var items = 0;

    filenames.forEach(function(filename) {
        var fileStream = fs.createReadStream(path.join(__dirname, '/images/', filename));
        var filePath = path.basename(filename);
        
        uploadParams.Body = fileStream;

        uploadParams.Key = filePath;

        
        s3.putObject(uploadParams, function(err, data) {
            if (err) {
                console.log('Error', err);
            }

            if (data) {
                items++
                console.log(items + '. Successfully uploaded: ' + filename);
                
            }
        })
        
    })

    console.log('---------------------');
    console.log('- Total number of items in bucket: ' + items);
    console.log('---------------------');
})

// var fileStream = fs.createReadStream(IMAGE);

// fileStream.on('error', function(err) {
//     console.log('File error', err);
// });

// uploadParams.Body = fileStream;

// uploadParams.Key = path.basename(IMAGE);

// s3.putObject(uploadParams, function(err, data) {
//     if (err) {
//         console.log('Error', err);
//     }

//     if (data) {
//         console.log('Upload success', data);
//     }
// })


// List the names of all the buckets
s3.listBuckets(function(err, data) {
    if (err) {
        console.log('Error', data);
    } else {
        console.log('---------------------');
        console.log(' - Bucket List: ', data.Buckets[0].Name);
        console.log('---------------------');
    }
})
