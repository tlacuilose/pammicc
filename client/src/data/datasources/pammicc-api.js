const server_url =  process.env.REACT_APP_API_URL

export async function getProjects () {
  const response = await fetch(`${server_url}/projects`).catch(error => {
    throw error;
  });

  if (!response.ok) {
    throw new Error("An error ocurred fetching projects");
  }

  const json = await response.json();
  
  if (!json) {
    throw new Error("An error occured getting json data from fetching projects.");
  }

  return json;
}

export async function getProject (id) {
  const response = await fetch(`${server_url}/projects/${id}`).catch(error => {
    throw error;
  });

  if (!response.ok) {
    throw new Error("An error ocurred fetching project");
  }

  const json = await response.json();
  
  if (!json) {
    throw new Error("An error occured getting json data from fetching project.");
  }

  return json;
}

export async function newProject(newProject) {
  const response = await fetch(`${server_url}/projects/new`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": window.location.origin,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
    credentials: 'include',
  })
  .catch(error => {
    throw error;
  })

  if (!response.ok) {
    throw new Error("An error ocurred adding the project.")
  }
}

export async function updateProject(oldProject, id) {
  const response = await fetch(`${server_url}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": window.location.origin,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oldProject),
    credentials: 'include',
  })
  .catch(error => {
    throw error;
  })

  if (!response.ok) {
    throw new Error("An error ocurred editing the project.")
  }
}

export async function deleteProject(id) {
  const response = await fetch(`${server_url}/projects/${id}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": window.location.origin,
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
  .catch(error => {
    throw error;
  })

  if (!response.ok) {
    throw new Error("An error ocurred deleting the project.")
  }
}
