import { Job } from "./job.model";

export interface Project {
  id: string;
  title: string;
  jobs?: Job[];
}
