<template>
    <div>
        <transition-group name="list">
        <ul v-if="places.length" class="mt-2">
            <li class="px-9 py-3 m-1 cursor-pointer mx-auto w-5/6 bg-gray-200 rounded-md" v-for="country in places" :key="country.id" @click="getPlacesByLocation(country)">
            <span>{{ country.place_name }}</span>
            </li>
        </ul>
        </transition-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'
export default {
    setup(){

        const getPlacesByLocation = (country) => {
            if ( country ) {
                store.dispatch('getWeather',country)
                store.dispatch('getCurrentTimeLocation',country.center)
            }
        }

        return {
            getPlacesByLocation
        }

    },

    computed:{
        ...mapGetters(['places'])
    }

}
</script>