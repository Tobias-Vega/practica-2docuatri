const API_URL = 'http://localhost:4000'

// GET / users
export const getAllUsersService =  async () => {
  return await fetch('http://localhost:4000/users')
    .then((res) => res.json());
};

// POST / users
export const createUserService = async (user) => {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then((res) => res.json());
};

// DELETE / users
export const deleteUserService = async (userId) => {
  return await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE'
  })
    .then((res) => res.status === 200);
}