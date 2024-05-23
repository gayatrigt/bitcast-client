import axios from "axios";
import httpService from "./httpService";

const route = `/post`;

export default class PostService {
  static async create(newPost: unknown) {
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
    page,
    limit,
    sort,
    order,
    since,
    topic,
    author,
  }: PostQueryParams) {
    let url = `${route}?`;
    url += page ? `page=${page}&` : "";
    url += limit ? `limit=${limit}&` : "";
    url += sort ? `sort=${sort}&` : "";
    url += since ? `since=${since}&` : "";
    url += topic ? `topic=${topic}&` : "";
    url += order ? `order=${order}&` : "";
    url += author ? `author=${author}&` : "";

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
