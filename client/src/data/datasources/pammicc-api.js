const server_url =  process.env.REACT_APP_API_URL

export async function getProjects () {
    const response = await fetch(`${server_url}/projects`).catch(error => {
    console.log(error.message)
    console.log(server_url)
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

export async function newProject(newProject) {
  await fetch(`${server_url}/projects/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  })
  .catch(error => {
    throw error;
  })
}

export async function login(user) {
  await fetch(`${server_url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .catch(error => {
    throw error;
  })
}

export async function register(newUser) {
  await fetch(`${server_url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
  .catch(error => {
    throw error;
  })
}
