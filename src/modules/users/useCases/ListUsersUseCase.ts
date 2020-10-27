import { IUseCase } from '../../../common/core/IUseCase';
import { Either, Result, right } from '../../../common/core/Result';
import { IUser } from '../domain/IUser';
import * as UserErrors from '../domain/UserErrors';
import { IUserRepository } from '../repositories/IUserRepository';

type Response = Either<Result<any>, Result<IUser[]>>;

export const ListUserUseCaseErrors = { ...UserErrors };

export class ListUsersUseCase implements IUseCase<void, Promise<Response>> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(): Promise<Either<Result<any>, Result<IUser[]>>> {
    const result = await this._userRepository.findAll();
    return right(Result.ok(result.getValue()));
  }
}
