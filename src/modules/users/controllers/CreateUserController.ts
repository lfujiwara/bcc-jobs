import { Request, Response } from 'express';
import { BaseController } from '../../../common/infrastructure/web/domain/BaseController';
import { StringUtils } from '../../../common/util/StringUtils';
import {
  CreateUserDTO,
  CreateUserUseCase,
  CreateUserUseCaseErrors,
} from '../useCases/CreateUserUseCase';

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;

  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response) {
    let dto: CreateUserDTO = req.body as CreateUserDTO;
    dto = {
      username: StringUtils.sanitize(dto.username),
      email: StringUtils.sanitize(dto.email),
      password: dto.password,
    };

    try {
      const result = await this.useCase.execute(dto);
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
