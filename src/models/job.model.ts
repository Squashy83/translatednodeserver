export interface Job {
  id?: string;
  creationDate: Date;
  price: number;
  status: JobStatusEnum;
}

export enum JobStatusEnum {
  PRE = "in preparation",
  WIP = "in progress",
  DEL = "delivered",
  CAN = "cancelled",
}
