<template>
    <div>
        <Navbar @update-title="setPageTitle" />
        <h1>{{ pageTitle }}</h1>
        <RouterView @update-title="setPageTitle" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';

const pageTitle = ref('Accueil');

function setPageTitle(title) {
    pageTitle.value = title;
}
</script>

<style>
@import './assets/styles.css';
</style>
