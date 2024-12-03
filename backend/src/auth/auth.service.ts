import { Inject, Injectable } from '@nestjs/common';
import { AuthPayloadDto, AuthPermission } from './dto/auth.dto';
import { IAuthRepository } from 'src/interface/IAuthRepository';
import { AccountGlobal } from 'src/global/account.global';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IAuthRepository')
    private authRepository: IAuthRepository,
  ) {}

  // Sign In
  async signIn(auth: AuthPayloadDto): Promise<AuthPermission | boolean> {
    const { username, password } = auth;
    if (!username || !password) return false;
    const isAuth = await this.authRepository.signIn(auth);
    return isAuth ? isAuth : false;
  }

  // Sign Up
  async signUp(auth: AuthPayloadDto): Promise<AccountGlobal | boolean> {
    const { username, password } = auth;
    if (!username || !password) {
      return false;
    }
    const authResponse = await this.authRepository.signUp(auth);
    const account: AccountGlobal = new AccountGlobal(authResponse);
    return account;
  }
}
