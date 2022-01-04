const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');



//dotenv.config();


dotenv.config({path:'./config/config.env'});

const app = express()




app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))



app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/contact',function(req,res){
    res.sendFile(path.join(__dirname +'/public/contact.html'));
  });

  app.post('/contact', function(req, res){
   
      const {name, email, message} = req.body;
     console.log(req.body);

     let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
      });



    const mailOptions = {
        from: req.body.email,
        to: process.env.EMAIL_USERNAME,
        subject: `${req.body.name} <${req.body.email}>`,
        text: req.body.message
        
    }

    transporter.sendMail(mailOptions,(error, info) =>{
        if(error){
            console.log(error)
            res.send("something is wrong")
        
        }else{
            
            res.sendFile(path.join(__dirname +'/public/success.html'));
        }
    })

     
   
 });





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

