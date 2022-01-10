<template>
    <div v-if="validateWeather" class="mt-10">
        <section class="flex flex-col text-center pl-2">
            <span class="text-3xl font-bold p-1">{{placeName}} ( {{weather.sys.country}} )</span>
            <span class="text-sm opacity-60 p-1">{{showDate}}</span>
        </section>
        
        <div class="flex items-center justify-center m-2">
            <img :src="showIcon" class="" alt="icon imagen temp">
            <h3 class="text-center opacity-70 text-lg font-bold">{{weather.weather[0].main}}</h3>
        </div>
        <section>
            <h6 class="text-center text-7xl opacity-70 font-bold" >{{weather.main.temp}}º</h6>
        </section>
        <section class="flex justify-center mb-4">
            <Span :text="'Min ' + weather.main.temp_min+ 'º'"/>
            <Span text="|"/>
            <Span :text="'Max ' + weather.main.temp_max+ 'º'"/>
        </section>

        <hr class="w-7/12 p-4 m-auto opacity-10 border-black">

        <section class="flex flex-col lg:justify-center lg:flex-row">
            <section class="text-center mb-4">
                <Span :text="'Speed ' +weather.wind.speed"/> <i class='bx bx-wind bx-sm opacity-70'></i>
            </section>
            <section class="text-center mb-4">
                <Span :text="'Humidity '+weather.main.humidity+ ' %'"/> <i class='bx bx-water bx-sm opacity-70'></i>  
            </section>
            <section class="text-center ">
                <Span :text="'Cloudiness '+weather.clouds.all+ ' %'"/> <i class='bx bxs-cloud bx-sm opacity-70'></i>  
            </section>
        </section>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Span from './Span.vue'
export default {
    components: { Span },

    computed: {
        ...mapGetters(["weather", "placeName","time"]),
        validateWeather() {
            return Object.keys(this.weather).length > 0 ? true : false;
        },
        showIcon() {
            return `http://openweathermap.org/img/w/${this.weather.weather[0].icon}.png`;
        },

        showDate(){
            const datePlace = new Date(this.time.formatted)

            const year = datePlace.getFullYear()
            const month = datePlace.getMonth()+1
            const day = datePlace.getDate()

            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const hour = datePlace.getHours()
            const minutes = datePlace.getMinutes()
            const dayName = days[datePlace.getDay()]

            return `${dayName} ${day}/${month}/${year} - ${hour}:${minutes} `
        }
    },
}
</script>