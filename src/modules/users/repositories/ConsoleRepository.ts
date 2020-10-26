import { Result } from '../../../common/core/Result';
import { IUser } from '../domain/IUser';
import { IUserRepository } from './IUserRepository';

export class ConsoleRepository implements IUserRepository {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  async save(user: IUser): Promise<Result<IUser>> {
    this.users.push(user);
    console.log(user);
    return Result.ok(user);
  }

  async findUserByEmail(email: string) {
    const candidates = this.users.filter((u) => u.email === email);
    return candidates.length > 0
      ? Result.ok<IUser>(candidates[0])
      : Result.fail<IUser>('Email is not assigned to any user');
  }
}
