import faker from 'faker';
import { IUser } from '../domain/IUser';
import { User } from '../domain/User';
import { ConsoleRepository } from '../repositories/ConsoleRepository';
import { ListUsersUseCase } from './ListUsersUseCase';

describe('Test User entity', () => {
  test('Basic', async () => {
    const userRepository = new ConsoleRepository();
    const makeUser = async () =>
      await User.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      });

    const usersToInsert = (
      await Promise.all(Array.from(Array(5).keys()).map(makeUser))
    ).map((r) => r.getValue() as IUser);
    usersToInsert.forEach((user) => userRepository.save(user));

    const useCase = new ListUsersUseCase(userRepository);
    const result = await useCase.execute();

    expect(result.isRight()).toBeTruthy();

    const users = result.value.getValue() as IUser[];
    const emailSet = new Set(users.map((u) => u.email));

    usersToInsert.forEach((u) => expect(emailSet.has(u.email)).toBeTruthy());
  });
});
