/// <reference types="vite/client" />

import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }

  interface IUser {
    _id: string;
    address: string;
  }

  interface ITopic {
    _id: string;
    title: string;
  }

  interface Post {
    _id?: string;
    author_id?: IUser;
    topic_id?: ITopic;
    caption?: string;
    created_at?: Date;
    upvotes: number;
    upvoted: boolean;
    downvoted: boolean;
    tiktok: string;
    media_url: string;
  }

  interface HttpGetPosts {
    docs: Post[];
    meta: {
      page: number;
      limit: number;
      total_count: number;
      total_pages: number;
    };
  }

  interface AuthUser {
    access_token: string;
    address: string;
  }

  interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
  }
}
