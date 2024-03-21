import { create } from 'zustand';

export const useUserStore = create(set => ({
  users: [],
  userRole: null,
  isUsersView: true,
  loggedUser: null,
  selectedUser: null,
  isUserDetailsModalOpen: false,
  selectedUserForDetails: null,
  isUsersVisible: false,
  userUsername: null,

  setIsUsersVisible: () => set(state => ({ isUsersVisible: !state.isUsersVisible })),
  setSelectedUser: (user) => set({ selectedUser: user }),
  setUserUsername: (username) => set({ userUsername: username }),
  setUserRole: (role) => set({ userRole: role }),
  setUsersView: (isUsersView) => set({ isUsersView }),
  setUsersVisible: (isUsersVisible) => set({ isUsersVisible }),

  
  selectedUserInList: async (username) => {
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
      console.log('Selected user:', data);
      set({ selectedUser: data });
    } catch (error) {
      console.error(error);
    }
  },

  setSelectedUser: async (username) => {
    try {
      const user = await selectUserInList(username);
      set({ selectedUser: user });
      openUserDetailsModal();
    } catch (error) {
      console.error(error);
    }
  },
  
  openUserDetailsModal: () => set(state => ({ isUserDetailsModalOpen: true, selectedUser: state.selectedUser })),
  closeUserDetailsModal: () => set({ isUserDetailsModalOpen: false, selectedUser: null }),
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
        console.error(`Error fetching all users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },
  
  fetchActiveUsers: async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/allActive', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching active users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },

  fetchInactiveUsers: async () => {
    try {
      const token = sessionStorage.getItem('token'); 
      const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/allInactive', {
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'token': token,
        },
      });
      if (!response.ok) {
        console.error(`Error fetching inactive users:`);
        return;
      }
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      console.error(error);
    }
  },

  fetchUser: async () => {
    const response = await fetch('http://localhost:8080/Scrum_Project_4_war_exploded/rest/user/myUserDto', {
      method: 'GET',
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    });

    if (response.status === 403) {
      alert('Unauthorized');
      sessionStorage.clear();
      window.location.href = 'index.html';
    } else if (response.status === 200) {
      const user = await response.json();
      set({ loggedUser: user }); 
    } else {
      console.error('Failed to fetch user data');
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