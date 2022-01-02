//     (async()=>{// Imports the Google Cloud client library
//     const language = require('@google-cloud/language');
   
//     // Instantiates a client
//     const client = new language.LanguageServiceClient();
   
//     // The text to analyze
//     const text = 'Hello, world!';
   
//     const document = {
//       content: text,
//       type: 'PLAIN_TEXT',
//     };
   
//     // Detects the sentiment of the text
//     const [result] = await client.analyzeSentiment({document: document});
//     const sentiment = result.documentSentiment;
   
//     console.log(`Text: ${text}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  
// })()


const request=require('request')

request.post({url:'https://language.googleapis.com/v1/documents:classifyText?key=AIzaSyCrrAF57Pmi2MmzgKH7BZ9R8vXSOon9U1s', form: {
    "document":{
    "type": "PLAIN_TEXT",
    "content": "hello worlds"}
  }}, function(err,httpResponse,body){ 
console.log("err",err)
console.log("body",body)
})
