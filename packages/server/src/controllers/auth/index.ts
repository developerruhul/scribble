import { NextFunction, type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import {
  forgotPassSchema,
  loginFormSchema,
  registerFormSchema,
  resetPassSchema,
} from 'shared';
import bcrypt from 'bcrypt';
import omit from 'lodash/omit';
import { prismaClient } from '@/lib/db';
import {
  EMAIL_DOES_NOT_EXISTS_ERROR,
  EMAIL_ALREADY_EXISTS_ERROR,
  PASSWORD_DONT_MATCH,
  INVALID_TOKEN,
} from '@/lib/error-objects';
import { signJWT } from '@/lib/utils';
import { sendResetPasswordEmail } from '@/lib/mailer';

export default class AuthController {
  private REFRESH_TOKEN_CONFIG = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: true,
  };

  /**
   * Create new user account
   */
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      registerFormSchema.parse(req.body);
      /**
       * Check to see if the email provided by user already exists in the DB
       */
      const emailExists = await prismaClient.user.findUnique({
        where: { email: req.body.email },
        select: { id: true },
      });
      if (emailExists) throw EMAIL_ALREADY_EXISTS_ERROR;

      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      };

      await prismaClient.user.create({ data: userData });
      res.status(201).json('success');
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Login users
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
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
      const jwt = signJWT(safeUserObj, '15s');
      const refresh_token = signJWT(safeUserObj, '5m');

      res
        .cookie('refresh_token', refresh_token, this.REFRESH_TOKEN_CONFIG)
        .status(200)
        .json({ token: jwt, user: safeUserObj });
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Process forgot-password request
   */
  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const email = req.body.email;
      // forgotPassSchema.parse(req.body);

      const user = await prismaClient.user.findUnique({
        where: { email },
      });
      if (!user) throw EMAIL_DOES_NOT_EXISTS_ERROR;

      // GENERATE A UNIQUE TOKEN TO VERIFY IN THE RESET-TOKEN LOGIC
      const token = uuid();

      await prismaClient.user.update({
        where: { email },
        data: { forgotPassToken: token },
      });

      await sendResetPasswordEmail(token, user);

      res.status(201).send('success');
    } catch (error) {
      next(error);
    }
  };

  /**
   * Process reset-password request
   */
  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // First we make sure the data is validated
      resetPassSchema.parse(req.body);

      const token = req.body.token;
      const userOfToken = await prismaClient.user.findUnique({
        where: { forgotPassToken: token },
      });
      if (!userOfToken) throw INVALID_TOKEN;

      await prismaClient.user.update({
        where: { email: userOfToken.email },
        data: {
          forgotPassToken: null,
          password: bcrypt.hashSync(req.body.password, 10),
        },
      });

      res.status(200).send('success');
    } catch (error) {
      return next(error);
    }
  };
}
