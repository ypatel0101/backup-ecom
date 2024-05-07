const requireUser = (req, res, next) => {
	if (req.user) next();
	else res.sendStatus(401);
};

const requireAdmin = (req, res, next) => {
	if (req.user?.is_admin) next();
	else res.sendStatus(401);
};

export { requireUser, requireAdmin };
