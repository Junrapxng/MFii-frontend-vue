<!-- src/views/AdminPage.vue -->

<template>
  <admin-layout>
    <!-- Content for admin page goes here -->
    <v-container>
      <!-- Topic -->
      <v-card class="rounded-xl pa-4">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon icon="mdi-account-group"></v-icon> &nbsp; User Management

          <v-spacer></v-spacer>

          <!-- search -->
          <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
            variant="solo-filled" flat clearable hide-details single-line></v-text-field>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mx-4" color="primary" dark v-bind="props">
                <v-icon class="pr-2">mdi-plus</v-icon> New User
              </v-btn>
            </template>
            <v-form ref="form" @submit.prevent="this.formTitle === 'New User' ? addsave() : editsave()" >
            <v-card class="rounded-xl pa-4">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
                <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field variant="solo-filled" flat v-model="editedItem.firstName"
                        label="First Name" :rules="[(v) => !!v || 'กรุณากรอก ชื่อจริง']" required></v-text-field>
                      <v-text-field variant="solo-filled" flat v-model="editedItem.lastName"
                        label="Last Name" :rules="[(v) => !!v || 'กรุณากรอก นามสกุล']" required></v-text-field>
                      <v-text-field variant="solo-filled" flat v-model="editedItem.phoneNumber" label="Phone" :rules="[
                        (v) => !!v || 'กรุณากรอก เบอร์โทรศัพท์',
                        (v) =>
                          /^\d{10}$/.test(v) ||
                          'กรุณากรอกเบอร์โทรศัพท์ 10 หลัก',
                      ]" required></v-text-field>
                    </v-col>

                <div>
                  <p class="text-warning">
                    <v-icon color="warning">mdi-alert-circle-outline</v-icon>
                    ใช้ได้แค่ gmail, hotmail, mfu.ac.th, lamduan.mfu.ac.th
                  </p>
                </div>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field variant="solo-filled" flat v-model="editedItem.email" label="Email" :rules="[rules.required, rules.email]"></v-text-field>
                      <v-text-field v-if="this.editedIndex === -1" v-model="editedItem.password" label="Password"
                        variant="solo-filled" flat :rules="[
                          (v) => !!v || 'กรุณากรอก รหัสผ่าน',
                          (v) =>
                            v.length >= 6 ||
                            'กรุณากรอก รหัสผ่าน 6 ตัวอักษรขึ้นไป',
                        ]" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-autocomplete variant="solo-filled" flat label="Role" v-model="editedItem.role"
                        :items="['user', 'staff']" :rules="[(v) => !!v || 'กรุณาเลือก role']" required></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-autocomplete variant="solo-filled" flat label="Status" v-model="editedItem.status"
                        :items="['active', 'inactive']"></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
           
          
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="outlined" class="hover:bg-red-300" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="green-darken-1" variant="outlined" class="hover:bg-green-200" type="submit"
                  >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
          </v-dialog>

          <!-- Delete User -->
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card class="rounded-xl pa-4">
              <v-card-title class="text-h5 text-center text-red-500">Are you sure you want to delete this
                user?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="'blue-grey-darken-1" variant="outlined" class="hover:bg-gray-500"
                  @click="closeDelete">Cancel</v-btn>
                <v-btn color="red-darken-1" variant="outlined" class="hover:bg-red-300"
                  @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- </v-toolbar> -->
          <!-- </template> -->
        </v-card-title>
        <v-divider></v-divider>


        <!-- data table -->
        <v-data-table v-model:search="search" :headers="headers" :items="users.resutl" :items-per-page="-1"
          :sort-by="[{ key: 'userId', order: 'asc' }]" :fixed-header="true" height="400">
          <template v-slot:item.status="{ item }">
            <div>
              <v-chip :color="item.status.toLowerCase() === 'active' ? 'green' : 'red'
                " class="text-uppercase" size="small" label>
                {{ item.status }}
              </v-chip>
            </div>
          </template>

          <template v-slot:item.createdAt="{ item }">
            {{ formatDate(item.createdAt) }}
          </template>


          <template v-slot:item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </admin-layout>
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
</template>

<script>
import AdminLayout from "@/layouts/admin.vue";
import { api } from "../../axios";
// import { format, parseISO, addHours } from 'date-fns'
export default {
  components: {
    AdminLayout,
  },
  data: () => ({
    rules: {
        required: value => !!value || 'กรุณากรอกอีเมล',
        email: value => {
          const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail\.com|hotmail\.com|outlook\.com|lamduan\.mfu\.ac\.th|mfu\.ac\.th)$/i;

          if (!emailPattern.test(value)) {
            return 'โปรดกรอกอีเมลให้ถูกต้อง';
          }

          // Return true or undefined if the email is valid
          return true;
        }

      },
    search: "",
    users: [],
    snackbar: {
      show: false,
      message: "",
      color: "success", // Default color
    },
    dialog: false,
    dialogDelete: false,
    headers: [{
      title: "ID",
      align: "center",
      key: "_id"
    },
    {
      title: "Name",
      align: "start",
      sortable: false,
      key: "firstName"
    },
    {
      title: "Last Name",
      align: "start",
      sortable: false,
      key: "lastName"
    },
    {
      title: "Email",
      sortable: false,
      key: "email"
    },
    {
      title: "Phone",
      sortable: false,
      key: "phoneNumber"
    },
    {
      title: "Create Date",
      key: "createdAt",
      formatter: (value) => {
        if (!value) return '';
        const date = new Date(value);
        return date.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
      }
    },
    {
      title: "Role",
      key: "role"
    },
    {
      title: "Status",
      key: "status"
    },
    {
      title: "Actions",
      key: "actions",
      sortable: false
    },
    ],
    editedIndex: -1,
    editedItem: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      status: "",
    },
    defaultItem: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      status: "active",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  async created() {
    this.initialize();
    this.fectchUser();
  },

  methods: {
    initialize() {
      this.search = "";
    },

    // datetime format
    formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  },


    // fetch users =============================================================
    async fectchUser() {
      try {
        const response = await api.get("/admin/getsUser", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.users = response.data;
      } catch (error) {
        console.log("Error getting user :", error);
        if (error.response.data.description.code == 40107 || error.response.data.description.code == 40102) {
          this.snackbar.message = "Error " + error;
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
          setTimeout(function () {
            window.location.reload()
          }, 1000);
        }
        if (!error.response) {
          this.snackbar.message = "Error getting user :  " + error;
        } else {
          this.snackbar.message = "Error getting user :  " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },

    // Delete users ====================================================================================
    deleteItem(item) {
      this.editedIndex = this.users.resutl.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.users.resutl.splice(this.editedIndex, 1);
      try {
        const res = await api.delete(
          "/admin/deleteUser/" + this.editedItem._id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
        );
        this.snackbar.message = "User deleted successfully";
        this.snackbar.color = "success"; // Set success color
        this.snackbar.show = true;
        this.fectchUser();
      } catch (error) {
        console.log("Error deleting user:", error);
        if (error.response.data.description.code == 40107 || error.response.data.description.code == 40102) {
          this.snackbar.message = "Error " + error;
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
          setTimeout(function () {
            window.location.reload()
          }, 1000);
        }
        if (!error.response) {
          this.snackbar.message = "Error deleting user(ข้อมูลยังไม่ถูกลบ โปรดลองอีกครั้ง) : " + error;
        } else {
          this.snackbar.message = "Error deleting user(ข้อมูลยังไม่ถูกลบ โปรดลองอีกครั้ง) : " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    // =================================================================================

    //edit user ========================================================================

    editItem(item) {
      this.editedIndex = this.users.resutl.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async editsave() {
      const { valid } = await this.$refs.form.validate();
        if(valid){
          if (this.editedIndex > -1) {
        Object.assign(this.users.resutl[this.editedIndex], this.editedItem);
        try {
          await api.patch(
            "/admin/updatePatch/" + this.editedItem._id, {
            firstName: this.editedItem.firstName.trim(),
            lastName: this.editedItem.lastName.trim(),
            email: this.editedItem.email.trim().toLowerCase(),
            phoneNumber: this.editedItem.phoneNumber.trim(),
            role: this.editedItem.role,
            status: this.editedItem.status,
          }, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
          );
          this.snackbar.message = "User Edited successfully";
          this.snackbar.color = "success"; // Set success color
          this.snackbar.show = true;
          this.fectchUser();
        } catch (error) {
          console.log("Error editing user:", error);
          if (error.response.data.description.code == 40107 || error.response.data.description.code == 40102) {
            this.snackbar.message = "Error " + error;
            this.snackbar.color = "error"; // Set error color
            this.snackbar.show = true;
            setTimeout(function () {
              window.location.reload()
            }, 1000);
          }
          if (!error.response) {
            this.snackbar.message = "Error editing user(ข้อมูลยังไม่ถูกแก้ไข โปรดลองอีกครั้ง): " + error;
          } else {
            this.snackbar.message = "Error editing user(ข้อมูลยังไม่ถูกแก้ไข โปรดลองอีกครั้ง): " + error.response.data.description.description + " Code: " + error.response.status;
          }
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
        }
      } else {
        this.users.resutl.push(this.editedItem);
      }
      this.close();
        }
        else{
          this.snackbar.message = "กรอกข้อมูลให้ครบถ้วนและถูกต้อง"
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
        }
    },

    // Add user =========================================================================================================================
    async addsave() {
      const { valid } = await this.$refs.form.validate();
      if(valid){
        if (!this.editedIndex > -1) {
        //  Object.assign(this.users.resutl[this.editedIndex], this.editedItem);
        // console.log(this.editedItem._id);
        try {
          await api.post(
            "/register", {
            firstName: this.editedItem.firstName.trim(),
            lastName: this.editedItem.lastName.trim(),
            email: this.editedItem.email.trim().toLowerCase(),
            phoneNumber: this.editedItem.phoneNumber.trim(),
            password: this.editedItem.password.trim(),
            role: this.editedItem.role,
            status: this.editedItem.status,
            // createDate: createDate,
          },
          );
          this.snackbar.message = "User Added successfully";
          this.snackbar.color = "success"; // Set success color
          this.snackbar.show = true;
          this.fectchUser();
        } catch (error) {
          console.error("Error Adding user:", error);
          if (!error.response) {
            this.snackbar.message = "Error Adding user(ข้อมูลยังไม่ถูกเพิ่ม โปรดลองอีกครั้ง): " + error;
          }
          else {
            this.snackbar.message = "Error Adding user(ข้อมูลยังไม่ถูกเพิ่ม โปรดลองอีกครั้ง): " + error.response.data.description.description + " Code: " + error.response.status;
          }
          this.snackbar.color = "error"; // Set error color
          this.snackbar.show = true;
        }
      } else {
        this.users.resutl.push(this.editedItem);
      }
      this.close();
      }
      else{
        this.snackbar.message = "กรอกข้อมูลให้ครบถ้วนและถูกต้อง"
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
   
    }

  },

};
</script>



<style scoped>
/* สำหรับเบราว์เซอร์ Webkit (เช่น Chrome, Safari) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* สำหรับ Firefox */
html {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>
