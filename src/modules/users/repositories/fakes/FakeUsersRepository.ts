import { uuid } from 'uuidv4';

import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../../dtos/IFindAllProvidersDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    expect_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (expect_user_id) {
      return this.users.filter(user => user.id !== expect_user_id);
    }

    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.users.find(item => item.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.users.find(item => item.email === email);
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, data);

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(item => item.id === user.id);

    this.users[findIndex] = Object.assign(user, { id: uuid() }, user);

    return user;
  }
}

export default FakeUsersRepository;
