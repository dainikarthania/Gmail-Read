const {google} = require('googleapis');
const express=require('express')
let app=express()
const gmail = google.gmail('v1');
const request=require('request')

const oauth2Client = new google.auth.OAuth2(
    "569058061561-vgod1lak9vargb3bouk5mncluiivsal0.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/message"
  );
  

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]


const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: SCOPES
  });


  app.get('/login',(req,res)=>{
      res.redirect(url)
  })

  app.get(`/message`,async (req,res)=>{
      let code=req.query.code

      const {tokens} = await oauth2Client.getToken(code)
      // oauth2Client.setCredentials(tokens);

      // const result = await gmail.users.messages.list({
      //   auth: oauth2Client,
      //   userId: "me",
      //   q: `facebook`
      // })

      console.log(tokens)
      //get user information from google api
      let token_info=await new Promise((rs,rj)=>{
        request(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,(err,response,data)=>{
          if(err) return rj(err)
          else
            return rs(JSON.parse(data))
        })
      })

      console.log(token_info)

      let message=await new Promise((rs,rj)=>{
        request(`https://gmail.googleapis.com/gmail/v1/users/${token_info.id}/messages`,(err,response,data)=>{
          if(err) return rj(err)
          else
            return rs(JSON.parse(data))
        })
      })

      


      res.json(message)
    
    
    })

  app.listen('3000',()=>{
      console.log("server start")
  })

