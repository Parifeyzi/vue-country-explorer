import { createRouter, createWebHistory } from "vue-router";
import CountryList from "../views/CountryList.vue";
import SingleCountry from "../views/SingleCountry.vue";

const routes = [
    {
        path: "/",
        name: "countries",
        component: CountryList,
    },
    {
        path: "/country/:countryName",
        name: "country",
        component: SingleCountry,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;