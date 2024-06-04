<template>
  <v-app>
    <NavBar></NavBar>

    <v-main>
      <v-container class="font-noto-sans-thai text-gray-600">
        <v-row>
          <div>
            <header>
              <h2
                class="font-noto-sans-thai py-3"
                style="font-weight: 500; font-size: 26px"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. {{ id }}
              </h2>
            </header>
          </div>
          <v-col col="9" md="9" lg="9">
            <v-container
              class="font-noto-sans-thai rounded-xl min-h-screen bg-gray-100"
            >
              <div class="d-flex justify-center items-center">
                <v-carousel
                  show-arrows="hover"
                  cycle
                  hide-delimiter-background
                  class="rounded-xl"
                >
                  <v-carousel-item
                    src="https://images.unsplash.com/photo-1717295248358-4b8f2c8989d6?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    cover
                  ></v-carousel-item>

                  <v-carousel-item
                    src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                    cover
                  ></v-carousel-item>

                  <v-carousel-item
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    cover
                  ></v-carousel-item>
                </v-carousel>
              </div>

              <div class="contents">
                <p class="mt-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, voluptatem! Voluptatum, corporis autem praesentium
                  omnis similique aut saepe error excepturi? Ad et ducimus
                  nesciunt numquam perspiciatis, repudiandae nam, voluptas
                  reprehenderit minus hic sunt commodi perferendis doloribus
                  deleniti nulla minima nihil inventore necessitatibus placeat
                  earum facere obcaecati quaerat harum beatae? Adipisci officia,
                  consequuntur dolore inventore nisi aperiam aliquid temporibus
                  dolores nulla, sit unde provident laboriosam voluptatibus.
                  Dolor nobis illum nam accusantium laudantium explicabo quaerat
                  deserunt! Hic fuga vitae excepturi sunt nisi molestias culpa
                  possimus eum dignissimos aliquam, adipisci, aspernatur minima!
                  Quo explicabo nemo vitae ex facilis quia inventore adipisci
                  corporis consectetur distinctio, quidem alias praesentium ut
                  tempora consequatur earum hic libero laudantium. Nisi quam
                  porro quas, itaque a molestias repellendus inventore nostrum
                  exercitationem repellat deleniti odit? Pariatur id delectus
                  accusantium eligendi esse amet fuga officia, et unde, nostrum
                  nobis laudantium sint, molestiae dolore maiores iure? Iste
                  illo vero sed similique aut!
                </p>

                <p class="mt-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Vitae, voluptatem! Voluptatum, corporis autem praesentium
                  omnis similique aut saepe error excepturi? Ad et ducimus
                  nesciunt numquam perspiciatis, repudiandae nam, voluptas
                  reprehenderit minus hic sunt commodi perferendis doloribus
                  deleniti nulla minima nihil inventore necessitatibus placeat
                  earum facere obcaecati quaerat harum beatae? Adipisci officia,
                  consequuntur dolore inventore nisi aperiam aliquid temporibus
                  dolores nulla, sit unde provident laboriosam voluptatibus.
                  Dolor nobis illum nam accusantium laudantium explicabo quaerat
                  deserunt! Hic fuga vitae excepturi sunt nisi molestias culpa
                  possimus eum dignissimos aliquam, adipisci, aspernatur minima!
                  Quo explicabo nemo vitae ex facilis quia inventore adipisci
                  corporis consectetur distinctio, quidem alias praesentium ut
                  tempora consequatur earum hic libero laudantium. Nisi quam
                  porro quas, itaque a molestias repellendus inventore nostrum
                  exercitationem repellat deleniti odit? Pariatur id delectus
                  accusantium eligendi esse amet fuga officia, et unde, nostrum
                  nobis laudantium sint, molestiae dolore maiores iure? Iste
                  illo vero sed similique aut!
                </p>
              </div>
            </v-container>
          </v-col>

          <v-col col="3" md="3" lg="3">
            <h1 style="font-weight: 400; font-size: 20px">ติดต่อสอบถาม</h1>
            <div class="d-flex align-center justify-space-around py-3">
              <v-avatar color="grey" rounded="100" size="120">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
                  cover
                ></v-img>
              </v-avatar>
            </div>
            <div>
              <p>
                คุณxxxxxx <br />
                โทร 0xxx-xx-xxxx หรือ 0xx-xxx-xxxx <br />
                E-mail: xxxxxx@mfu.ac.th <br />
              </p>
            </div>

            <div class="py-4">
              <v-btn variant="outlined" rounded="xl" size="x-large" block>
                <v-icon> mdi mdi-download </v-icon> Download
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  name: "innovation-page",
  props: ['id'],
  // data(){
  //   return{
  //     id: this.$route.params.id
  //   }
  // },

  setup() {
    return {};
  },
};
</script>

<style scoped></style>
