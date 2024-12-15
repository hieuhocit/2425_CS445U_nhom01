import { InjectRepository } from '@nestjs/typeorm';
import { IAuthRepository } from 'src/interface/IAuthRepository';
import { Repository } from 'typeorm';
import { AuthPayloadDto, AuthPermission, AuthReponseDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/global/enum.global';
import { AccountEntity } from 'src/accounts/entities/account.entity';

export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: Repository<AccountEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: AuthPayloadDto): Promise<AuthPermission | boolean> {
    const { username, password } = body;
    const userAuth = await this.repository.findOne({ where: { username } });
    if (!userAuth) return false;
    const isMatch = await bcrypt.compare(password, userAuth.password);
    const payload = { ...new AuthReponseDto(userAuth) };
    return isMatch
      ? new AuthPermission({
          id: userAuth.id,
          token: await this.jwtService.signAsync(payload),
          expiredTime: 90000,
        })
      : false;
  }

  async signUp(body: AuthPayloadDto): Promise<AuthReponseDto> {
    const { username, password } = body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const savedUser = await this.repository.save({
      username: username,
      password: hash,
      permission: Role.USER,
    });
    return savedUser;
  }
}
