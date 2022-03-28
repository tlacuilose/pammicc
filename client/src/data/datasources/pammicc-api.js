const server_url =  'http://localhost:5005';

module.exports = {
  getProjects: async function() {
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
  },
  newProject: async function(newProject) {
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
  },
};
