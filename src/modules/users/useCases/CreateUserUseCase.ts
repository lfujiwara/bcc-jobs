import { IUseCase } from '../../../common/core/IUseCase';
import { Either, left, Result, right } from '../../../common/core/Result';
import { IUser } from '../domain/IUser';
import { User } from '../domain/User';
import { IUserRepository } from '../repositories/IUserRepository';

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

type Response = Either<Result<any>, Result<IUser>>;

export class CreateUserUseCase
  implements IUseCase<CreateUserDTO, Promise<Response>> {
  private readonly _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this._userRepository = userRepository;
  }

  async execute(
    request: CreateUserDTO
  ): Promise<Either<Result<any>, Result<IUser>>> {
    const result = await User.create({
      email: request?.email,
      password: request?.password,
      username: request?.username,
    });

    if (result.isSuccess) {
      const user: IUser = <IUser>result.getValue();
      const repositoryResult = await this._userRepository.save(user);
      return right(repositoryResult);
    }

    return left(result);
  }
}
