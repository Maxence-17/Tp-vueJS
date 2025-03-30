<template>
  <div>
    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Rechercher une carte..." 
      />
      <select v-model="pageSize" class="cards-per-page-selector">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="all">Toutes</option>
      </select>
    </div>

    <div class="cards-grid">
      <CardCart
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :image="card.image"
        @click="selectCard(card)"
      />
    </div>

    <div class="pagination" v-if="pageSize !== 'all'">
      <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CardService from '../services/CardService';
import CardCart from '../components/CardCart.vue';

const DEFAULT_MAX_CARDS = 100;

const cards = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const searchTerm = ref('');

const storedPageSize = localStorage.getItem('pageSize');
const pageSize = ref(storedPageSize ? storedPageSize : '10');

async function fetchCards() {
  let limit;
  if (pageSize.value === 'all') {
    limit = DEFAULT_MAX_CARDS;
  } else {
    limit = parseInt(pageSize.value);
  }
  
  // On passe également le terme de recherche dans l'appel à l'API
  const fetchedCards = await CardService.getAllCards({ 
    page: currentPage.value, 
    limit, 
    search: searchTerm.value 
  });
  cards.value = fetchedCards;
  
  if (pageSize.value === 'all') {
    totalPages.value = 1;
    currentPage.value = 1;
  } else {
    totalPages.value = Math.ceil(DEFAULT_MAX_CARDS / limit);
  }
}

onMounted(fetchCards);

watch(searchTerm, () => {
  currentPage.value = 1;
  fetchCards();
});

watch(pageSize, (newVal) => {
  localStorage.setItem('pageSize', newVal);
  currentPage.value = 1;
  fetchCards();
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchCards();
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCards();
  }
}

async function selectCard(card) {
  console.log('Carte sélectionnée :', card);
}
</script>

<style scoped>
@import '../assets/styles.css';
</style>
