
const Menu = require('../../models/menu')

function homeController(){
    return {
      async index(re,res){
       try{
        const pizzas = await Menu.find();
        return res.render('home',{pizzas : pizzas})
       }
       catch(err){
           console.log(err)
       }
        
       }
    }
}

module.exports = homeController;