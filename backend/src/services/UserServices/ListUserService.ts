// src/services/UserServices/ListUserService.ts

import { User } from '../../models/User';

class ListUserService {
  async execute() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }
}

export default new ListUserService();
