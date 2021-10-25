let mainController = {
    index:(req,res)=>{
       return res.render('main/index')
    },
    about:(req,res)=>{
       return res.render('main/about')
    }
}
    module.exports = mainController;