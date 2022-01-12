<template>
    <div class="container m-auto min-h-screen bg-gradient-to-r from-cyan-500 to-blue-300 flex flex-col">
        <Navbar />
        <Home />
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Home from "./views/Home.vue";
export default {
    components: { Home, Navbar }
}
</script>