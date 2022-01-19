import { createStore } from 'vuex'
import UserPlaces from '../modules/UserPlaces'

export default createStore({
    state:{
        placeSelected : '',
        placeTime: [],
        places:[],
        weather : {},
    },
    mutations:{
        setPlaces(state,payload){
            state.places = payload
        },
        setWeather(state,payload){
            state.weather = payload
        },
        setPlaceSelected(state,payload){
            state.placeSelected = payload
        },
        setPlaceTime(state,payload){
            state.placeTime = payload
        },
        clearPlaces(state){
            state.places = []
        },
        clearWeather(state){
            state.weather = {}
        },
        clearPlaceSelected(state){
            state.placeSelected = ''
        },
    },
    actions:{
        async getPlaces({commit},lugar){
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=${import.meta.env.VITE_API_TOKEN_MAP}&language=en`)
            .then(response => response.json())
            .then(data => commit('setPlaces',data.features))
        },

        cleanPlaces({commit}){
            commit('clearPlaces')
        },

        async getWeather({commit,state},location){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.center[1]}&lon=${location.center[0]}&appid=${import.meta.env.VITE_API_TOKEN_WEATHER}&units=metric`)
            .then(response => response.json())
            .then(data => {
                commit('setWeather',data)
                if ( !state.placeSelected ){
                    commit('setPlaceSelected',location.place_name)
                }
                commit('clearPlaces')
            })
        },

        async getCurrentTimeLocation({commit},location){
            await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${import.meta.env.VITE_API_TIME_ZONE}&format=json&by=position&lat=${location[1]}&lng=${location[0]}`)
            .then(response => response.json())
            .then(data => commit('setPlaceTime',data))
        },

        cleanWeather({commit}){
            commit('clearWeather')
            commit('setPlaceSelected','')
        },

        setWeatherByUser({commit,dispatch},place){
            commit('setPlaceSelected',place.nombre)
            const coord = {
                center : [place.coord.lon, place.coord.lat]
            }
            const coordTime = { 0: place.coord.lon, 1: place.coord.lat }
            dispatch('getWeather',coord)
            dispatch('getCurrentTimeLocation',coordTime)
        }
    },
    getters:{
        places(state){
            return state.places
        },
        weather(state){
            return state.weather
        },
        placeName(state){
            return state.placeSelected
        },
        time(state){
            return state.placeTime
        }
    },

    modules:{
        UserPlaces
    }
})