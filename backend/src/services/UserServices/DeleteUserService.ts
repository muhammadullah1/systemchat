// src/services/UserServices/DeleteUserService.ts

import { User } from '../../models/User';

class DeleteUserService {
  async execute(userId: number) {
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}

export default new DeleteUserService();
