<!-- src/components/Profile.vue -->
<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container class="pa-4 my-15">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card>
              <v-card-title class="headline primary white--text">
                Edit Profile
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="saveProfile" ref="form">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.firstName" label="First Name" prepend-inner-icon="mdi-account"
                        :rules="[rules.required, rules.notEmpty]" required></v-text-field>
                      <v-text-field v-model="user.lastName" label="Last Name" prepend-inner-icon="mdi-account"
                        :rules="[rules.required,rules.notEmpty]" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="user.email" label="Email" prepend-inner-icon="mdi-email"
                        :rules="[rules.required, rules.email, rules.notEmpty]" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field v-model="user.phoneNumber" label="Phone" prepend-inner-icon="mdi-phone"
                        :rules="[rules.required, rules.phone, rules.notEmpty]"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn type="submit" color="primary" class="mr-2">Save</v-btn>
                      <!-- <v-btn type="button" color="grey" @click="resetForm">Cancel</v-btn> -->
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <div class="text-center">
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" vertical>
          <div class="text-subtitle-1 pb-2"></div>
          <p>{{ snackbar.message }}</p>
          <template v-slot:actions>
            <v-btn color="white" variant="text" @click="snackbar.show = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>

    </main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { useUserStore } from '@/stores/user';
import {api} from "../../axios";
export default {
  name: 'user-profile-page',
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      user: [],
      profile: {
        name: '',
        email: '',
        phone: '',
        picture: ''
      },
      rules: {
      required: value => !!value || 'This field is required.',
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
      phone: value => /^\d{10}$/.test(value) || 'Phone must be 10 digits.',
      notEmpty: value => (value && value.trim().length > 0) || 'This field cannot be empty.'
    }
    }
  },
  methods: {

    async validateForm() {
    const { valid } = await this.$refs.form.validate()
    return valid
  },


    async saveProfile() {
        if(await this.validateForm()){
          try {
        await api.patch('/user/updatePatch', this.user, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        console.log('Profile saved:', this.user)
        this.snackbar.message = "User Edited successfully";
        this.snackbar.color = "success"; // Set success color
        this.snackbar.show = true;
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.log("Error", error);
        if(!error.response){
        this.snackbar.message = "Error saving profile: " + error;
      } else {
        this.snackbar.message = "Error saving profile: " + error.response.data.description.description + " Code: " + error.response.status;
      }
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;
      }
        } else {
          this.snackbar.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
        }
    },


    async getUser() {
      const userStore = useUserStore();
      try {
        this.user = userStore.user.resutl
      } catch (error) {
        if (!error.response) {
          this.snackbar.message = "Error getting user: " + error;
        } else {
          this.snackbar.message = "Error getting user: " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }

    },
  },
  created() {
    this.getUser();
  }

}
</script>

<style scoped>
.v-avatar {
  margin-bottom: 20px;
  cursor: pointer;
  border: 2px solid #ddd;
  transition: border-color 0.3s ease;
}

.profile-avatar:hover {
  border-color: #aaa;
}

.v-card-title {
  display: flex;
  justify-content: center;
  align-items: center;

}
</style>
