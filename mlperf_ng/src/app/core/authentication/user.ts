import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'John Doe',
  email: 'jdoe@uwaterloo.ca',
  avatar: './assets/images/avatar.jpg',
};

export const guest: User = {
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/avatar.jpg',
};
