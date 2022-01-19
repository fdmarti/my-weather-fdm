<template>
      <div class="fixed z-20 right-0 bg-slate-800  text-white bg-opacity-90 top-0 bottom-0 w-auto md:w-96 xl:right-48">
        <ul class="flex flex-col py-20 px-10 gap-y-2">
            <li v-if="Object.keys(weather).length > 0" class="m-auto mb-3">
                <button class="p-3 border-none bg-gray-300 text-black rounded-md flex items-center uppercase" @click="addPlaceToFav(weather,placeName)"> <i class='bx bxs-folder-plus mr-3'></i> Save this location</button>
            </li>
            <li><hr class="m-auto opacity-60 border-zinc-500"></li>
                <li v-if="places.length === 0"> You don't have any fav places </li>
                <li></li>
                <li v-for="place in places" :key="place.id" class="my-1 flex justify-between items-center">
                    <span @click="loadPlaceByUser(place)" class="cursor-pointer"> {{place.nombre}} </span>
                    <i class='bx bxs-trash-alt ml-10 cursor-pointer' @click="removePlace(place)"></i>
                </li>
        </ul>
      </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'
export default {
    setup(){
        const addPlaceToFav = (weather, placeName) => {
            weather.nombre = placeName
            store.dispatch('UserPlaces/addToFav',weather)
        }

        const removePlace = ( place ) => store.dispatch('UserPlaces/removePlaceFav',place)

        const loadPlaceByUser = ( place ) => store.dispatch('setWeatherByUser',place)
        
        return {
            addPlaceToFav,
            removePlace,
            loadPlaceByUser
        }
    },
    computed:{
        ...mapGetters(['weather','placeName']),
        ...mapGetters('UserPlaces',['places'])

    }
}
</script>