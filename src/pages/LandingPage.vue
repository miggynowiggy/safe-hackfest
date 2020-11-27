<template>
  <div>
    <div class="banner-color pa-10">
      <v-container>
        <div class="d-flex align-center mb-3">
          <div class="mr-3">
            <v-img
              :src="require('@/assets/img/safe-logo-white.svg')"
              width="30px"
            />
          </div>
          <span class="white--text text-h5">Safe</span>
        </div>
        <div class="d-md-flex justify-md-space-between white--text">
          <div class="align-self-center text-center text-md-left mt-10 mt-md-5">
            <span class="text-h4 font-weight-semibold"
              >We make searching easy for you.</span
            >
            <p class="text-subtitle-1 my-3">
              Mental health-related products and services from legitimate
              service providers are now available in a single platform.
            </p>
            <v-btn class="my-3 text-none" color="secondary" x-large rounded
              >Get Started</v-btn
            >
          </div>
          <div class="d-none d-md-inline">
            <v-img
              :src="require('@/assets/img/boost.svg')"
              class="mx-auto"
              width="30rem"
            />
          </div>
        </div>
      </v-container>
    </div>
    <v-container class="py-15">
      <v-row justify="center" justify-md="start" class="my-8">
        <v-col cols="5" md="5" lg="4" xl="3" offset-md="1">
          <v-img :src="require('@/assets/img/collaboration.svg')" />
        </v-col>
        <v-col cols="12" md="6" offset-xl="1">
          <div class="pa-5">
            <span class="text-h5 font-weight-semibold primary--text"
              >Collaborative Content</span
            >
            <p class="text-body-2 my-3">
              The platform collects the various content provided by the service
              providers such as governement, non-goverment agencies, support
              groups, universities, volunteers, etc, and allows you to access
              them with ease.
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" justify-md="start" class="my-8">
        <v-col cols="12" md="6" offset-md="1" order="2" order-md="1">
          <div class="pa-5">
            <span class="text-h5 font-weight-semibold primary--text"
              >Data Privacy and Credibility</span
            >
            <p class="text-body-2 my-3">
              As part of our efforts, the platform aims to provide credible
              information as the service providers undergo several security
              process before they proceed.
              <span class="font-weight-medium">
                Data privacy is also one of the priorites of our this platform,
                so don't worry and look what we can offer.
              </span>
            </p>
          </div>
        </v-col>
        <v-col cols="5" md="5" lg="4" xl="3" offset-xl="1" order="1">
          <v-img :src="require('@/assets/img/security.svg')" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.banner-color {
  background-color: #9921e8;
  background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
}
</style>
