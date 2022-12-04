module.exports.home = function(req , res){
    console.log(req.cookies);
    res.cookie('user' , 16);
    return res.render('home' , {
        title : 'home'
    });
}