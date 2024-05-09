import { Injectable } from '@nestjs/common';

interface IUserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  support: {
    url: string;
    text: string;
  };
}

@Injectable()
export class ReqResApi {
  private baseUrl: string;
  constructor() {
    this.baseUrl = 'https://reqres.in/api';
  }

  private async send(path) {
    try {
      const url = `${this.baseUrl}${path}`;
      return await (await fetch(url)).json();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId: string): Promise<IUserResponse> {
    return await this.send(`/users/${userId}`);
  }
}
