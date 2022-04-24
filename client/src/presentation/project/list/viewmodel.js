import { useState } from "react";
const repo = require("../../../data/repositories/projects-repository");

export default function ProjectListViewModel() {
  const [error, setError] = useState("");
  const [projects, setProjects] = useState([]);

  async function getProjects() {
    const { result, error } = await repo.getProjects();
    setError(error);
    setProjects(result);
  }

  return {
    projects,
    error,
    getProjects
  }
}
