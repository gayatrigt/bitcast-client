import httpService from "./httpService";

const route = `/auth`;

export default class AuthService {
  static async auth(data: {
    message: string;
    signature: string;
    signerAddress: string;
  }) {
    const result = await httpService.post<{
      message: string;
      data: AuthUser;
    }>(route, data);

    httpService.setAuthUser(result.data.data);
    return result
  }
}
