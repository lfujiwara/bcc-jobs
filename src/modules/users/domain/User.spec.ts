import faker from 'faker';
import { User } from './User';

describe('Test User entity', () => {
  test('Email checking', async () => {
    const userProps = {
      email: faker.internet.email().slice(0, 10),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    let result = await User.create(userProps);
    expect(result.isFailure).toBeTruthy();

    userProps.email = faker.internet.email();

    result = await User.create(userProps);
    expect(result.isSuccess).toBeTruthy();
  });

  test('Password checking', async () => {
    const userProps = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(5),
    };

    let result = await User.create(userProps);
    expect(result.isFailure).toBeTruthy();

    userProps.password = faker.internet.password(10);

    result = await User.create(userProps);
    expect(result.isSuccess).toBeTruthy();
  });

  test('Username checking', async () => {
    const userProps = {
      email: faker.internet.email(),
      username: faker.internet.userName() + 'á',
      password: faker.internet.password(),
    };

    let result = await User.create(userProps);
    expect(result.isFailure).toBeTruthy();

    userProps.username = faker.random.alphaNumeric(10);
    result = await User.create(userProps);
    expect(result.isSuccess).toBeTruthy();

    userProps.username = faker.random.alphaNumeric(21);
    result = await User.create(userProps);
    expect(result.isSuccess).toBeFalsy();

    userProps.username = faker.random.alphaNumeric(2);
    result = await User.create(userProps);
    expect(result.isSuccess).toBeFalsy();
  });
});
