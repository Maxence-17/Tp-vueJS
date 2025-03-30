<template>
    <div>
        <button @click="goBack" class="buton-page">Retour</button>

        <h2>{{ deck?.name }}</h2>
        <p>Créé par Utilisateur {{ deck?.idUser }}</p>

        <div class="cards-grid">
            <div
                v-for="card in cards"
                :key="card.id"
                class="card"
                @click="goToCardDetail(card.id)"
>
                <img :src="card.image" :alt="card.name" />
                <p>{{ card.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ApiService from '../services/ApiService';
import CardService from '../services/CardService';

const deck = ref(null);
const cards = ref([]);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
    const response = await ApiService.get(`https://67b8eac151192bd378dc35a6.mockapi.io/decks/${route.params.id}`);
    deck.value = response.data;

    const cardPromises = deck.value.cards.map(id => CardService.getCardDetails(id));
    cards.value = await Promise.all(cardPromises);
    for (const card of cards.value) {
        if (card.image === 'undefined/high.webp' || !card.image) {
            card.image = '/back.png';
        }
    }
});

function goBack() {
    router.back();
}

function goToCardDetail(cardId) {
    router.push(`/card/${cardId}`);
}
</script>

<style scoped>

.cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 15px;
}

.card {
    background: #333;
    border: 1px solid white;
    padding: 10px;
    text-align: center;
    color: white;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.card:hover {
    transform: scale(1.05);
}

.card img {
    width: 100%;
    height: auto;
}
</style>
