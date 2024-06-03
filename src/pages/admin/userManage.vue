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
          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>

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
                          <v-text-field
                          variant="solo-filled"
                            flat
                            v-model="editedItem.name"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12" sm="12">
                          <v-text-field
                          variant="solo-filled"
                            flat
                            v-model="editedItem.email"
                            label="Email"
                            :rules="[
                              (v) => !!v || 'กรุณากรอก อีเมล',
                              (v) => /.+@.+\..+/.test(v) || 'กรุณากรอกอีเมลให้ถูกต้อง',
                            ]"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-autocomplete
                          variant="solo-filled"
                            flat
                            label="Role"
                            v-model="editedItem.role"
                            :items="['User', 'Staff', 'Admin']"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6" sm="6">
                          <v-autocomplete
                          variant="solo-filled"
                            flat
                            label="Status"
                            v-model="editedItem.status"
                            :items="['Active', 'Inactive']"
                          ></v-autocomplete>
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
                  <v-card-title class="text-h5 text-center text-red-500"
                    >Are you sure you want to delete this user?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="'blue-grey-darken-1"
                      variant="outlined"
                      class="hover:bg-gray-500"
                      @click="closeDelete"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="red-darken-1"
                      variant="outlined"
                      class="hover:bg-red-300"
                      @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            <!-- </v-toolbar> -->
          <!-- </template> -->

          
        </v-card-title>
        <v-divider></v-divider>

         <!-- data table -->
        <v-data-table
        v-model:search="search" 
          :headers="headers"
          :items="desserts"
          :items-per-page="-1"
          :sort-by="[{ key: 'userId', order: 'asc' }]"
          :fixed-header="true"
          height="400"
        >

          <template v-slot:item.status="{ item }">
            <div>
              <v-chip
                :color="item.status.toLowerCase() === 'active' ? 'green' : 'red'"
                class="text-uppercase"
                size="small"
                label>
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
</template>

<script>
import AdminLayout from "@/layouts/admin.vue";

export default {
  components: {
    AdminLayout,
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: 'ID',align: 'center',key: 'userId',},
      { title: "Name",align: "start",sortable: false,key: "name",},
      { title: "Email",sortable: false, key: "email" },
      { title: "Create Date", key: "create_date" },
      { title: "Role", key: "role" },
      { title: "Status", key: "status"},
      { title: "Actions", key: "actions", sortable: false },
    ],
    desserts: [],
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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          userId: '001',
          name: "Sarah Moore",
          email: '643150xxxx@lamduan.mfu.ac.th',
          create_date: '03/06/2024',
          role: 'user',
          status: 'active',
        },
        {
          userId: '002',
          name: "Jennifer Blaese",
          email: '643150xxxx@lamduan.mfu.ac.th',
          create_date: '02/06/2024',
          role: 'user',
          status: 'active',
        },
        {
          userId: '003',
          name: "Elizabeth Johnson",
          email: 'Elizabeth.jo@mfu.ac.th',
          create_date: '02/06/2024',
          role: 'staff',
          status: 'active',
        },
        {
          userId: '004',
          name: "Nicole Brown",
          email: 'Nicole Brown@gmail.com',
          create_date: '03/06/2024',
          role: 'user',
          status: 'active',
        },
        {
          userId: '005',
          name: "Ashley Williams",
          email: 'Ashley.wil@mfu.ac.th',
          create_date: '01/06/2024',
          role: 'staff',
          status: 'active',
        },
       
      ];
    },

      generateUserId() {
      // Generate a unique userId based on current timestamp
      // const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      // return (this.desserts.length + 1).toString().padStart(3, '0') + randomNumber;
      return (this.desserts.length + 1).toString().padStart(3, '0');
    },

    generateCreateDate() {
      // Generate a formatted create_date using current date
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
      const year = now.getFullYear();
      return `${day}/${month}/${year}`;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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

    save() {

       // Check if userId is present, if not, generate one
      if (!this.editedItem.userId) {
        this.editedItem.userId = this.generateUserId();
      }

      // Check if create_date is present, if not, generate one
      if (!this.editedItem.create_date) {
        this.editedItem.create_date = this.generateCreateDate();
      }

      if (!this.editedItem.email || !/.+@.+\..+/.test(this.editedItem.email)) {
      alert('Please enter a valid email.');
      return; // Stop execution if email is not valid
      }

      if (!this.editedItem.name || !this.editedItem.email || !this.editedItem.role || !this.editedItem.status) {
        alert('Please fill in all required fields.');
        return;
      }

      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  },
};
</script>

<style scoped></style>
