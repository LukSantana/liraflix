import { StatusProps } from "types/status/statusTypes";

export class Status {
  constructor({
    id,
    status,
    creation_timestamp,
    record_timestamp,
  }: StatusProps){
    this.id = id;
    this.status = status;
    this.creation_timestamp = creation_timestamp;
    this.record_timestamp = record_timestamp;
  }

  id: string;
  status: string;
  creation_timestamp: string;
  record_timestamp: string;

  get statusId() {
    return this.id;
  }

  get statusStatus() {
    return this.status;
  }

  get statusCreationTimestamp() {
    return this.creation_timestamp;
  }

  get statusRecordTimestamp() {
    return this.record_timestamp;
  }

  exportResponse() {
    return {
      id: this.id,
      status: this.status,
      creation_timestamp: this.creation_timestamp,
      record_timestamp: this.record_timestamp,
    };
  }
}