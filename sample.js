// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');
const fs = require('fs');

// S3 bucket name
var bucketName = 'node-sdk-sample-571ebd8f-aafd-4746-b9db-0a2483fcfd74';
// Create name for uploaded object key
var keyName = 'SampleData1.mp3'; // <-- object name

/* Take mp3 from online submit button -> Store in AWS bucket node-sdk-sample-571ebd8f-aafd-4746-b9db-0a2483fcfd74*/


// Create a promise on S3 service object
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
  function(data) {
    // Create params for putObject call
    const audio = fs.readFileSync(keyName);
    var objectParams = {Bucket: bucketName, Key: keyName, Body: audio}; // <-- content
    

    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
}).catch(
  function(err) {
    console.error(err, err.stack);
});

/* startTranscriptionJob: Start Transcriptin process  */
AWS.config.region = 'us-east-1';
var transcribeservice = new AWS.TranscribeService();
var start_params = {
    LanguageCode: 'en-US' , 
    Media: { /* required */
      MediaFileUri: 's3://node-sdk-sample-571ebd8f-aafd-4746-b9db-0a2483fcfd74/SampleData1.mp3'
    },
    TranscriptionJobName: 'SoundProcessJob2', /* required */
    ContentRedaction: {
      RedactionOutput: "redacted", /* required */
      RedactionType: "PII" /* required */
    },
    JobExecutionSettings: {
      //AllowDeferredExecution: true || false,
      // DataAccessRoleArn: 'STRING_VALUE'
    },
    MediaFormat: "mp3",
    MediaSampleRateHertz: 44100,
    OutputBucketName: 'node-sdk-sample-571ebd8f-aafd-4746-b9db-0a2483fcfd74',
    // OutputEncryptionKMSKeyId: '1234abcd-12ab-34cd-56ef-1234567890ab',
    Settings: {
      ChannelIdentification: false,
      MaxAlternatives: '2',
      MaxSpeakerLabels: '4',
      ShowAlternatives: true,
      ShowSpeakerLabels: true
      // VocabularyFilterMethod: remove | mask,
      // VocabularyFilterName: 'STRING_VALUE',
      // VocabularyName: 'STRING_VALUE'
    }
  };
  
  transcribeservice.startTranscriptionJob(start_params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

  /* Store JSON transcript */
  var detect_params = {
    Bucket: 'node-sdk-sample-571ebd8f-aafd-4746-b9db-0a2483fcfd74', /* required */
    Key: 'redacted-SoundProcessJob2.json', /* required */
  };
  var s3 = new AWS.S3();
  s3.waitFor('objectExists', detect_params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });

