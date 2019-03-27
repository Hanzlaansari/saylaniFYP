var express = require('express');
// var fs = require('fs');
var bodyparser = require('body-parser');
// var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
//database
var mongoose = require('mongoose')



// others
var server = express();
server.use(express.static('./build'));
server.use(bodyparser.urlencoded({extended:true}));
server.use(bodyparser.json())


mongoose.connect('mongodb://hanzla:hanzla123@ds125526.mlab.com:25526/hanzla', { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });
// user schema
const userSchema = { first_name: String, last_name: String, email: String, cell:Number, password: String ,img:String,age:Number,location:String}
// user model
const Users = mongoose.model('User', userSchema);
// land schama for sale
const saleSchema = {user_id:String,property_type:String,sub_type:String,city:String,location:String,title:String,description:String,budget:Number,land_area:Number,unit_area:String,bedrooms:Number,bathrooms:Number,expire_after:String,images:String}
const Sale = mongoose.model('sale',saleSchema) ;
// land schema for Rent
const rentSchema = { user_id: String, property_type: String, sub_type: String, city: String, location: String, title: String, description: String, budget: Number, land_area: Number, unit_area: String, bedrooms: Number, bathrooms: Number, expire_after: String, images: String }
const Rent = mongoose.model('rent', rentSchema);
// land schema for wanted
const wantedSchema = { user_id: String, property_type: String, sub_type: String, city: String, location: String, title: String, description: String, budget: Number, land_area: Number, unit_area: String, bedrooms: Number, bathrooms: Number, expire_after: String }
const Wanted = mongoose.model('wanted', wantedSchema);



// login code
server.use(session({
    secret: "secret-word"}));
server.use(passport.initialize());
server.use(passport.session());
passport.use(new LocalStrategy(
    function(username,password,next){

        

        Users.findOne({ email: username, password: password }, (err, data) => {
            if (err) {
                console.log(err)
                // next(null, false)
            }
            else {
                if (data == null)
                    next(null, false)
                else {
                    //   console.log(typeof(data))
                    console.log(data)
                    next(null, data)
                }
            }
        })
    }

));
// profile img update 
        server.post('/profileupdateimg',(req,res)=>{
            var idd  = req.body.id;
            var imgg = req.body.img;
            console.log(idd)
            console.log(imgg)
Users.findOneAndUpdate({_id:idd},{img:imgg},(err,data)=>{
   if(err) console.log(err)
   else{
       res.send('uploaded successfully')
   } 
})
 })
//  profile age update
server.post('/profileupdateage', (req, res) => {
    var idd = req.body.id;
    var age = req.body.age;
    console.log(idd)
    console.log(age)
    Users.findOneAndUpdate({ _id: idd }, { age: age }, (err, data) => {
        if (err) console.log(err)
        else {
            res.send('uploaded successfully')
        }
    })
})
// profile cell update
server.post('/profileupdatecell', (req, res) => {
    var idd = req.body.id;
    var cell = req.body.cell;
    console.log(idd)
    console.log(cell)
    Users.findOneAndUpdate({ _id: idd }, { cell: cell }, (err, data) => {
        if (err) console.log(err)
        else {
            res.send('uploaded successfully')
        }
    })
})
// profile location update
server.post('/profileupdateloc', (req, res) => {
    var idd = req.body.id;
    var loc = req.body.location;
    console.log(idd)
    console.log(loc)
    Users.findOneAndUpdate({ _id: idd }, { location: loc }, (err, data) => {
        if (err) console.log(err)
        else {
            res.send('uploaded successfully')
        }
    })
})








  
// for serialize
passport.serializeUser(function(user,next){
    
    console.log(user.id)
next(null,user.id);
})
// for deserilaize
passport.deserializeUser(function(id,next){
    // console.log(id)
    // var user = users.find((user)=>{
    //     return user.id === id;
    // })
    // next(null,user);
     Users.findOne({_id:id} ,(err,user)=>{
        if(err)
        console.log(err)
        else{
            if(user===null)
            console.log(user)
            else
            next(null, user);
        }

    })
})

server.post('/login', passport.authenticate('local'), function (req, res) {
    // res.redirect('/dashbord');
    // res.send(req.query.user_email)


    console.log('login')
    res.send(req.user)
    console.log(req.user)
})

server.get('/dashbord', function (req, res) {

    if (!req.isAuthenticated()) {
        res.send({authanticat:false})
    } else {
        res.send({ authanticat:true,user:req.user})
    }
});
// logout
server.get('/logout',(req,res)=>{
    req.logOut()
    res.send('successfully logout')
})
// node mailer
server.post('/contact', (req, res) => {
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.message)    
    "use strict";
    require('dotenv').config();
    const nodemailer = require("nodemailer");

   
    async function main() {

       
        let account = await nodemailer.createTestAccount();

       
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hanzlaansari2656@gmail.com', 
                pass: '26561010.' 
            }
        });

      
        let mailOptions = {
            from: "req.body.name123", // sender address
            to: req.body.email, // list of receivers
            subject: req.body.name, // Subject line
            text: "Contact US", // plain text body
            html: "<br></br>" + "Message:" + req.body.message + "<br></br>" + "Phone:"+ req.body.email// html body
        };

     
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      
        res.send({ send: true })
    }

    main().catch((err) => {
        console.log(err)
        res.send({ send: false })
    });


})
    
// send code to user for singup

server.post('/sendcode',(req,res)=>{
    console.log(req.body.email)
    var email = req.body.email;

Users.findOne({email:email},(err,user)=>{
    if(err){
        console.log(err)
    }
    else{
        if(user===null){
            console.log('not exist this user before')

            "use strict";
            require('dotenv').config();
            const nodemailer = require("nodemailer");

         
            async function main() {

            
                let account = await nodemailer.createTestAccount();

             
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'hanzlaansari2656@gmail.com', // here use your real email
                        pass: '26561010.' // put your password correctly (not in this question please)
                    }
                });

           
                let mailOptions = {
                    from: "req.body.name123", // sender address
                    to: req.body.email, // list of receivers
                    subject: req.body.name, // Subject line
                    text: "Contact US", // plain text body
                    html: "<br></br>" + "Hi user ,Authantication code by <b>Zameen.pk=></b>" + req.body.code // html body
                };

            
                let info = await transporter.sendMail(mailOptions)

                console.log("Message sent: %s", info.messageId);
              
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

           
                res.send({ send: true })
            }

            main().catch((err) => {
                console.log(err)
                res.send({ send: false })
            });
       }
        else{
            console.log('already exit')
            res.send({exist:true})
        }
    }
})


   
})

// send code to forget pass

server.post('/sendpass', (req, res) => {
    console.log(req.body.email)
    var email = req.body.email;

    Users.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err)
        }
        else {
            if (user !== null) {
                console.log('user exist')

                "use strict";
                require('dotenv').config();
                const nodemailer = require("nodemailer");


                async function main() {


                    let account = await nodemailer.createTestAccount();


                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'hanzlaansari2656@gmail.com', // here use your real email
                            pass: '26561010.' // put your password correctly (not in this question please)
                        }
                    });


                    let mailOptions = {
                        from: "req.body.name123", // sender address
                        to: req.body.email, // list of receivers
                        subject: req.body.name, // Subject line
                        text: "Contact US", // plain text body
                        html: "<br></br>" + "Hi user ,Authantication code by <b>Zameen.pk=></b>" + req.body.code // html body
                    };


                    let info = await transporter.sendMail(mailOptions)

                    console.log("Message sent: %s", info.messageId);

                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


                    res.send({ exist: true })
                }

                main().catch((err) => {
                    console.log(err)
                    res.send({ send: false })
                });
            }
            else {
                console.log('not  exit')
                res.send({ exist: false })
            }
        }
    })



})

// update user password
server.post('/update_pass',(req,res)=>{
    Users.findOneAndUpdate({email:req.body.email},{password:req.body.password},(err,data)=>{
        if(err) console.log(err)
        else{
            res.send({update:true})
        }
    })
})












// route for sale property

server.post('/sale',(req,res)=>{
    var land = new Sale({ user_id: req.body.user_id,property_type: req.body.type, sub_type: req.body.sub_type, city: req.body.city_name, location: req.body.location, title: req.body.property_title, description: req.body.propert_description, budget: req.body.budget, land_area: req.body.land_area, unit_area: req.body.area_unit, bedrooms: req.body.bedrooms, bathrooms: req.body.bathrooms, expire_after: req.body.expire_date,images:req.body.images})
console.log(req.body)
console.log(req.body.user_id)
    land.save(function(err){
    console.log('sale added')
    if(err){
        console.log(err)
        res.send({appload:false})
    }
    else{
        res.send({appload:true})
    }
})
})
// route for rent property

server.post('/rent', (req, res) => {
    var land = new Rent({ user_id: req.body.user_id, property_type: req.body.type, sub_type: req.body.sub_type, city: req.body.city_name, location: req.body.location, title: req.body.property_title, description: req.body.propert_description, budget: req.body.budget, land_area: req.body.land_area, unit_area: req.body.area_unit, bedrooms: req.body.bedrooms, bathrooms: req.body.bathrooms, expire_after: req.body.expire_date, images: req.body.images })
    console.log(req.body)
    land.save(function (err) {
        console.log('rent added')
        if (err) {
            console.log(err)
            res.send({ appload: false })
        }
        else {
            res.send({ appload: true })
        }
    })
})
// route for wanted property
server.post('/wanted', (req, res) => {
    console.log(req.body.user_id)
    var land = new Wanted({ user_id: req.body.user_id, property_type: req.body.type, sub_type: req.body.sub_type, city: req.body.city_name, location: req.body.location, title: req.body.property_title, description: req.body.propert_description, budget: req.body.budget, land_area: req.body.land_area, unit_area: req.body.area_unit, bedrooms: req.body.bedrooms, bathrooms: req.body.bathrooms, expire_after: req.body.expire_date })
 
    land.save(function (err) {
        console.log('wanted added')
        if (err) {
            console.log(err)
            res.send({ appload: false })
        }
        else {
            res.send({ appload: true })
        }
    })
})

// user profile
server.get('/userprofile',(req,res)=>{
    Users.findOne({
        _id:req.query.id
    }).exec(function (err, user) {
        if (err) return console.log(err)
        console.log(user)
       res.send(user)

    })
})






// db practice route

server.post('/create_user',(req,res)=>{
    var new_user = new Users({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, cell: req.body.cell, password: req.body.password,age:'',location:'',img:'' })
    new_user.save(function(err){
        console.log('add')
        if(err){
            console.log(err)
        }
    });

    res.send({recieved:true,user:req.body});
})

// ...................home.........................
// server.get('/data',(req,res)=>{
//     Zameen.find({
//         type:req.query.type
//     })
// })
// ...............sale find......................
server.get('/salefind',(req,res)=>{
 Sale.find({ }).
exec(function (err, obj) {
        if (err) return res.send(err)
        console.log(obj)
        res.send(obj)
    })
})
// ...............rent find......................
server.get('/rentfind', (req, res) => {
    Rent.find({}).
        exec(function (err, obj) {
            if (err) return res.send(err)
            console.log(obj)
            res.send(obj)
        })
})
// ......................wanted find..............................
server.get('/wantedfind', (req, res) => {
    
    Wanted.find({}).
        exec(function (err, obj) {
            if (err) return res.send(err)
            console.log(obj)
            res.send(obj)
        })
})

// search
// search for sale route
server.post('/ssalefind',(req,res)=>{
    // console.log(req.body)
Sale.find({
    city: RegExp(req.body.cityname, 'i'), property_type: RegExp(req.body.type, 'i'), sub_type: RegExp(req.body.sub_type, 'i'), location: RegExp(req.body.location, 'i')
})
.exec(function(err,land){
    if(err) return res.send({found:false,err})
    console.log(land)
    if(land.length===0){
        res.send({ found: false, land }) 
    }
    if(land.length!==0){
        res.send({ found: true, land })    
    }
   
})
})

// search for rent route
server.post('/srentfind', (req, res) => {
    // console.log(req.body)
    Rent.find({
        city: RegExp(req.body.cityname, 'i'), property_type: RegExp(req.body.type, 'i'), sub_type: RegExp(req.body.sub_type, 'i'), location: RegExp(req.body.location, 'i')
    })
        .exec(function (err, land) {
            if (err) return res.send({ found: false, err })
            console.log(land)
            if (land.length === 0) {
                res.send({ found: false, land })
            }
            if (land.length !== 0) {
                res.send({ found: true, land })
            }

        })
})
// search for wanted route
server.post('/swantedfind', (req, res) => {
    // console.log(req.body)
    Wanted.find({
        city: RegExp(req.body.cityname, 'i'), property_type: RegExp(req.body.type, 'i'), sub_type: RegExp(req.body.sub_type, 'i'), location: RegExp(req.body.location, 'i')
    })
        .exec(function (err, land) {
            if (err) return res.send({ found: false, err })
            console.log(land)
            if (land.length === 0) {
                res.send({ found: false, land })
            }
            if (land.length !== 0) {
                res.send({ found: true, land })
            }

        })
})


// detail salefind route
server.get('/detail',(req,res)=>{
   var type = req.query.type;
   var id=req.query.id
   console.log(req.query.id)
   if(type==="salefind"){
       Sale.findById({
           _id: id
       }).exec(function (err, land) {
           if (err) return res.send(err)
           console.log(land)
           res.send(land)
       })
   }
   else if(type==="rentfind"){
       Rent.findById({
           _id: id
       }).exec(function (err, land) {
           if (err) return res.send(err)
           console.log(land)
           res.send(land)
       })
   }
   else if (type === "wantedfind") {
       
    Wanted.findById({
           _id: req.query.id
       }).exec(function (err, land) {
           if (err) return res.send(err)
           console.log(land)
           res.send(land)
       })
   }

})








// 12 29 18
// error handling middlieware (error handler ko hamasha last p define krna ha)
server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).send('something went wrong');
})



server.listen(process.env.PORT || 8000, () => console.log('server is running'));