import { GenreProps } from "types/genres/genreTypes";

export class Genre {
  constructor({
    id,
    name,
    content_type,
    creation_timestamp,
    record_timestamp,
  }: GenreProps) {
    this.id = id;
    this.name = name;
    this.content_type = content_type;
    this.creation_timestamp = creation_timestamp;
    this.record_timestamp = record_timestamp;
  }

  id: string;
  name: string;
  content_type: string;
  creation_timestamp: string;
  record_timestamp: string;

  get genreId() {
    return this.id;
  }

  get genreName() {
    return this.name;
  }

  get genreContentType() {
    return this.content_type;
  }

  get genreCreationTimestamp() {
    return this.creation_timestamp;
  }

  get genreRecordTimestamp() {
    return this.record_timestamp;
  }

  exportResponse () {
    return {
      id: this.id,
      name: this.name,
      content_type: this.content_type,
      creation_timestamp: this.creation_timestamp,
      record_timestamp: this.record_timestamp,
    };
  }
}