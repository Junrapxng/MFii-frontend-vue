<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="font-noto-sans-thai">
        <!-- Message list -->
        <v-card class="rounded-xl bg-black">
          <v-card-title>ข้อความและการตอบกลับ</v-card-title>
          <v-card-text>
            <v-list class="rounded-xl bg-white">
              <v-list-item v-for="message in filteredMessages" :key="message.id" class="list-item-border my-2">
                <v-list-item-content>
                  <v-list-item-title>เทคโนโลยีที่คุณสนใจ: {{ message.interestTech }}</v-list-item-title>
                  <v-list-item-subtitle>ชื่อกิจการของคุณ: {{ message.businessName }} </v-list-item-subtitle>
                  <v-list-item-subtitle>ขอบเขตการใช้งานของคุณ: {{ message.usesScope }} </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="my-2">
                  <v-btn @click="openReplyDialog(message._id)" class="bg-red-600 text-white">ตอบกลับ</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
        <!-- ================================================================================ -->
        <!-- Message Reply -->
        <v-dialog v-model="isDialogOpen" max-width="800px" class="font-noto-sans-thai">
          <v-card v-for="selected in selectedMessage" :key="selected._id" class="rounded-xl">
            <v-card-title class="headline">เทคโนโลยีที่คุณสนใจ: {{ selected.interestTech }}</v-card-title>
            <v-card-subtitle class="headline">ชื่อกิจการของคุณ: {{ selected.businessName }} </v-card-subtitle>
            <v-card-subtitle class="headline">ประเภทธุรกิจของคุณ: {{ selected.businessType }}</v-card-subtitle>
            <v-card-subtitle class="headline">ขอบเขตการใช้งานของคุณ: {{ selected.usesScope }}</v-card-subtitle>
            <v-card-text>


              <div class="chatbox">
                <v-list class="">
                  <v-list-item v-for="reply in selected.messageReply" :class="reply.user === user._id
                      ? 'd-flex justify-end'
                      : 'd-flex justify-start'
                    " :key="reply.id">
                    <v-list-item-content>
                      <!-- Email ผู้ส่ง -->
                      <v-list-item-subtitle v-if="reply.user !== user._id" class="black--text">
                        Staff
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-else class="blue--text text-right align-self-start">
                        {{ selected.firstName }} {{ selected.lastName }}
                      </v-list-item-subtitle>
                      <!-- ข้อความ -->
                      <v-list-item-title :class="[
                        reply.user === user._id ? 'text-right' : 'text-left',
                      ]">
                        {{ reply.messages }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>

              <v-textarea label="Your Reply" v-model="replyText" @keyup.enter="sendReply" outlined></v-textarea>
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


    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import { useUserStore } from "@/store/user";
import axios from "axios";
import NavBar from "./../../components/NavBar.vue";
export default {
  name: "messagePage",
  components: { NavBar },
  data() {
    return {
      snackbar: {
        show: false,
        message: "",
        color: "success", // Default color
      },
      isDialogOpen: false,
      selectedMessage: {},
      replyText: "",
      messages: [],
      user: {
        _id: "",
        email: "",
      },
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
        console.log(this.user);
      }
    } catch (error) {
      console.log("Error getting user " + error);
      if (!error.response) {
        this.snackbar.message = "Error getting user: " + error;
      } else {
        this.snackbar.message = "Error getting user: " + error.response.data.description.description + " Code: " + error.response.status;
      }
      this.snackbar.color = "error"; // Set error color
      this.snackbar.show = true;
    }
  },
  methods: {
    async openReplyDialog(id) {
      try {
        const response = await axios.get(
          "http://localhost:7770/mesDetail/" + id,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.selectedMessage = response.data.result;
        // console.log(this.selectedMessage);
        this.replyText = ""; // Clear previous reply text
        this.isDialogOpen = true;
      } catch (error) {
        if (!error.response) {
          this.snackbar.message = "Error getting detail message: " + error;
        } else {
          this.snackbar.message = "Error getting detail message: " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },


    // Reply by enter
    sendReply() {
      if (this.replyText.trim()) {
        this.replyMessage(this.replyText, this.selectedMessage[0]._id);
      }
    },


    async replyMessage(message, id) {
      try {
        await axios.patch(
          "http://localhost:7770/mesReplyUpdate/" + id,
          {
            messages: message,
            user: this.user._id, // Assuming you have the user object available
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        // Add the new reply to the selected message's messageReply array
        this.selectedMessage[0].messageReply.push({
          messages: message,
          user: this.user._id,
          id: Date.now(), // Generate a unique id for the new reply
        });
        // Clear the reply text
        this.replyText = "";

        console.log(this.selectedMessage);
      } catch (error) {
        console.error("Error sending reply:", error);
        if (!error.response) {
          this.snackbar.message = "Error sending message: " + error;
        } else {
          this.snackbar.message = "Error sending message: " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },

    // fetch ข้อความมาแสดง
    async fetchMessages() {
      try {
        const response = await axios.get("http://localhost:7770/mesGetData", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.messages = response.data.result;
        console.log(this.messages);
      } catch (error) {
        console.error("Error Getting messages:", error);
        if (!error.response) {
          this.snackbar.message = "Error Getting messages: " + error;
        } else {
          this.snackbar.message = "Error Getting messages: " + error.response.data.description.description + " Code: " + error.response.status;
        }
        this.snackbar.color = "error"; // Set error color
        this.snackbar.show = true;
      }
    },

    closeReplyDialog() {
      this.isDialogOpen = false;
    },
  },
  // filter message only user
  computed: {
    filteredMessages() {
      return this.messages.filter(
        (message) => message.email === this.user.email
      );
    },
  },
};
</script>

<style scoped>
.list-item-border {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

.chatbox {
  overflow: auto;
}

.black-text {
  color: black;
}
</style>
