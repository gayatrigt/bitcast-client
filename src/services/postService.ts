import axios from "axios";
import httpService from "./httpService";

const route = `/post`;

export default class PostService {
  static async create(newPost) {
    console.log(newPost);
    return await axios({
      method: "post",
      url: route,
      data: newPost,
      headers: {
        "Content-Type": `multipart/form-data}`,
      },
    });
  }

  static async getMany({
    limit = 15,
    page = 1,
    sort,
    since,
    topic,
  }: {
    limit?: number;
    page?: number;
    sort?: string;
    since?: string;
    topic?: string;
  } = {}) {
    let url = `${route}?`;
    url += limit ? `limit=${limit}&` : "";
    url += page ? `page=${page}&` : "";
    url += sort ? `sort=${sort}&` : "";
    url += since ? `since=${since}&` : "";
    url += topic ? `topic=${topic}&` : "";

    return await httpService.get<{ message: string; data: HttpGetPosts }>(url);
  }

  static async upvote(postId: string) {
    return await httpService.patch<{ message: string; data: unknown }>(
      `${route}/${postId}/upvote`
    );
  }

  static async downvote(postId: string) {
    return await httpService.patch<{ message: string; data: unknown }>(
      `${route}/${postId}/downvote`
    );
  }

  static async unvote(postId: string) {
    return await httpService.patch<{ message: string; data: unknown }>(
      `${route}/${postId}/unvote`
    );
  }
}
