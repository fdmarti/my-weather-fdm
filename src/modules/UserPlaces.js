export default {
    namespaced: true,

    state : {
        places : [],
        errorMessage : false
    },

    mutations:{
        getPLaces ( state,payload ){
            state.places = payload
        },

        addPlace(state,payload){
            state.places.push(payload)
        },

        removePlace ( state, payload ){

        },

        setErrorMessage(state,payload){
            state.errorMessage = payload
        }
    },

    actions:{
        getPlaces({commit,state}){
            const places = localStorage.getItem('places')
            if ( places ){
                commit('getPLaces',JSON.parse(places))
            }else{
                commit('getPLaces',[])
            }
        },
        addToFav({commit},place){

            const { id , nombre, coord, ...rest } = place
            const location = { id , nombre, coord }

            const places = localStorage.getItem('places')

            if ( places ){
                const arrPlaces = JSON.parse(places)

                const isAPlace = arrPlaces.some( el => (el.coord.lon === place.coord.lon) && (el.coord.lat === place.coord.lat))
                
                if( isAPlace ){
                    commit('setErrorMessage',true);

                    setTimeout(() => {
                        commit('setErrorMessage',false);
                    }, 3000);

                }else{
                    arrPlaces.push({
                        id,
                        nombre,
                        coord
                    })
                    localStorage.setItem('places',JSON.stringify(arrPlaces))
                    commit('addPlace',location)
                }
            }else{
                localStorage.setItem('places',JSON.stringify([location]))
                commit('addPlace',location)
            }
        },

        removePlaceFav({commit,state},place){
            const placesFilters =  state.places.findIndex( el => el.id === place.id)
            state.places.splice(placesFilters, 1);
            localStorage.setItem('places',JSON.stringify(state.places))
        }
    },

    getters:{
        places ( state ){
            return state.places
        },

        error( state ){
            return state.errorMessage
        }
    }
}