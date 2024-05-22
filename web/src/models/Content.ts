import { ContentProps } from "@src/types/content";

export class Content {
  constructor({
    id,
    content_status,
    content_type,
    genres,
    global_rating,
    name,
    personal_rating,
    images,
  }: ContentProps) {
    this.content_type = content_type;
    this.genres = genres;
    this.global_rating = global_rating;
    this.name = name;
    this.personal_rating = personal_rating;
    this.images = images;

    if (id) this.id = id;
    if (content_status) this.content_status = content_status;
  }

  id?: string;
  content_status?: string;
  content_type: string;
  genres: Array<string>;
  global_rating: number;
  name: string;
  personal_rating: number | null;
  images: string;

  get contentId() {
    return this.id;
  }

  get contentStatus() {
    return this.content_status;
  }

  get contentType() {
    return this.content_type;
  }

  set contentType(type: string) {
    this.content_type = type;
  }

  get contentGenres() {
    return this.genres;
  }

  set contentGenres(genres: Array<string>) {
    this.genres = genres;
  }

  get globalRating() {
    return this.global_rating;
  }

  set globalRating(rating: number) {
    this.global_rating = rating;
  }

  get contentName() {
    return this.name;
  }

  set contentName(name: string) {
    this.name = name;
  }

  get creationTimestamp() {
    return this.creationTimestamp;
  }

  set creationTimestamp(timestamp: string) {
    this.creationTimestamp = timestamp;
  }

  get recordTimestamp() {
    return this.recordTimestamp;
  }

  set recordTimestamp(timestamp: string) {
    this.recordTimestamp = timestamp;
  }

  set personalRating(rating: number) {
    this.personal_rating = rating;
  }

  set contentImages(images: string) {
    this.images = images;
  }

  exportResponse() {
    const responseObject: any = {
      id: this.id,
      content_status: this.content_status,
      content_type: this.content_type,
      genres: this.genres,
      global_rating: this.global_rating,
      name: this.name,
      personal_rating: this.personal_rating,
      images: this.images,
    }

    if (this.creationTimestamp) responseObject.creation_timestamp = this.creationTimestamp;
    if (this.recordTimestamp) responseObject.record_timestamp = this.recordTimestamp;

    return responseObject;
  }
}