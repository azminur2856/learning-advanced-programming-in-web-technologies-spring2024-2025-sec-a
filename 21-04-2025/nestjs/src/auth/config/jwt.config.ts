import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.jwtSecret,
    signOptions: {
      expiresIn: process.env.jwtExpiration,
    },
  }),
);
