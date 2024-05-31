<template>
    <!-- <v-app> -->
      <!-- เนื้อหาอื่นๆ ของแอป -->
  
      <!-- Footer -->
      <v-footer app>
        <v-container fluid class="footer font-noto-sans-thai">
          <v-row justify="center">
            <v-col cols="12" md="4">
              <h3>
                <blockquote>
                  <v-img
                    src="https://mfii.mfu.ac.th/fileadmin/templatesMfii/assets/img/MFii-Logo2019_H-White.png"
                    width="100%"
                  />
                  <h4 style="color: #fff; font-weight: normal; border-bottom: 2px solid #ffffff; width: 100%;">
                    ส่วนจัดการทรัพย์สินทางปัญญาและนวัตกรรม
                  </h4>
                  <p style="color: #fff">มหาวิทยาลัยแม่ฟ้าหลวง</p>
                </blockquote>
              </h3>
            </v-col>
            <v-col cols="12" md="4">
              <h4 class="footer-heading">
                ติดต่อเรา
              </h4>
              <p style="color: #fff;">
                ส่วนจัดการทรัพย์สินทางปัญญาและนวัตกรรม มหาวิทยาลัยแม่ฟ้าหลวง
                <br />333 ม.1 ต.ท่าสุด อ.เมือง <br />จังหวัดเชียงราย 57100
                <br />โทรศัพท์: 0 5391 7003 และ 7011<br />อีเมล: mfii@mfu.ac.th
              </p>
              <div class="clear-fix"></div>
              <h4 class="footer-heading">
                ติดตาม
              </h4>
              <ul class="mfu-social flex space-x-4">
  <li class="group rounded-full bg-white">
    <a
      href="https://www.facebook.com/MFiiconnect"
      target="_blank"
      class="w-10 h-10 rounded-full flex justify-center items-center transition duration-500 ease-in-out group-hover:bg-blue-700"
    >
      <v-icon class="mdi mdi-facebook text-2xl text-blue-700 group-hover:text-white"></v-icon>
    </a>
  </li>
  <li class="group rounded-full bg-white">
    <a
      href="https://www.youtube.com/channel/UCRXKU6cKnrUvnily0rbFIRg"
      target="_blank"
      class="w-10 h-10 rounded-full flex justify-center items-center transition duration-500 ease-in-out group-hover:bg-red-700"
    >
      <v-icon class="mdi mdi-youtube text-2xl text-red-700  group-hover:text-white"></v-icon>
    </a>
  </li>
  <li class="group rounded-full bg-white">
    <a
      href="https://lin.ee/lYbjQ5H"
      target="_blank"
      class="w-10 h-10 rounded-full flex justify-center items-center transition duration-500 ease-in-out group-hover:bg-green-600"
    >
      <v-icon class="mdi mdi-chat text-2xl text-green-600  group-hover:text-white"></v-icon>
    </a>
  </li>
</ul>

            </v-col>
            <v-col cols="12" md="4">
              <h4 class="footer-heading">
                เว็บไซต์ที่เกี่ยวข้อง
              </h4>
              <p>
                <a href="https://www.mfu.ac.th" style="color: #fff;">มหาวิทยาลัยแม่ฟ้าหลวง</a><br />
                <a href="https://mrii.mfu.ac.th" style="color: #fff;">สถาบันวิจัยและนวัตกรรม</a><br />
                <a href="https://research.mfu.ac.th" style="color: #fff;">ส่วนบริหารงานวิจัย</a>
              </p>
              <div class="clear-fix"></div>
              <div class="counter">
                <img
                  src="https://counter9.stat.ovh/private/freecounterstat.php?c=csh7xeuzux2wc62g9a2hwgyxhdmh4gdw"
                  border="0"
                  title="free counter"
                  alt="free counter"
                />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    <!-- </v-app> -->
  </template>
  
  <script>
  export default {
    name: "footer-component",
  };
  </script>
  
  <style>
  .footer {
    background-color: #252422;
    padding-top: 30px;
    padding-bottom: 20px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .footer-heading {
    color: #fff;
    margin-bottom: 5px;
    border-bottom: 1px solid;
    font-weight: normal;
  }

  .clear-fix::after {
    content: "";
    display: table;
    clear: both;
  }

  blockquote {
    padding: 10.5px 21px;
    margin: 0 0 20px 0;
    font-size: 14px;
    border-left: 2px solid #ffffff;
}
  </style>
  