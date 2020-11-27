export default [
  {
    path: "",
    name: "Landing Page",
    component: () =>
      import(/* webpackChunkName: "homepage" */ "@/pages/LandingPage")
  }
];
