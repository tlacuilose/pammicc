const server_url =  process.env.REACT_APP_API_URL

var emailFilter = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class User {
  constructor (id, name, lastName, email, password) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  validate() {
    if ((this.name != null && this.name === "") || (this.name != null && this.lastName === "")) {
      throw new Error("Cant have a user without a name or a last name.");
    }
    if (!emailFilter.test(this.email)) {
      throw new Error("Please provide a valid email.")
    }
    if (this.password.length < 8) {
      throw new Error("Cant have a password of less than 8 characters.");
    }
  }
}

async function login(user) {
  const response = await fetch(`${server_url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
  .catch(error => {
    throw error;
  })

  if (response.status == 401)  {
    throw new Error("Please provide a valid email and password combination.")
  }

  if (!response.ok) {
    throw new Error("An error ocurred login user.")
  }
}

async function register(newUser) {
  const response = await fetch(`${server_url}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
  .catch(error => {
    throw error;
  })

  if (response.status == 409) {
    throw new Error("This email is already registered.")
  }

  if (!response.ok) {
    throw new Error("An error ocurred registering user.")
  }
}


export async function loginUser(values) {
  try {
    const user = new User(
      null,
      null,
      null,
      values.email,
      values.password
    )

    user.validate()

    await login(user)
    return null;
  } catch (error) {
    return error;
  }
}

export async function registerUser(values) {
  try {
    const newUser = new User(
      null,
      values.name,
      values.lastName,
      values.email,
      values.password
    )

    newUser.validate()

    await register(newUser)
    return null;
  } catch (error) {
    return error;
  }
}