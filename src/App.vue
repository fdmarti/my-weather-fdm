<template>
    <div class="container mx-auto min-h-screen bg-blue-300 flex flex-col items-center">
        <Searcher class="mt-14"/>
        <Home />
    </div>
</template>

<script>
import Home from "./views/Home.vue";
import Searcher from "./components/Searcher.vue";
export default {
    components: { Home, Searcher }
}
</script>