import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { Result } from '../../../common/core/Result';
import { StringUtils } from '../../../common/util/StringUtils';
import { IUser, IUserProps } from './IUser';
import * as UserErrors from './UserErrors';

export class User implements IUser {
  uuid: string;
  email: string;
  username: string;
  passwordHash: string;

  constructor(
    email: string,
    username: string,
    passwordHash: string,
    uuid: string
  ) {
    this.email = email;
    this.username = username;
    this.passwordHash = passwordHash;
    this.uuid = uuid;
  }

  public static async create(
    props: Omit<Omit<IUserProps, 'uuid'>, 'passwordHash'> & {
      password: string;
    },
    uuid?: string
  ): Promise<Result<IUser>> {
    if (!StringUtils.isString(props.email) || !validator.isEmail(props.email)) {
      return new UserErrors.InvalidEmailError(props.email);
    }

    if (
      !StringUtils.isString(props.email) ||
      props.username.length < 3 ||
      props.username.length > 20 ||
      validator.contains(props.username, ' ') ||
      !validator.isAscii(props.username)
    ) {
      return new UserErrors.InvalidUsernameError(props.username);
    }

    if (!StringUtils.isString(props.email) || props.password.length < 8) {
      return new UserErrors.InvalidPasswordError();
    }

    const user = new User(
      props.email,
      props.username,
      await User.hashPassword(props.password),
      uuid || nanoid()
    );
    return Result.ok(user);
  }

  public static async hashPassword(password: string) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  async updateEmail(newEmail: string) {
    this.email = newEmail;
  }

  async updatePassword(newPassword: string) {
    this.passwordHash = await bcrypt.hash(newPassword, await bcrypt.genSalt());
  }

  async validatePassword(candidate: string) {
    return await bcrypt.compare(candidate, this.passwordHash);
  }
}
