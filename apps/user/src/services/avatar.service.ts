import { Injectable } from '@nestjs/common';
import { AvatarRepository } from '../repositories/avatar.repository';
import * as fs from 'fs';
import axios from 'axios';

@Injectable()
export class AvatarService {
  constructor(private readonly avatarRepository: AvatarRepository) {}

  create(dto) {
    this.avatarRepository.create(dto);
  }

  findOne({ userId }) {
    return this.avatarRepository.findOne({ userId });
  }

  deleteOne({ userId }) {
    return this.avatarRepository.findOneAndDelete({ userId });
  }

  async downloadAvatar(userId, imageUrl) {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });
      const outputPath = `avatars/${userId}-image.png`;
      fs.writeFileSync(outputPath, response.data);
      return outputPath;
    } catch (error) {
      throw error;
    }
  }

  async removeAvatar(imagePath) {
    try {
      fs.unlinkSync(imagePath);
    } catch (error) {
      throw error;
    }
  }

  async imageToBase64(imagePath) {
    const imageData = fs.readFileSync(imagePath);
    return imageData.toString('base64');
  }
}
