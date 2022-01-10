import { createStore } from 'vuex'

export default createStore({
    state:{
        API_TOKEN_MAP: 'pk.eyJ1IjoiZmRtYXJ0aW5lejQ0IiwiYSI6ImNreTgybnZ1MzFiaGgybnF2dmdjMHRvdjIifQ.xOkux0uzO_x9BYBZFvjp_A',
        API_TOKEN_WEATHER : '51a165587f53ec24e5ecdd22b7fff4c2',
        API_TIME_ZONE: 'PG9KG1B7YM2Z',
        placeSelected : '',
        placeTime: [],
        places:[],
        weather : {}
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
        async getPlaces({commit,state},lugar){
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=${state.API_TOKEN_MAP}&language=en`)
            .then(response => response.json())
            .then(data => commit('setPlaces',data.features))
        },

        cleanPlaces({commit}){
            commit('clearPlaces')
        },

        async getWeather({commit,state},location){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.center[1]}&lon=${location.center[0]}&appid=${state.API_TOKEN_WEATHER}&units=metric`)
            .then(response => response.json())
            .then(data => {
                commit('setWeather',data)
                commit('setPlaceSelected',location.place_name)
                commit('clearPlaces')
            })
        },

        async getCurrentTimeLocation({commit,state},location){
            await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${state.API_TIME_ZONE}&format=json&by=position&lat=${location.center[1]}&lng=${location.center[0]}`)
            .then(response => response.json())
            .then(data => commit('setPlaceTime',data))
        },

        cleanWeather({commit}){
            commit('clearWeather')
            commit('setPlaceSelected','')
        },
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
    }
})