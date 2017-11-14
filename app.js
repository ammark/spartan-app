
//   firebase.initializeApp(config);

  var fs = require('fs');
  var directory = '/Users/ammarkalim/Screenshots'
  var data = './sample.json';
  var firebase = require('firebase');
  var importedConfig = require('./config.js');


  firebase.initializeApp(config);
  var storage = firebase.storage();
  
  fs.readdir(directory, function(err, filenames) {
      if (err) {
          onerror(err);
          return;
      }
      filenames.forEach(function(filename) {
          // Get the file
          
          // Create a file storage
          
          storage.ref('ammar-screenshots/' + filename);
          
          // Upload a file
            storageRef.put(filename);

            console.log(filename);
      })
  })