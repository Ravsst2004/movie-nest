export type ReviewsType = {
  page: number;
  results: object[];
  total_pages: number;
  total_results: number;
};

export type ReviewResultType = {
  author: string;
  author_details: {
    avatar_path: string;
    name: string;
    rating: number;
    username: string;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};
