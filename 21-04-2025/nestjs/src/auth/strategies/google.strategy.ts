import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
  ) {
    if (!googleConfiguration.clientId) {
      throw new Error('Google client ID is not defined');
    }
    if (!googleConfiguration.clientSecret) {
      throw new Error('Google client secret is not defined');
    }
    if (!googleConfiguration.callbackUrl) {
      throw new Error('Google callback URL is not defined');
    }
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.name.givenName + ' ' + profile.name.familyName,
      phone: '', // Provide a default or extracted phone number here
      password: '',
    });
    done(null, user);
  }
}
