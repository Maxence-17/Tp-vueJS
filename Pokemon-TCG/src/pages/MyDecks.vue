<template>
    <div>
        <router-link to="/deck/deck-form" @click="updateTitle('Deck Form')">
            <button class="buton-page">Créer un nouveau deck</button>
        </router-link>

        <!--<DeckForm v-if="showCreateForm" @deck-created="onDeckCreated" @cancel="showCreateForm = false" />-->

        <div class="decks-list">
            <div class="deck" v-for="deck in decks" :key="deck.id" @click="goToDeck(deck.id)">
                <h3>{{ deck.name }}</h3>
                <p>Créé par : Utilisateur {{ deck.idUser }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '../services/ApiService';
import { useRouter } from 'vue-router';

const decks = ref([]);
const showCreateForm = ref(false);
const emit = defineEmits(['update-title']);
const router = useRouter();

function updateTitle(label) {
    emit('update-title', label);
}

onMounted(fetchDecks);

async function fetchDecks() {
    const response = await ApiService.get('https://67b8eac151192bd378dc35a6.mockapi.io/decks');
    decks.value = response.data;
}

function onDeckCreated() {
    showCreateForm.value = false;
    fetchDecks();
}

function goToDeck(deckId) {
    router.push(`/deck/${deckId}`);
}
</script>

<style scoped>

</style>
