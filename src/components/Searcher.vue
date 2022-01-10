<template>
    <input type="text" v-model="place" class="p-4 rounded-xl mx-auto w-5/6 outline-none opacity-40" @keyup="searchPlace" placeholder="Type your city">
</template>

<script>
import { ref } from '@vue/reactivity'
import store from '../store'
import ResultsSearcher from './ResultsSearcher.vue'
export default {
    components: {ResultsSearcher},
    setup(){
        const place = ref('')

        const searchPlace = () => {
            if( place.value ) {
                store.dispatch('getPlaces',place.value)
            }else{
                store.dispatch('cleanPlaces')
            }
        }

        return {
            searchPlace,
            place
        }
    },

}
</script>