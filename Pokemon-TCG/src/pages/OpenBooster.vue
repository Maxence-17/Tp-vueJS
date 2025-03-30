<template>
    <div>

        <div class="cards-grid">
            <div
                class="card"
                v-for="booster in boosters"
                :key="booster.id"
                @click="openBooster(booster)"
            >
                <h3>{{ booster.name }}</h3>
            </div>
        </div>

        <!-- Popup avec la carte obtenue -->
        <div v-if="drawnCard" class="card-modal" @click="closeModal">
            <div class="modal-content" @click.stop>
                <h3>Carte obtenue !</h3>
                
                <div class="big-card-container">
                    <CardCart
                        :id="drawnCard.id"
                        :name="drawnCard.name"
                        :image="drawnCard.image"
                    />
                </div>

                <button @click="closeModal">Fermer</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApiService from '../services/ApiService';
import CardService from '../services/CardService';
import LocalStorageService from '../services/LocalStorageService';
import CardCart from '../components/CardCart.vue';

const boosters = ref([]);
const drawnCard = ref(null);

onMounted(async () => {
    const response = await ApiService.get('https://67b8eac151192bd378dc35a6.mockapi.io/boosters');
    boosters.value = response.data;
});

async function openBooster(booster) {
    if (booster.cards && booster.cards.length > 0) {
        const randomCardId = booster.cards[Math.floor(Math.random() * booster.cards.length)];

        try {
            const card = await CardService.getCardDetails(randomCardId);

            // Enregistrer dans le LocalStorage
            const storedCards = LocalStorageService.get('boosterCards') || [];
            storedCards.push({
                id: card.id,
                name: card.name,
                image: card.image
            });
            LocalStorageService.save('boosterCards', storedCards);

            // Afficher la carte tirée avec effet 3D
            drawnCard.value = card;
        } catch (error) {
            console.error("Erreur de récupération de la carte :", error);
        }
    } else {
        console.error("Ce booster ne contient aucune carte :", error);
    }
}

function closeModal() {
    drawnCard.value = null;
}
</script>

<style scoped>
@import '../assets/styles.css';

.card-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #222;
    padding: 20px;
    border: 2px solid gold;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 0 25px rgba(253, 216, 53, 0.8);
    animation: pop-in 0.3s ease-out;
}

.modal-content h3 {
    margin: 10px 0;
    color: gold;
}

.big-card-container {
    width: 300px;
    margin: 0 auto;
}

.modal-content button {
    background-color: #fdd835;
    color: #222;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
}

.modal-content button:hover {
    background-color: #ffeb3b;
}

@keyframes pop-in {
    from {
        transform: scale(0.5);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}
</style>
