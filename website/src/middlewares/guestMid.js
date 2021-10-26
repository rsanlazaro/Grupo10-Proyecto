// si son usuarios no podrán hacer el login o registro
function guestMid(req, res, next) {
	if (req.session.userLogged) {
		delete req.session.userLogged.passwordd
		return res.redirect('/user/profile',{ user: req.session.userLogged
		});
	}
	next();
}

module.exports = guestMid;