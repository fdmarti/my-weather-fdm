<template>
    <transition name="slide-fade">
        <i class='bx bx-arrow-back bx-sm pt-4 pl-3' v-if="!showWeather" @click="clearSearch"></i>
    </transition>
    <transition name="slide-fade">
        <Searcher class="mt-14" v-if="showWeather"/>
    </transition>
    <transition name="slide-fade">
        <ResultsSearcher v-if="showWeather"/>
    </transition>
    <transition name="slide-fade">
        <PlaceDetails />
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import PlaceDetails from '../components/PlaceDetails.vue';
import ResultsSearcher from "../components/ResultsSearcher.vue";
import Searcher from '../components/Searcher.vue';
import store from '../store';

export default {
    components: { ResultsSearcher, PlaceDetails, Searcher },

    setup(){
        const clearSearch = () => store.dispatch('cleanWeather')

        return {
            clearSearch
        }
    },

    computed:{
        ...mapGetters(['weather']),
        showWeather(){
            return Object.keys(this.weather).length > 0 ? false : true
        }
    }
}
</script>
        