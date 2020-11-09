import { Request, Response } from "express";
import { Job } from "../models/job.model";
import { Project } from "../models/proj.model";
import ProjectService from "../services/project.service";

/**
 * Create a Project.
 * @route POST /
 */
export const createPrj = async (req: Request, res: Response) => {
  const prjtoCreate = req.body as Project;
  await ProjectService.saveProject(prjtoCreate);
  res.send(prjtoCreate);
};

/**
 * Change a Job Status.
 * @route PATCH /
 */
export const changeJobStatus = async (req: Request, res: Response) => {
  const jobtoChange = req.body as Job;
  await ProjectService.changeJobStatus(jobtoChange);
  res.send(jobtoChange);
};

/**
 * Filter Jobs By Status
 * @route GET /
 */
export const filterJobsByStatus = async (req: Request, res: Response) => {
  const jobStatusFilter = req.query.by as string;
  const filteredJobs = await ProjectService.getJobsByStatus(jobStatusFilter);
  res.send(filteredJobs);
};

/**
 * Order Job by price and/or creationDate
 * @route GET /
 */
export const orderJobsByCriteria = async (req: Request, res: Response) => {
  const orderByDate = ((req.query.byDate || "") as string) === "yes";
  const orderByPrice = ((req.query.byPrice || "") as string) === "yes";
  const orderedJobs = await ProjectService.orderJobsBy(
    orderByDate,
    orderByPrice
  );
  res.send(orderedJobs);
};
