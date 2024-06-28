<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <!-- Message list -->
          <v-card>
            <v-card-title>ข้อความและการตอบกลับ</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="message in messages" :key="message.id" class="list-item-border my-2">
                  <v-list-item-content>
                    <v-list-item-title>{{ message.businessName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ message.email }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ message.firstName }}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{ message.usesScope }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="my-2">
                    <v-btn @click="openReplyDialog(message._id)">ตอบกลับ</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <!-- ================================================================================ -->



          <!-- Message Reply -->
          <v-dialog v-model="isDialogOpen" max-width="800px">
            <v-card v-for="selected in selectedMessage">
              <v-card-title class="headline">{{ selected.email }}</v-card-title>
              <v-card-text>

                <div class="chatbox">
                  <v-list class="">
                    <v-list-item v-for="reply in selected.messageReply"
                      :class="reply.user === user._id ? 'd-flex justify-end' : 'd-flex justify-start'" :key="reply.id">
                      <v-list-item-content>
                       <!-- Email ผู้ส่ง -->
                        <v-list-item-subtitle v-if="reply.user !== user._id" class="black--text">
                          {{ selected.email }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle v-else class="blue--text text-right align-self-start">
                          Staff
                        </v-list-item-subtitle>
                        <!-- ข้อความ -->
                        <v-list-item-title
                          :class="[reply.user === user._id ? 'text-right' : 'text-left',]">
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
                <v-btn color="blue darken-1" text @click="closeReplyDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="replyMessage(replyText, selected._id)">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </staff-layout>
    </v-main>
  </v-app>
</template>

<script>
import { useUserStore } from "@/store/user";
import axios from "axios";
import StaffLayout from "@/layouts/staff.vue";
export default {
  name: "staff-MessageReply-page",
  components: {
    StaffLayout,
  },
  data() {
    return {
      isDialogOpen: false,
      selectedMessage: {},
      replyText: '',
      messages: [],
      user: {
        _id: ''
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
      console.log(error)
    }

  },
  methods: {
    async openReplyDialog(id) {
      const response = await axios.get('http://localhost:7770/mesDetail/' + id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      this.selectedMessage = response.data.result;
      // console.log(this.selectedMessage);
      this.replyText = ''; // Clear previous reply text
      this.isDialogOpen = true;
    },
    // Reply by enter
    sendReply() {
      if (this.replyText.trim()) {
        this.replyMessage(this.replyText, this.selectedMessage[0]._id);
      }
    },
    async replyMessage(message, id) {
      try {
        const response = await axios.patch('http://localhost:7770/mesReplyUpdate/' + id, {
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
          user: this.user._id,
          id: Date.now() // Generate a unique id for the new reply
        });

        // Clear the reply text
        this.replyText = '';

        console.log(this.selectedMessage);
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    },

    async fetchMessages() {
      try {
        const response = await axios.get('http://localhost:7770/mesGetData', {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        this.messages = response.data.result
        this.replyMessage
        console.log(this.messages);
      } catch (error) {
        console.error("Error fetching product counts:", error);
      }

    },

    closeReplyDialog() {
      this.isDialogOpen = false;
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
  text-align: left
}

.chatbox {
  overflow: auto;
}

.black-text {
  color: black;
}
</style>
