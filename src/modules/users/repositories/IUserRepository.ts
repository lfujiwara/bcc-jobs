import { Result } from '../../../common/core/Result';
import { IUser } from '../domain/IUser';

export interface IUserRepository {
  save(user: IUser): Promise<Result<IUser>>;
  findUserByEmail(email: string): Promise<Result<IUser>>;
}
