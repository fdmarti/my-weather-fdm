import { createStore } from 'vuex'

export default createStore({
    state:{
        API_TOKEN: 'pk.eyJ1IjoiZmRtYXJ0aW5lejQ0IiwiYSI6ImNreTgybnZ1MzFiaGgybnF2dmdjMHRvdjIifQ.xOkux0uzO_x9BYBZFvjp_A',
        places:[]
    },
    mutations:{
        setPlaces(state,payload){
            state.places = payload
        },
        deletePlaces(state){
            state.places = []
        }
    },
    actions:{
        async getPlaces({commit,state},lugar){
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=${state.API_TOKEN}&language=en`)
            .then(response => response.json())
            .then(data => commit('setPlaces',data.features))
        },

        cleanPlaces({commit}){
            commit('deletePlaces')
        }
    },
    getters:{
        places(state){
            return state.places
        }
    }
})