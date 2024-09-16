export interface Img {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    id: string;
    name: string;
  };
  likes: number;
}

export interface ResponseGetImgs {
  results: Img[];
  total: number;
  total_pages: number;
}

export type SubmitSearchBar = (querySearchBar: string) => void;

export type ClickLoadMoreBtn = (heightForScroll: number) => void;

export type OpenModal = (image: Img) => void;

export type CloseModal = () => void;