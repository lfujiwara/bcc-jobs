import { Router } from 'express';
import { CreateUserController } from '../../../controllers/CreateUserController';
import { ListUsersController } from '../../../controllers/ListUsersController';
import { ConsoleRepository } from '../../../repositories/ConsoleRepository';
import { CreateUserUseCase } from '../../../useCases/CreateUserUseCase';
import { ListUsersUseCase } from '../../../useCases/ListUsersUseCase';

const userRouter = Router();

const userRepository = new ConsoleRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);
const listUsersUseCase = new ListUsersUseCase(userRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

userRouter.post('/', (req, res) => createUserController.execute(req, res));
userRouter.get('/', (req, res) => listUsersController.execute(req, res));

export { userRouter };
