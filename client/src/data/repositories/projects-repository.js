const ds = require("../datasources/pammicc-api");

class Project {
  constructor(id, name, description, url, tags, userid, ctxt_awareness, citzn_engmnt, infstctr_lvrage, tech_innovation, ed_innovation, outreach_scale, ntwork_blding, complex_thinking) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.tags = tags;
    this.userid = userid;
    this.ctxt_awareness = ctxt_awareness;
    this.citzn_engmnt = citzn_engmnt;
    this.infstctr_lvrage = infstctr_lvrage;
    this.tech_innovation = tech_innovation;
    this.ed_innovation = ed_innovation;
    this.outreach_scale = outreach_scale;
    this.ntwork_blding = ntwork_blding;
    this.complex_thinking = complex_thinking;
  }

  validate() {
    if (this.name === "") {
      throw new Error("Cant upload a project without a name.");
    }
    if (!this.ctxt_awareness || !this.citzn_engmnt || !this.infstctr_lvrage || !this.tech_innovation || !this.ed_innovation || !this.outreach_scale || !this.ntwork_blding || !this.complex_thinking) {
      throw new Error("Cant upload a project missing component evaluation")
    }
  }
}


export async function getProjects() {
  try {
    let projects = [];
    const response = await ds.getProjects();
    if (Array.isArray(response)) {
      response.map(project => {
        projects.push(
          new Project(
            project._id,
            project.name || "",
            project.description || "",
            project.url || "",
            project.tags || "",
            project.userid,
            project.ctxt_awareness || 0,
            project.citzn_engmnt || 0,
            project.infstctr_lvrage || 0,
            project.tech_innovation || 0,
            project.ed_innovation || 0,
            project.outreach_scale || 0,
            project.ntwork_blding || 0,
            project.complex_thinking || 0,
          )
        )
        return project
      });
      return {
        result: projects,
        error: null
      };
    }
    return {
      result: null,
      error: new Error("An error occurred getting projects from api-datasource.")
    };
  } catch (e) {
    return {
      result: null,
      error: e
    }
  }
}

export async function getProject(id) {
  try {
    const response = await ds.getProject(id);
    const project = new Project(
      response._id,
      response.name || "",
      response.description || "",
      response.url || "",
      response.tags || "",
      response.userid,
      response.ctxt_awareness || 0,
      response.citzn_engmnt || 0,
      response.infstctr_lvrage || 0,
      response.tech_innovation || 0,
      response.ed_innovation || 0,
      response.outreach_scale || 0,
      response.ntwork_blding || 0,
      response.complex_thinking || 0
    );
    return project;
  } catch (e) {
    throw e;
  }
}

export async function addNewProject(values) {
  try {
    const newProject = new Project(
      null,
      values.name,
      values.description,
      values.url,
      values.tags,
      null,
      values.ctxt_awareness,
      values.citzn_engmnt,
      values.infstctr_lvrage,
      values.tech_innovation,
      values.ed_innovation,
      values.outreach_scale,
      values.ntwork_blding,
      values.complex_thinking
    );
    newProject.validate();

    await ds.newProject(newProject);
    return null;
  } catch (error) {
    return error;
  }
}

export async function updateProject(values, id) {
  try {
    const oldProject = new Project(
      id,
      values.name,
      values.description,
      values.url,
      values.tags,
      id,
      values.ctxt_awareness,
      values.citzn_engmnt,
      values.infstctr_lvrage,
      values.tech_innovation,
      values.ed_innovation,
      values.outreach_scale,
      values.ntwork_blding,
      values.complex_thinking
    );
    oldProject.validate();

    await ds.updateProject(oldProject, id);
    return null;
  } catch (error) {
    return error;
  }
}

export async function deleteProject(id) {
  try {
    await ds.deleteProject(id);
  } catch (error) {
    throw error;
  }
}

