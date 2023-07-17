import { Router } from 'express';
import { loginFormSchema, registerFormSchema } from 'shared';
import bcrypt from 'bcrypt';
import { prismaClient } from '../lib/db';
import { signJWT } from '../lib/utils';
import {
  EMAIL_DOES_NOT_EXISTS_ERROR,
  EMAIL_EXISTS_ERROR,
  PASSWORD_DONT_MATCH,
} from '../lib/error-objects';
import omit from 'lodash/omit';

const authRoute = Router();

authRoute.post('/register', async (req, res) => {
  try {
    registerFormSchema.parse(req.body);
    /**
     * Check to see if the email provided by user already exists in the DB
     */
    const emailExists = await prismaClient.user.findUnique({
      where: { email: req.body.email },
      select: { id: true },
    });
    if (emailExists) throw EMAIL_EXISTS_ERROR;
  } catch (error) {
    return res.status(400).json(error);
  }

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  };

  const user = await prismaClient.user.create({ data: userData });
  const safeUserObj = omit(user, ['password']);
  const jwt = signJWT(safeUserObj);

  res.status(201).json({ status: 'success', token: jwt, user: safeUserObj });
});

authRoute.post('/login', async (req, res) => {
  try {
    loginFormSchema.parse(req.body);
    /**
     * Check to see if the email provided by user even exists in the DB
     */
    const user = await prismaClient.user.findUnique({
      where: { email: req.body.email },
    });
    if (!user) throw EMAIL_DOES_NOT_EXISTS_ERROR;

    /**
     * Does the password match?
     */
    const passMatched = bcrypt.compareSync(req.body.password, user.password);
    if (!passMatched) throw PASSWORD_DONT_MATCH;

    const safeUserObj = omit(user, ['password']);
    const jwt = signJWT(safeUserObj);
    res.status(200).json({ status: 'success', token: jwt, user: safeUserObj });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default authRoute;
