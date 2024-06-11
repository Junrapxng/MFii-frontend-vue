<template>
  <v-app>
    <v-main>
      <staff-layout>
        <v-container>
          <v-card>
            <v-card-title>ข้อความและการตอบกลับ</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="message in messages" :key="message.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ message.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      message.content
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn @click="replyMessage(message)">ตอบกลับ</v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
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
      messages: [],
    };
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    fetchMessages() {
      // logic to fetch messages
    },
    replyMessage(message) {
      // logic to reply message
    },
  },
};
</script>

<style scoped></style>
