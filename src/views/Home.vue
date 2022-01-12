<template>
    <transition name="slide-fade">
        <Searcher class="mt-14" v-if="showWeather"/>
    </transition>
    <transition name="slide-fade">
        <ResultsSearcher v-if="showWeather"/>
    </transition>
    <transition name="slide-fade">
        <PlaceDetails />
    </transition>
     <transition name="slide-fade">
        <AlertWarning v-if="error" />
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import PlaceDetails from '../components/PlaceDetails.vue';
import ResultsSearcher from "../components/ResultsSearcher.vue";
import Searcher from '../components/Searcher.vue';
import AlertWarning from '../components/UI/AlertWarning.vue';

export default {
    components: { ResultsSearcher, PlaceDetails, Searcher, AlertWarning },

    computed:{
        ...mapGetters(['weather']),
        ...mapGetters('UserPlaces',['error']),
        showWeather(){
            return Object.keys(this.weather).length > 0 ? false : true
        }
    }
}
</script>
        