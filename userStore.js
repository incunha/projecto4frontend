import { create } from 'zustand';

export const useUserStore = create(set => ({
  selectedUser: null,
  isUserDetailsModalOpen: false,
  selectedUserForDetails: null,
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
  openUserDetailsModal: (user) => set({ isUserDetailsModalOpen: true, selectedUserForDetails: user }),
  closeUserDetailsModal: () => set({ isUserDetailsModalOpen: false, selectedUserForDetails: null }),
}));

export const useUsersStore = create(set => ({
  users: [],
  isUsersView: false, 
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

      const newUser = await response.json();
      set(state => ({ users: [...state.users, newUser] }));
    } catch (error) {
      console.error(error);
    }
  },
}));