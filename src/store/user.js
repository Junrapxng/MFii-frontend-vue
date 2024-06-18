
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUser() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:7770/getUser',{
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        this.user = response.data;
        console.log(this.user)
      } catch (error) {
        this.error = error;
        // alert('Hello' + error)
      } finally {
        this.loading = false;
      }
    },
  },
//   getters:{
//     useUserStore(state){
//         return state.user;
//     }
//   }
});
