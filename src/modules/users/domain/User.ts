import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import validator from 'validator';
import { Result } from '../../../common/core/Result';
import { IUser, IUserProps } from './IUser';
import {
  InvalidEmailError,
  InvalidPasswordError,
  InvalidUsernameError,
} from './UserErrors';

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
    if (!validator.isEmail(props.email)) {
      return new InvalidEmailError(props.email);
    }

    if (
      props.username.length < 3 ||
      props.username.length > 20 ||
      validator.contains(props.username, ' ') ||
      !validator.isAscii(props.username)
    ) {
      return new InvalidUsernameError(props.username);
    }

    if (props.password.length < 8) {
      return new InvalidPasswordError();
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

  updateEmail(newEmail: string) {
    this.email = newEmail;
  }

  async updatePassword(newPassword: string) {
    this.passwordHash = await bcrypt.hash(newPassword, await bcrypt.genSalt());
  }

  async validatePassword(candidate: string) {
    return await bcrypt.compare(candidate, this.passwordHash);
  }
}
