const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

 function authController(){
     return {
         login(req,res){
            res.render('auth/login')
         }, 

         postLogin(req,res,next){
           passport.authenticate('local', (err,user,info)=>{
                 if(err){
                     req.flash('error',info.message)
                     return next(err)
                 }
                 if(!user){
                     req.flash('error',info.message)
                     return res.redirect('/login')
                 }
                 req.login(user,(err)=>{
                     if(err){
                         req.flash('error',info.message)
                         return next(err)
                     }

                     return res.redirect('/')
                 })
           })(req,res,next)
         },


         register(req,res){
            res.render('auth/register')
         },



         async postRegister(req,res){
             const {email,name,password } = req.body;
             //validate request
             if(!email || !name || !password){
                 req.flash('error','All field are required');
                 req.flash('name',name);
                 req.flash('email',email)
                 return res.redirect('/register')
             }
            
             User.exists({email : email},(err,result)=>{
                 if(result){
                    req.flash('error','Email already taken');
                    req.flash('name',name);
                    req.flash('email',email)
                    return res.redirect('/register')
                 }
             })

             
             const hashPassword = await bcrypt.hash(password,10)

             //create a user
              const user = new User({
                  name : name,
                  email : email,
                  password : hashPassword
              })

              user.save().then((user)=>{
                //   login
                return res.redirect('/')
              }).catch(err=>{
                   req.flash('error','something went wrong');
                    req.flash('name',name);
                    req.flash('email',email)
                    return res.redirect('/register') 
              })

             res.redirect('/') 
             console.log(req.body)
         },

         //Logout
         logout(req,res,next){
             req.logout();
             return res.redirect('/login')
         }


     }
 }

 module.exports = authController;