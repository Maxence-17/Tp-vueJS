<script setup>
import { ref, onMounted } from 'vue';
import LocalStorageService from '../services/LocalStorageService';
import { useRouter } from 'vue-router';
import ApiService from '../services/ApiService';
import CardCart from '../components/SelectableCard.vue';

const name = ref('');
const allCards = ref([]); // toutes les cartes
const cards = ref([]); // cartes filtrées
const selectedCards = ref([]); // cartes sélectionnées
const searchQuery = ref('');
const errorMessage = ref('');

const router = useRouter();
const emit = defineEmits(['deck-created', 'cancel','update-title']);

function updateTitle(label) {
    emit('update-title', label);
}

function loadCards() {
    const stored = LocalStorageService.get('boosterCards') || [];
    allCards.value = stored;
    cards.value = stored;
}

function filterCards() {
    const query = searchQuery.value.toLowerCase();
    cards.value = allCards.value.filter(card =>
        card.name.toLowerCase().includes(query) || card.id.toString().includes(query)
    );
}

function handleCardClick(uniqueKey) {
      toggleCardSelection(uniqueKey);
}
  
function toggleCardSelection(uniqueKey) {
  if (selectedCards.value.includes(uniqueKey)) {
    selectedCards.value = selectedCards.value.filter(key => key !== uniqueKey);
  } else {
    selectedCards.value.push(uniqueKey);
  }
}

async function createDeck() {
    errorMessage.value = '';

    if (!name.value || selectedCards.value.length === 0) {
        errorMessage.value = 'Veuillez donner un nom et sélectionner au moins une carte.';
        return;
    }

    const newDeck = {
        name: name.value,
        idUser: Math.floor(Math.random() * 10) + 1,
        cards: selectedCards.value.map(key => {
            const card = allCards.value.find((c, i) => `${c.id}-${i}` === key);
            return card?.id;
        }).filter(Boolean)
    };
    console.log("Deck à créer :", newDeck);
    

    await ApiService.post('https://67b8eac151192bd378dc35a6.mockapi.io/decks', newDeck);
    router.push(`/my-decks`);
    //emit('deck-created');
}
onMounted(loadCards);
</script>

<template>
    <div>
        <h3 id="h3">Créer un nouveau deck</h3>
        <input v-model="name" placeholder="Nom du deck" />

        <input v-model="searchQuery" @input="filterCards" placeholder="Rechercher une carte..." />

        <p id="nbCartes">{{ selectedCards.length }} carte(s) sélectionnée(s)</p>

        <div class="cards-grid">
            <CardCart
                v-for="(card, i) in cards"
                :key="`${card.id}-${i}`"
                :unique-key="`${card.id}-${i}`"
                :id="card.id"
                :name="card.name"
                :image="card.image"
                :selectionMode="true"
                :selectedCards="selectedCards"
                @card-click="handleCardClick"
            />
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <div class="buttons">
            <button @click="createDeck">Créer le deck</button>
            
            <RouterLink to="/my-decks" @click="updateTitle('My Decks')">
                <button>Annuler</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/styles.css';

.deck-form {
    background: #444;
    padding: 15px;
    border-radius: 8px;
    color: white;
    margin: 10px 0;
}

.error {
  color: red;
  margin: 10px 0;
}

#h3 {
    margin-left: 10px;
}

#nbCartes {
    margin-left: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 150px;
    overflow-y: auto;
    background: #333;
    border: 1px solid #fff;
}

li {
    padding: 5px;
    cursor: pointer;
    border-bottom: 1px solid #555;
}

li:hover {
    background: #555;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

input {
  background-color: #222;
  border: 1px solid #555;
  color: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 20%;
  font-size: 14px;
  transition: border 0.3s, box-shadow 0.3s;
  margin-left: 20px;
}

input:focus {
  outline: none;
  border-color: #09f;
  box-shadow: 0 0 5px rgba(0, 153, 255, 0.5);
}
</style>