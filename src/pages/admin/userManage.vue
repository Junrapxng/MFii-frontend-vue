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

          <!-- Add User -->
          <!-- <template v-slot:top> -->
          <!-- <v-toolbar flat> -->
          <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <!-- <v-spacer></v-spacer> -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mx-4" color="primary" dark v-bind="props">
                <v-icon class="pr-2">mdi-plus</v-icon> New User
              </v-btn>
            </template>
            <v-card class="rounded-xl pa-4">
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field variant="solo-filled" flat v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" sm="12">
                      <v-text-field variant="solo-filled" flat v-model="editedItem.email" label="Email" :rules="[
                        (v) => !!v || 'กรุณากรอก อีเมล',
                        (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง',
                      ]" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-autocomplete variant="solo-filled" flat label="Role" v-model="editedItem.role"
                        :items="['staff', 'admin']"></v-autocomplete>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                      <v-autocomplete variant="solo-filled" flat label="Status" v-model="editedItem.status"
                        :items="['Active', 'Inactive']"></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" variant="outlined" class="hover:bg-red-300" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="green-darken-1" variant="outlined" class=" hover:bg-green-200" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
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
              <v-chip :color="item.status.toLowerCase() === 'active' ? 'green' : 'red'" class="text-uppercase"
                size="small" label>
                {{ item.status }}
              </v-chip>
            </div>
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
  <div class="text-center" >
    <v-snackbar
      v-model="snackbar.show" :color="snackbar.color"
    >

      <p> {{ snackbar.message }}</p>

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>


</template>

<script>
import AdminLayout from "@/layouts/admin.vue";
import axios from "axios";
export default {
  components: {
    AdminLayout,
  },
  data: () => ({
    search: '',
    users: [],
    snackbar: {
        show: false,
        message: '',
        color: 'success', // Default color
      },
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: 'ID', align: 'center', key: '_id', },
      { title: "Name", align: "start", sortable: false, key: "name", },
      { title: "Email", sortable: false, key: "email" },
      { title: "Create Date", key: "create_date" },
      { title: "Role", key: "role" },
      { title: "Status", key: "status" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      role: "",
      status: "",
    },
    defaultItem: {
      name: "",
      email: "",
      role: "",
      status: "Active",
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
    try {
      const response = await axios.get('http://localhost:7770/admin/getsUser', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      this.users = response.data;
      console.log(this.users)
    } catch (error) {
      console.error('Error Fetching data :', error);
        this.snackbar.message = 'Error Fetching data : ' + error.message;
        this.snackbar.color = 'error'; // Set error color
        this.snackbar.show = true;
    }


  },

  methods: {
    initialize() {
      this.search = '';
    },

    // generateUserId() {
    //   // Generate a unique userId based on current timestamp
    //   // const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    //   // return (this.desserts.length + 1).toString().padStart(3, '0') + randomNumber;
    //   return (this.desserts.length + 1).toString().padStart(3, '0');
    // },

    // generateCreateDate() {
    //   // Generate a formatted create_date using current date
    //   const now = new Date();
    //   const day = now.getDate().toString().padStart(2, '0');
    //   const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    //   const year = now.getFullYear();
    //   return `${day}/${month}/${year}`;
    // },




    // ====================================================================================
    deleteItem(item) {
      this.editedIndex = this.users.resutl.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

   async deleteItemConfirm() {
      this.users.resutl.splice(this.editedIndex, 1);
      console.log(this.editedItem._id)
      try {
        const res = await axios.delete(
          'http://localhost:7770/admin/deleteUser/' + this.editedItem._id,
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        )
        console.log(res)
        this.snackbar.message = 'User deleted successfully';
        this.snackbar.color = 'success'; // Set success color
        this.snackbar.show = true;
       } catch (error) {
        console.error('Error deleting user:', error);
        this.snackbar.message = 'Error deleting user(ข้อมูลยังไม่ถูกลบ โปรดลองอีกครั้ง): ' + error.message;
        this.snackbar.color = 'error'; // Set error color
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
// ============================================================================




    // Save and edited user ========================================================================

    editItem(item) {
      this.editedIndex = this.users.resutl.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

  async save() {

      // if (!this.editedItem.email || !/.+@.+\..+/.test(this.editedItem.email)) {
      //   alert('Please enter a valid email.');
      //   return; // Stop execution if email is not valid
      // }

      // if (!this.editedItem.name || !this.editedItem.email || !this.editedItem.role || !this.editedItem.status) {
      //   alert('Please fill in all required fields.');
      //   return;
      // }

      if (this.editedIndex > -1) {
        Object.assign(this.users.resutl[this.editedIndex], this.editedItem);
        console.log(this.editedItem._id)
       try {
        const res = await axios.patch(
          'http://localhost:7770/admin/updatePatch/' + this.editedItem._id,
          {
            email: this.editedItem.email,
            role: this.editedItem.role,
            status: this.editedItem.status
          },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        );
        this.snackbar.message = 'User Edited successfully';
        this.snackbar.color = 'success'; // Set success color
        this.snackbar.show = true;
       } catch (error) {
        console.error('Error editing user:', error);
        this.snackbar.message = 'Error editing user(ข้อมูลยังไม่ถูกแก้ไข โปรดลองอีกครั้ง): ' + error.message;
        this.snackbar.color = 'error'; // Set error color
        this.snackbar.show = true;
      //   setTimeout(() => {
      //   window.location.reload();
      // }, 2000); // 2-second delay
       }
      } else {
        // this.users.resutl.push(this.editedItem);
      }
      this.close();
    }
  },

};
</script>

<style scoped></style>
