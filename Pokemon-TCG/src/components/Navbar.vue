<template>
    <nav>
        <div class="menu-icon" @click="toggleMenu" v-if="isMobile">
            &#9776;
        </div>
        <ul :class="{ 'mobile-menu': isMobile, 'active': isMenuOpen }">
            <li v-for="link in links" :key="link.path">
                <router-link :to="link.path" @click="updateTitle(link.label)">
                    {{ link.label }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { getLinks } from '../services/LienService';

const links = getLinks();
const emit = defineEmits(['update-title']);
const isMenuOpen = ref(false);
const isMobile = ref(false);

function updateTitle(label) {
    emit('update-title', label);
    if (isMobile.value) {
        isMenuOpen.value = false;
    }
}

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}

function checkScreenSize() {
    isMobile.value = window.innerWidth <= 768;
}

onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
});
</script>


<style scoped>
nav ul {
    list-style: none;
    display: flex;
    gap: 15px;
}

.menu-icon {
    display: none;
    font-size: 24px;
    cursor: pointer;
}

.mobile-menu {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.mobile-menu.active {
    display: flex;
}

@media (max-width: 768px) {
    nav ul {
        display: none;
    }

    .menu-icon {
        display: block;
    }

    .mobile-menu.active {
        display: flex;
    }
}
</style>

