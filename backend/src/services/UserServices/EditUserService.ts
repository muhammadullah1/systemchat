// src/services/UserServices/EditUserService.ts

import bcrypt from 'bcrypt';
import { User } from '../../models/User';

class EditUserService {
  async execute(userId: number, username: string, password: string, email: string) {
    try {
      // Find the user by userId
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Update user details
      user.username = username;
      
      // Check if password needs updating
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }

      user.email = email;

      // Save the updated user
      await user.save();

      return user;
    } catch (error) {
      throw new Error('Error editing user');
    }
  }
}

export default new EditUserService();
