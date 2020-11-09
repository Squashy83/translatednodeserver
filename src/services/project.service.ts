import { Job, JobStatusEnum } from "../models/job.model";
import { transaction } from "../dbutils/connection.util";
import { Project } from "../models/proj.model";

const saveProject = async (prjToCreate: Project) => {
  await transaction(async (connection: any) => {
    const savedProject = await connection.query("INSERT INTO projects SET ?", {
      title: prjToCreate.title,
    });

    if (!prjToCreate.jobs || prjToCreate.jobs === []) {
      //Empty Job case: let's create a default empty one
      await connection.query("INSERT INTO jobs SET ?", {
        price: 0,
        jobstatus: JobStatusEnum.PRE,
        prjid: savedProject.insertId,
        creationDate: Date.now(),
      });
    } else {
      //Jobs are filled in by the client
      for (const job of prjToCreate.jobs) {
        await connection.query("INSERT INTO jobs SET ?", {
          price: job.price,
          jobstatus: job.status,
          prjid: savedProject.insertId,
          creationDate: Date.now(),
        });
      }
    }
  });
};

const changeJobStatus = async (jobToChange: Job) => {
  await transaction(async (connection: any) => {
    const changedStatusJob = await connection.query(
      "UPDATE jobs SET ? WHERE ?",
      {
        title: jobToChange.status,
      },
      { id: jobToChange.id }
    );
  });
};

const getJobsByStatus = async (jobStatusFilter: string) => {
  return await transaction(async (connection: any) => {
    const jobsByStatus = await connection.query("SELECT * FROM jobs WHERE ?", {
      status: jobStatusFilter,
    });
    return jobsByStatus[0] as Job[];
  });
};

const orderJobsBy = async (orderbydate: boolean, orderbyprice: boolean) => {
  return await transaction(async (connection: any) => {
    const queryOrderByDateStr = orderbydate ? "creationDate DESC" : "";
    const queryOrderByPriceStr = orderbyprice ? "price DESC" : "";
    const queryOrderStr =
      orderbydate && orderbyprice
        ? `${queryOrderByDateStr}, ${queryOrderByPriceStr}`
        : `${queryOrderByDateStr}${queryOrderByPriceStr}`;
    const orderedJobs = await connection.query(
      `SELECT * FROM jobs ORDER BY ${queryOrderStr}`
    );

    return orderedJobs[0] as Job[];
  });
};

export default { saveProject, changeJobStatus, getJobsByStatus, orderJobsBy };
