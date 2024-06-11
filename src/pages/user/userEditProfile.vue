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
                    <v-col cols="12" class="text-center">
                      <v-avatar size="128" class="profile-avatar" @click="triggerFileInput">
                        <v-img :src="profile.picture || defaultPicture"></v-img>
                      </v-avatar>
                      <input
                        ref="fileInput"
                        type="file"
                        accept="image/*"
                        @change="onFileChange"
                        style="display: none;"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.name"
                        label="Name"
                        prepend-inner-icon="mdi-account"
                        :rules="[rules.required]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.email"
                        label="Email"
                        prepend-inner-icon="mdi-email"
                        :rules="[rules.required, rules.email]"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.phone"
                        label="Phone"
                        prepend-inner-icon="mdi-phone"
                        :rules="[rules.required, rules.phone]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn type="submit" color="primary" class="mr-2">Save</v-btn>
                      <v-btn type="button" color="grey" @click="resetForm">Cancel</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </main>
    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  name: 'user-profile-page',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        picture: ''
      },
      defaultPicture: 'https://via.placeholder.com/128',
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
        phone: value => /^\d{10}$/.test(value) || 'Phone must be 10 digits.'
      }
    }
  },
  methods: {
    saveProfile() {
      // Handle save profile logic
      console.log('Profile saved:', this.profile)
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profile.picture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    resetForm() {
      // Reset the form fields to their initial values
      this.profile = {
        name: '',
        email: '',
        phone: '',
        picture: ''
      };
      this.$refs.form.reset();
    }
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
