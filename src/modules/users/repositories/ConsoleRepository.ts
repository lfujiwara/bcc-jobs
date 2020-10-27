import { Result } from '../../../common/core/Result';
import { IUser } from '../domain/IUser';
import { IUserRepository } from './IUserRepository';

export class ConsoleRepository implements IUserRepository {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  private getUsers(): IUser[] {
    return this.users;
  }

  async save(user: IUser): Promise<Result<IUser>> {
    const users = this.getUsers();
    users.push(user);
    return Result.ok(user);
  }

  async findUserByEmail(email: string) {
    const users = this.getUsers();
    const candidates = users.filter((u) => u.email === email);
    return candidates.length > 0
      ? Result.ok<IUser>(candidates[0])
      : Result.fail<IUser>('Email is not assigned to any user');
  }

  async findAll() {
    const users = this.getUsers();
    return Result.ok(users);
  }
}
