<template>
    <div>
      <button class="buton-page" @click="clearBoosterCards">Vider la collection</button>
      <button class="buton-page" @click="toggleSelectionMode">
        {{ selectionMode ? "Annuler echange" : "Mode Echange" }}
      </button>
  
      <div class="cards-grid">
        <CardCart
          v-for="(card, i) in cards"
          :key="`${card.id}-${i}`"
          :unique-key="`${card.id}-${i}`"
          :id="card.id"
          :name="card.name"
          :image="card.image"
          :selectionMode="selectionMode"
          :selectedCards="selectedCards"
          @card-click="handleCardClick"
        />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  
      <button
        v-if="selectionMode && selectedCards.length === 4"
        class="buton-page"
        @click="tradeCards"
      >
        Échanger (4/4)
      </button>
  
      <p v-if="cards.length === 0">Aucune carte obtenue.</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import LocalStorageService from '../services/LocalStorageService';
  import CardCart from '../components/SelectableCard.vue';
  import CardService from '../services/CardService';
  
  const cards = ref([]);
  const selectionMode = ref(false);
  const selectedCards = ref([]);
  const router = useRouter();
  const errorMessage = ref('');
  
  function loadCards() {
    // Charge les cartes stockées sans les modifier
    cards.value = LocalStorageService.get('boosterCards') || [];
  }
  
  function clearBoosterCards() {
    LocalStorageService.clear('boosterCards');
    loadCards();
  }
  
  function toggleSelectionMode() {
    selectionMode.value = !selectionMode.value;
    selectedCards.value = [];
  }
  
  function handleCardClick(uniqueKey) {
    if (selectionMode.value) {
      toggleCardSelection(uniqueKey);
    } else {
      // Recherche la carte en comparant l'index
      const cardIndex = cards.value.findIndex((card, i) => `${card.id}-${i}` === uniqueKey);
      if (cardIndex !== -1) {
        router.push(`/card/${cards.value[cardIndex].id}`);
      }
    }
  }
  
  function toggleCardSelection(uniqueKey) {
    if (selectedCards.value.includes(uniqueKey)) {
      selectedCards.value = selectedCards.value.filter(key => key !== uniqueKey);
    } else if (selectedCards.value.length < 4) {
      selectedCards.value.push(uniqueKey);
    }
  }
  
  async function tradeCards() {
    errorMessage.value = '';

    if (selectedCards.value.length !== 4) {
      errorMessage.value = "Vous devez sélectionner exactement 4 cartes pour échanger.";
      return;
    }
  
    // Supprime les cartes sélectionnées en utilisant l'identifiant éphémère
    const updatedCards = [];
    cards.value.forEach((card, i) => {
      const key = `${card.id}-${i}`;
      if (!selectedCards.value.includes(key)) {
        updatedCards.push(card);
      }
    });
    LocalStorageService.save('boosterCards', updatedCards);
    cards.value = updatedCards;
  
    // Obtenir une carte aléatoire depuis l'API (limité à 100 pour la performance)
    const allCards = await CardService.getAllCards({ limit: 100 });
    const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
  
    // On ajoute la nouvelle carte sans modifier l'objet original
    updatedCards.push(randomCard);
    LocalStorageService.save('boosterCards', updatedCards);
    cards.value = updatedCards;
  
    // Quitte le mode sélection
    selectionMode.value = false;
    selectedCards.value = [];
  }
  
  onMounted(loadCards);
  </script>
  
  <style scoped>
  @import '../assets/styles.css';

  .error {
  color: red;
  margin: 10px 0;
  }
  </style>
  