import axios, { AxiosInstance } from "axios";

export class ApiClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://parseapi.back4app.com/classes',
      headers: {
        "X-Parse-Application-Id": import.meta.env.VITE_APP_ID,
        "X-Parse-Master-Key": import.meta.env.VITE_MASTER_KEY,
      },
    });
  }

  public async get<T>(endpoint: string): Promise<T> {
    const response = await this.api.get<T>(endpoint);
    return response.data;
  }
}