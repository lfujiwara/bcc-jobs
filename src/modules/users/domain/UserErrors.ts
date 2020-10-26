import { Result } from '../../../common/core/Result';
import { IUser } from './IUser';

export class InvalidEmailError extends Result<IUser> {
  constructor(email: string) {
    super(false, `'${email}' is not a valid email.`);
  }
}

export class InvalidUsernameError extends Result<IUser> {
  constructor(username: string) {
    super(
      false,
      `${username} is not a valid username. (3 to 20 characters, letters, special characters and numbers, but no spaces)`
    );
  }
}

export class InvalidPasswordError extends Result<IUser> {
  constructor() {
    super(false, 'Password is invalid, please use at least 8 characters');
  }
}
