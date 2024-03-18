import { create } from 'zustand';

export const useUserStore = create(set => ({
  users: [],
  isUsersView: true,
  selectedUser: null,
  isUserDetailsModalOpen: false,
  selectedUserForDetails: null,
  isUsersVisible: false,
  setIsUsersVisible: () => set(state => ({ isUsersVisible: !state.isUsersVisible })),
  
  selectUser: async (username) => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch(`http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/${username}`, {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching user: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      set({ selectedUser: data });
    } catch (error) {
      console.error(error);
    }
  },
  openUserDetailsModal: () => set(state => ({ isUserDetailsModalOpen: true, selectedUserForDetails: state.selectedUser })),
  closeUserDetailsModal: () => set({ isUserDetailsModalOpen: false, selectedUserForDetails: null }),
  setUsers: (users) => set({ users }),
  toggleUsersView: () => set(state => ({ isUsersView: !state.isUsersView })),
  fetchUsers: async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/all', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },
  registerUser: async (name, username, email, contactNumber, userPhoto, password) => {
    try {
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          contactNumber,
          userPhoto,
          password,
        }),
      });
      if (!response.ok) {
        console.error(`Error registering user: ${response.statusText}`);
        return;
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const newUser = await response.json();
        set(state => ({ users: [...state.users, newUser] }));
      } else {
        const responseText = await response.text();
        console.log('Response text:', responseText);
        if (responseText === 'A new user is created') {
          
        } else {
          console.error('Unexpected response:', responseText);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  updateUser: (updatedUser) => {
    set(state => ({
      users: state.users.map(user => user.username === updatedUser.username ? updatedUser : user)
    }));
  },
}));