<template>
    <div class="flex justify-between p-1 z-50">
        <i class='bx bxs-chevron-left bx-md p-2 opacity-60' v-if="!showWeather" @click="clearSearch"></i>
        <i v-else></i>
        <i class='bx bx-menu bx-md p-2 z-50 opacity-60' v-if="!showNavbar" @click="showNavBarMenu"></i>
        <i class='bx bx-x bx-md p-2 z-50 text-white opacity-80' v-else @click="showNavBarMenu"></i>

        <transition name="slide-fade">
            <NavbarMenu v-if="showNavbar"/>
        </transition>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { mapGetters } from 'vuex'
import NavbarMenu from './NavbarMenu.vue'
import store from '../store'

export default {
    setup() {
        const showNavbar = ref(false);
        const clearSearch = () => store.dispatch("cleanWeather");
        const showNavBarMenu = () => showNavbar.value = !showNavbar.value;

        const getPlacesByUser = () => store.dispatch('UserPlaces/getPlaces')
        getPlacesByUser();
        
        return {
            clearSearch,
            showNavbar,
            showNavBarMenu
        };
    },
    computed: {
        ...mapGetters(["weather"]),
        showWeather() {
            return Object.keys(this.weather).length > 0 ? false : true;
        }
    },
    components: { NavbarMenu }
}
</script>