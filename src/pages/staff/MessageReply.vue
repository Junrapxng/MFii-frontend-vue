<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card>
            <v-card-title>ข้อความและการตอบกลับ</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="message in messages" :key="message.id" class="list-item-border my-2">
                  <v-list-item-content>
                    <v-list-item-title>{{ message.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ message.content }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action class="my-2">
                    <v-btn @click="openReplyDialog(message)">ตอบกลับ</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

          <v-dialog v-model="isDialogOpen" max-width="800px">
            <v-card>
              <v-card-title class="headline">{{ selectedMessage.title }}</v-card-title>
              <v-card-text>
               <div class="chatbox">
                <v-list class="">
                  <v-list-item v-for="reply in selectedMessage.replies" :key="reply.id"
                    :class="reply.sentByCurrentUser ? 'd-flex justify-end ' : 'd-flex justify-start'">

                    <v-list-item-content>
                      <v-list-item-subtitle v-if="!reply.sentByCurrentUser" class="grey--text ">  <v-avatar v-if="!reply.sentByCurrentUser" class="mr-3">
                          <v-img src="https://via.placeholder.com/40" alt="User Avatar"></v-img>
                        </v-avatar> {{ reply.sender }}
                      </v-list-item-subtitle>

                      <v-list-item-subtitle v-if="reply.sentByCurrentUser" class="blue--text text-right align-self-start">{{ reply.sender }}
                        <v-avatar v-if="reply.sentByCurrentUser" class="ml-3">
                          <v-img src="https://via.placeholder.com/40" alt="User Avatar"></v-img>
                        </v-avatar></v-list-item-subtitle>

                      <v-list-item-subtitle :class="reply.sentByCurrentUser ? 'text-right' : 'text-left'">{{ reply.text
                        }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
               </div>
                <v-textarea label="Your Reply" v-model="replyText" outlined></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeReplyDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="sendReply">Send</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </staff-layout>
    </v-main>
  </v-app>
</template>

<script>
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
      messages: [
        { id: 1, title: 'Message 1', content: 'Content of message 1', sender: 'Sender A', replies: [{sender:"Kim", text: "สวัสดีครับ"}] },
        { id: 2, title: 'Message 2', content: 'Content of message 2', sender: 'Sender B', replies: [] },
        // Add more messages as needed
      ],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    openReplyDialog(message) {
      this.selectedMessage = message;
      this.replyText = ''; // Clear previous reply text
      this.isDialogOpen = true;
    },
    closeReplyDialog() {
      this.isDialogOpen = false;
    },
    sendReply() {
      if (this.replyText.trim()) {
        const newReply = {
          id: Date.now(),
          text: this.replyText,
          sentByCurrentUser: true, // Assuming current user is sending the reply
          sender: 'Current User', // Replace with actual user information
        };
        this.selectedMessage.replies.push(newReply);
        this.replyText = ''; // Clear the input after sending
      }
    },


    fetchMessages() {
      // logic to fetch messages
    },
    replyMessage(message) {
      // logic to reply message
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
.chatbox{
  overflow: auto;
}
</style>
