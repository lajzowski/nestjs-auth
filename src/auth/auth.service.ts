import { Injectable } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CookieOptions, Response } from 'express';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { User } from 'src/user/entities/user.entity';
import { hashPassword } from 'src/utils/hash-password';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from 'uuid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { sign } from 'jsonwebtoken';
import { JwtPayload } from 'src/auth/jwt.strategy';


@Injectable()
export class AuthService {


  private cookieName = 'token';


  private cookieOptions: CookieOptions = {
    secure: process.env.DOMAIN === '1',
    domain: process.env.DOMAIN,
    httpOnly: true,
  };

  private async createToken(currentTokenId: string):Promise<{ accessToken: string, expiresIn: number }> {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.secretKeyAuth, {
      expiresIn,
    });


    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOneBy({ token });
    } while (!!userWithThisToken);
    user.token = token;
    await user.save();

    return token;
  }


  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await User.findOneBy({
        username: req.username,
        password: hashPassword(req.password),
      });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      console.log('test');
      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie(this.cookieName, token.accessToken, this.cookieOptions)
        .json({ ok: true });



    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.token = null;
      await user.save();
      res.clearCookie(this.cookieName, this.cookieOptions);
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }
}
