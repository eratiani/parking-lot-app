import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IUser, RegisterUserDto } from './userDto';
@Injectable()
export class UserService {
  // constructor(public readonly db:dbService) {}
  users: IUser[] = [];
  addUser(user: RegisterUserDto) {
    const userId = uuidv4();
    const newUser = {
      ...new RegisterUserDto(user.email, user.logIn, user.password),
      id: userId,
    };
    this.users.push(newUser);
    return userId;
  }
  getUsers() {
    return [...this.users];
  }
  getUser(id: string) {
    const user = this.findUser(id)[0];
    return { ...user };
  }
  updateUser(id: string, body: IUser) {
    const [user, index] = this.findUser(id);
    this.users[index] = { ...user, ...body };
  }
  deleteUser(id: string) {
    const [_, index] = this.findUser(id);
    this.users.splice(index, 1);
  }
  private findUser(id: string): [IUser, number] {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    if (!user) throw new NotFoundException('could not find user');
    return [user, userIndex];
  }
}
