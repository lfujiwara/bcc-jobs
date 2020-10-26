import faker from 'faker';
import { ConsoleRepository } from '../repositories/ConsoleRepository';
import { CreateUserDTO, CreateUserUseCase } from './CreateUserUseCase';

describe('Test User entity', () => {
  test('Basic', async () => {
    const userDTO: CreateUserDTO = {
      email: faker.internet.email(),
      password: faker.internet.password(10),
      username: faker.internet.userName(),
    };

    const userRepository = new ConsoleRepository();
    const useCase = new CreateUserUseCase(userRepository);

    const result = await useCase.execute(userDTO);
    expect(result.value.isSuccess).toBeTruthy();

    const queryResult = await userRepository.findUserByEmail(userDTO.email);
    expect(queryResult.isSuccess).toBeTruthy();
  });
});
