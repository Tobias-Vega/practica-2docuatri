import { createUserItem } from './renderUser';
import { createUserService, getAllUsersService } from './services';
import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const $createUserForm = document.getElementById('create-user-form');
  const $userList = document.getElementById('user-list');

  const renderAllUsers = async () => {

    $userList.innerHTML = ""
    return getAllUsersService().then((listOfUsers) => {
      listOfUsers.forEach((user) => {
        $userList.appendChild(createUserItem(user))
      });
    });
  };

  $createUserForm.addEventListener('submit',async (e) => {
    e.preventDefault();
  
    const username =document.getElementById('username').value;
    const email =document.getElementById('email').value;
    const password =document.getElementById('password').value;

    await createUserService({ username, email, password })
      .then(newUser => {
        $userList.appendChild(createUserItem(newUser))
      })
  
      e.target.reset();
  });

  await renderAllUsers();
});