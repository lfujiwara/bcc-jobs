import { IEntity } from '../../../common/domain/IEntity';

export interface IUserProps extends IEntity {
  uuid: string;
  email: string;
  username: string;
  passwordHash: string;
}

export interface IUser extends IUserProps {
  updateEmail(newEmail: string): Promise<void>;
  validatePassword(candidate: string): Promise<boolean>;
  updatePassword(newPassword: string): Promise<void>;
}
