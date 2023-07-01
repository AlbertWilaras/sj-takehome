import { JobModel } from "./Models/JobModel";
import { ProfileModel } from "./Models/ProfileModel";

const API_URL = "https://test.swipejobs.com/api/worker";
const WORKER_ID = "7f90df6e-b832-44e2-b624-3143d428001f";

export async function getProfile (): Promise<ProfileModel> {
    const response = await fetch(API_URL + `/${WORKER_ID}` + "/profile");
    return response.json();
}

export async function getJobMatches (): Promise<JobModel[]> {
    const response = await fetch(API_URL + `/${WORKER_ID}` + "/matches");
    return response.json();
}