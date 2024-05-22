export interface ContentProps {
  id: string;
  content_status: string;
  content_type: string;
  creation_timestamp?: string | undefined;
  genres: Array<string>;
  global_rating: number;
  name: string;
  personal_rating: number | null;
  record_timestamp?: string | undefined;
  images: string;
}