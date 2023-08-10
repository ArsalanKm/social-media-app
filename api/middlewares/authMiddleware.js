import { validateToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
  console.log(req.headers);

  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    if (token) {
      const tokenData = validateToken(token);
      console.log(tokenData);
      if (tokenData.valid) {
        req.body.currentUserId = tokenData.id;
        next();
        return;
      } else {
        res.status(401).send({ message: 'UnAuthenticated' });
        return;
      }
    } else {
      res.status(401).send({ message: 'UnAuthenticated' });
      return;
    }
  } else {
    res.status(401).send({ message: 'UnAuthenticated' });
  }
};
