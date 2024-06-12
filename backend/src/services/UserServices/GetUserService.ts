// src/services/UserServices/GetUserService.ts

import { User } from '../../models/User';

class GetUserService {
  async execute(userId: number) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user');
    }
  }
}

export default new GetUserService();
