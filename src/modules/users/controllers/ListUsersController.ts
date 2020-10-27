import { Request, Response } from 'express';
import { BaseController } from '../../../common/infrastructure/web/domain/BaseController';
import { CreateUserUseCaseErrors } from '../useCases/CreateUserUseCase';
import { ListUsersUseCase } from '../useCases/ListUsersUseCase';

export class ListUsersController extends BaseController {
  private useCase: ListUsersUseCase;

  constructor(useCase: ListUsersUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    try {
      const result = await this.useCase.execute();
      const value = result.value;

      if (result.isLeft()) {
        switch (value.constructor) {
          case CreateUserUseCaseErrors.InvalidEmailError:
          case CreateUserUseCaseErrors.InvalidPasswordError:
          case CreateUserUseCaseErrors.InvalidUsernameError:
            return this.clientError(res, value.errorValue());
          default:
            return this.fail(res, value.errorValue());
        }
      } else {
        return this.ok(res, value.getValue());
      }
    } catch (err) {
      this.fail(res, err);
    }
  }
}
