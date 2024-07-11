<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container class="font-noto-sans-thai">
          <!-- Message list -->
          <v-card class="rounded-xl pa-2 mb-2 bg-gray-200">
            <v-card-title>ข้อความและการตอบกลับ</v-card-title>
            <v-card-text>
              <v-list class="rounded-lg">
                <v-list-item v-for="message in messages" :key="message.id" class="list-item-border my-2">
                  <v-list-item-content>
                    <v-list-item-title>เทคโนโลยีที่สนใจ: {{ message.interestTech }}</v-list-item-title>
                    <v-list-item-subtitle>ชื่อกิจการ: {{ message.businessName }}</v-list-item-subtitle>
                    <v-list-item-subtitle>ผู้ส่ง: {{ message.firstName }} {{ message.lastName }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="my-2">
                    <v-btn @click="openReplyDialog(message._id)" class="bg-slate-800 text-white mr-2">ตอบกลับ</v-btn>
                    <v-btn @click="deleteMessage(message._id)" color="error">ลบ</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <!-- ================================================================================ -->

          <!-- Message Reply  -->
          <!-- header ====================================================================================== -->
          <v-dialog v-model="isDialogOpen" max-width="1000px" class="font-noto-sans-thai" >
            <v-card v-for="selected in selectedMessage" :key="selected._id" class="rounded-xl d-flex flex-column">
              <v-card-title class="headline text-2xl font-semibold" style="white-space: pre-line;">
                เทคโนโลยีที่สนใจ: <span class="text-xl">{{ selected.interestTech }}</span>
              </v-card-title>
              <v-card-subtitle>กิจการ : {{ selected.businessName }}</v-card-subtitle>
              <v-card-subtitle>ประเภทกิจการ : {{ selected.businessType }}</v-card-subtitle>
              <v-card-subtitle>ขอบเขตการใช้งาน : {{ selected.usesScope }}</v-card-subtitle>
              <v-card-subtitle>ผู้ส่ง : {{ selected.firstName }} {{ selected.lastName }}</v-card-subtitle>
              <v-card-subtitle>อีเมล: {{ selected.email }}</v-card-subtitle>
              <v-card-text class="flex-grow-1 d-flex flex-column" style="max-height: 550px; overflow: hidden;">
                <!-- Chat box -->
                <div class="chatbox flex-grow-1" style="overflow-y: auto;" ref="chatbox">
                  <v-list>
                    <v-list-item v-for="reply in sortMessages(selected.messageReply)" :key="reply.id">
                      <!-- User name displayed outside the message bubble -->
                      <div :class="['message-username', reply.user.role === 'admin' || reply.user.role === 'staff' ? 'text-right' : 'text-left']">
                        <p :class="[reply.user.role === 'admin' || reply.user.role === 'staff' ? 'text-gray text-xs' : 'text-gray text-xs']">
                         [{{reply.user.role}}] {{ reply.user.firstName }}
                        </p>
                      </div>
                      <!-- Message bubble -->
                      <div
                        :class="['message-bubble', reply.user.role === 'admin' || reply.user.role === 'staff' ? 'current-user' : 'other-user', 'rounded-lg mt-1']">
                        <div
                          :class="['message-content', reply.user.role === 'admin' || reply.user.role === 'staff' ? 'text-right' : 'text-left']">
                          {{ reply.messages }}
                          <p
                            :class="[reply.user.role === 'admin' || reply.user.role === 'staff' ? 'text-gray-200 text-xs mt-1' : 'text-gray-500 text-xs mt-1']">
                            ส่งเมื่อ {{ formatDateTime(reply.date) }}
                          </p>
                        </div>
                      </div>
                    </v-list-item>
                  </v-list>
                </div>
                <v-text-field label="Your Reply" variant="solo-filled" v-model="replyText" @keyup.enter="sendReply" outlined rounded dense></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="closeReplyDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text :disabled="!replyText.trim()"
                  @click="replyMessage(replyText, selected._id)">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>

      </staff-layout>
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
      <!-- confirm delete -->
      <v-dialog v-model="confirmDialog" max-width="600px">
        <v-card class="rounded-xl pa-4">
          <v-card-title class="text-h5 text-center text-red-500">Are you sure you want to delete this
            Message?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="'blue-grey-darken-1" variant="outlined" class="hover:bg-gray-500"
              @click="closeDelete">Cancel</v-btn>
            <v-btn color="red-darken-1" variant="outlined" class="hover:bg-red-300" @click="confirmDelete">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>

  </v-app>
</template>

<script>
import {
  useUserStore
} from "@/stores/user";
import { api } from "../../axios";
import StaffLayout from "@/layouts/staff.vue";
export default {
  name: "staff-MessageReply-page",
  components: {
    StaffLayout,
  },
  data() {
    return {

      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      isDialogOpen: false,
      selectedMessage: {},

      replyText: '',
      messages: [],
      user: {
        _id: ''
      },
      confirmDialog: false,
      messageToDelete: null,
    };
  },
  async created() {
    this.fetchMessages();

    // get user info from pinia store/user.js
    const userStore = useUserStore();
    try {
      if (!userStore.user) {
        await userStore.fetchUser();
      }
      if (userStore.user) {
        this.user = userStore.user.resutl;
      }
    } catch (error) {
      this.snackbar.message = "Error : " + error;
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;
    }

  },
  methods: {
    
    sortMessages(messages) {
      return messages.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    },
 
    formatDateTime(isoDate) {
      // Parse ISO date string into Date object
      const date = new Date(isoDate);
      // console.log(date)
      // Format options for the date
      const options = {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Bangkok'
      };
      //   // Create a formatter for the Bangkok time zone
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      // console.log(formatter.format(date));
      // Format the date using the formatter
      return formatter.format(date);
    },



    async openReplyDialog(id) {
      try {
        const response = await api.get('/mesDetail/' + id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        this.selectedMessage = response.data.result;
        console.log(this.selectedMessage);
        this.replyText = ''; // Clear previous reply text
        this.isDialogOpen = true;
      } catch (error) {
        let errorMessage = "An unexpected error occurred";
        let errorCode = "Unknown";
        let errorDetails = "";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorDesc = error.response.data.description;
          if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
            // Handle specific error codes
            errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
            errorCode = errorDesc.code;
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            errorMessage = errorDesc?.description || error.response.data.message || "Server error";
            errorCode = error.response.status;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
        } else if (error.code === 'ERR_NETWORK') {
          // Network error
          errorMessage = "Network Error";
          errorCode = error.code;
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }
        // Add more detailed error information
        errorDetails = `${error.name}: ${error.message}`;
        // Log the error
        console.error(`Error : ${errorDetails}`, error);

        this.snackbar = {
          message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
          color: "error",
          Errcode: errorCode,
          show: true
        };
      }
    },
    // Reply by enter
    sendReply() {
      if (this.replyText.trim()) {
        this.replyMessage(this.replyText, this.selectedMessage[0]._id);
      } else {
        console.warn("Cannot send an empty message");
      }
    },

    // reply Message
    async replyMessage(message, id) {
      try {
        await api.patch('/mesReplyUpdate/' + id, {
          messages: message,
          user: this.user._id // Assuming you have the user object available
        }, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        // Add the new reply to the selected message's messageReply array
        this.selectedMessage[0].messageReply.push({
          messages: message,
          user: { firstName: this.user.firstName, role: this.user.role },
          id: Date.now(), // Generate a unique id for the new reply
          date: Date.now()
        });
        // Clear the reply text
        this.replyText = '';
        // console.log(this.selectedMessage);
      } catch (error) {
        let errorMessage = "An unexpected error occurred";
        let errorCode = "Unknown";
        let errorDetails = "";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorDesc = error.response.data.description;
          if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
            // Handle specific error codes
            errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
            errorCode = errorDesc.code;
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            errorMessage = errorDesc?.description || error.response.data.message || "Server error";
            errorCode = error.response.status;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
        } else if (error.code === 'ERR_NETWORK') {
          // Network error
          errorMessage = "Network Error";
          errorCode = error.code;
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }
        // Add more detailed error information
        errorDetails = `${error.name}: ${error.message}`;
        // Log the error
        console.error(`Error : ${errorDetails}`, error);

        this.snackbar = {
          message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
          color: "error",
          Errcode: errorCode,
          show: true
        };
      }
    },

    async fetchMessages() {
      try {
        const response = await api.get('/mesGetData', {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.messages = response.data.result
        // console.log(this.messages);
      } catch (error) {
        let errorMessage = "An unexpected error occurred";
        let errorCode = "Unknown";
        let errorDetails = "";
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorDesc = error.response.data.description;
          if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
            // Handle specific error codes
            errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
            errorCode = errorDesc.code;
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            errorMessage = errorDesc?.description || error.response.data.message || "Server error";
            errorCode = error.response.status;
          }
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
        } else if (error.code === 'ERR_NETWORK') {
          // Network error
          errorMessage = "Network Error";
          errorCode = error.code;
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }
        // Add more detailed error information
        errorDetails = `${error.name}: ${error.message}`;
        // Log the error
        console.error(`Error : ${errorDetails}`, error);

        this.snackbar = {
          message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
          color: "error",
          Errcode: errorCode,
          show: true
        };
      }

    },

    closeReplyDialog() {
      this.isDialogOpen = false;
    },

    // Delete Message ============================

    closeDelete() {
      this.confirmDialog = false;
    },

    async deleteMessage(id) {
      this.messageToDelete = id;
      this.confirmDialog = true;
    },
    async confirmDelete() {
      this.confirmDialog = false;
      if (this.messageToDelete) {
        try {
          await api.delete('/mesDelete/' + this.messageToDelete, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          this.snackbar.message = "Deleted Successfully";
          this.snackbar.color = "success";
          this.snackbar.show = true;
          this.fetchMessages();
        } catch (error) {
          let errorMessage = "An unexpected error occurred";
          let errorCode = "Unknown";
          let errorDetails = "";
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const errorDesc = error.response.data.description;
            if (errorDesc && (errorDesc.code === 40107 || errorDesc.code === 40102)) {
              // Handle specific error codes
              errorMessage = errorDesc.code === 40107 ? errorDesc.description : errorDesc.description;
              errorCode = errorDesc.code;
              setTimeout(function () {
                window.location.reload();
              }, 1000);
            } else {
              errorMessage = errorDesc?.description || error.response.data.message || "Server error";
              errorCode = error.response.status;
            }
          } else if (error.request) {
            // The request was made but no response was received
            errorMessage = "ไม่มีการตอบกลับจากเซิฟเวอร์ หรือ เซิฟเวอร์ผิดผลาด";
          } else if (error.code === 'ERR_NETWORK') {
            // Network error
            errorMessage = "Network Error";
            errorCode = error.code;
          } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
          }
          // Add more detailed error information
          errorDetails = `${error.name}: ${error.message}`;
          // Log the error
          console.error(`Error : ${errorDetails}`, error);

          this.snackbar = {
            message: `Error: ${errorMessage}${errorCode !== "Unknown" ? ` (Code: ${errorCode})` : ''}`,
            color: "error",
            Errcode: errorCode,
            show: true
          };
        }
        this.messageToDelete = null;
      }
    },
  },
 

};
</script>

<style scoped>
@import '../../styles/messageReply.css';
</style>