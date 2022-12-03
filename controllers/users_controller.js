module.exports.user = function(req , res)
{
    return res.render('users' , {
        title : 'users'
    });
}