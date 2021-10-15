// si son usuarios no podrán hacer el login o registro
function guestMid(req, res, next) {
	if (req.session.userLogged) {
		return res.redirect('/user/profile',{ user: req.session.userLogged,
			                                  false: true});
	}
	next();
}

module.exports = guestMid;