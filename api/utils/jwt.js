import jwt from 'jsonwebtoken';

const jwtKey = 'secret';

export const generateAuthToken = (id, name) => {
  const token = jwt.sign({ id, name }, jwtKey, { expiresIn: '100d' });
  return token;
};

export const validateToken = (token) => {
  try {
    const tokenData = jwt.verify(token, jwtKey);

    if (tokenData) {
      return { valid: true, id: tokenData.id.id };
    } else {
      return { valid: false };
    }
  } catch (error) {
    console.log('invalid token');
    return { valid: false };
  }
};
