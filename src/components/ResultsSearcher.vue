<template>
    <transition-group name="list">
    <ul v-if="places.length" class="mt-2">
        <li class="px-9 py-3 m-1 w-80 cursor-pointer bg-gray-200 rounded-md" v-for="country in places" :key="country.id" @click="getPlacesById(country)">
        <span>{{ country.place_name }}</span>
        </li>
    </ul>
    </transition-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    setup(){

        const getPlacesById = (country) => {
            console.log(country)
        }

        return {
            getPlacesById
        }

    },

    computed:{
        ...mapGetters(['places'])
    }

}
</script>