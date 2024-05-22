import { ContentProps } from "types/content/contentTypes";
import { parseArrayToStringArrayStructured } from "utils/parseArrayToStringArrayStructured";

interface ContentDataBaseData {
  id: string,
  content_status: string,
  content_type: string,
  global_rating: number,
  name: string,
  personal_rating: number,
  images: string,
  genres: string,
}

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
    creation_timestamp,
    record_timestamp,
  }: ContentProps) {
    this.id = id;
    this.content_status = content_status;
    this.content_type = content_type;
    this.genres = genres;
    this.global_rating = global_rating;
    this.name = name;
    this.personal_rating = personal_rating;
    this.images = images;

    if (creation_timestamp) this.creation_timestamp = creation_timestamp;
    if (record_timestamp) this.record_timestamp = record_timestamp;
  }

  id: string;
  content_status: string;
  content_type: string;
  creation_timestamp: string | undefined = undefined;
  genres: Array<string>;
  global_rating: number;
  name: string;
  personal_rating: number | null;
  record_timestamp: string | undefined = undefined;
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

  get creationTimestamp() {
    if (this.creation_timestamp === undefined) return new Date().toISOString();
    return this.creation_timestamp;
  }

  get contentGenres() {
    return this.genres;
  }

  get globalRating() {
    return this.global_rating;
  }

  get contentName() {
    return this.name;
  }

  get personalRating() {
    if (this.personal_rating === null) return 0;
    return this.personal_rating;
  }

  get recordTimestamp() {
    if (this.record_timestamp === undefined) return new Date().toISOString();
    return this.record_timestamp;
  }

  get contentImages() {
    return this.images;
  }

  set contentStatus(status: string) {
    this.content_status = status;
  }

  set contentType(type: string) {
    this.content_type = type;
  }

  set creationTimestamp(timestamp: string) {
    this.creation_timestamp = timestamp;
  }

  set contentGenres(genres: Array<string>) {
    this.genres = genres;
  }

  set globalRating(rating: number) {
    this.global_rating = rating;
  }

  set contentName(name: string) {
    this.name = name;
  }

  set personalRating(rating: number) {
    this.personal_rating = rating;
  }

  set recordTimestamp(timestamp: string) {
    this.record_timestamp = timestamp;
  }

  set contentImages(images: string) {
    this.images = images;
  }

  exportResponse() {
    return {
      id: this.id,
      content_status: this.content_status,
      content_type: this.content_type,
      creation_timestamp: this.creation_timestamp,
      genres: this.genres,
      global_rating: this.global_rating,
      name: this.name,
      personal_rating: this.personal_rating,
      record_timestamp: this.record_timestamp,
      images: this.images,
    };
  }

  exportContentToDatabase() {
    const contentData: ContentDataBaseData = {
      id: this.id,
      content_status: this.content_status,
      content_type: this.content_type,
      global_rating: this.global_rating,
      name: this.name,
      personal_rating: this.personal_rating!,
      images: this.images,
      genres: parseArrayToStringArrayStructured(this.genres),
    };

    return contentData;
  }
}