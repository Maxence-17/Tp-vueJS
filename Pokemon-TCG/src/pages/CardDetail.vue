<template>
  <div>
      <button @click="goBack" class="buton-page">Retour</button>

      <h2>{{ card?.name }}</h2>

      <div class="card-detail">
          <img :src="cardImage" :alt="card?.name" />
          <p v-if="card?.types">Types : {{ card.types.join(', ') }}</p>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CardService from '../services/CardService';

const card = ref(null);
const route = useRoute();
const router = useRouter();

const cardImage = computed(() => {
    if (card.value?.image === 'undefined/high.webp' || !card.value?.image) {
        return '/back.png';
    }
    return card.value.image;
});

onMounted(async () => {
    const cardId = route.params.id;
    try {
        card.value = await CardService.getCardDetails(cardId);
    } catch (error) {
        console.error('Erreur lors de la récupération de la carte', error);
        card.value = { name: 'Carte inconnue', types: [] };
    }
});

function goBack() {
    router.back();
}
</script>

<style scoped>

.card-detail {
  background-color: #333;
  color: white;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  margin-top: 10px;
}

.card-detail img {
  width: 100%;
  max-width: 300px;
  margin: 10px 0;
}

.card-detail p {
  margin: 5px 0;
}
</style>
