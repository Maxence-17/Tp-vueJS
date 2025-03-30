<template>
  <div 
    class="card" 
    :class="{ selected: isSelected }" 
    @click="handleClick"
  >
    <img :src="image" :alt="name" />
    <h3>{{ name }}</h3>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  uniqueKey: {
    type: String,
    required: true
  },
  id: String,
  name: String,
  image: String,
  selectionMode: Boolean,
  selectedCards: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['card-click']);

const isSelected = computed(() => props.selectedCards.includes(props.uniqueKey));

function handleClick() {
  emit('card-click', props.uniqueKey);
}
</script>

<style scoped>
.card {
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  border: 2px solid gold;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
}

.card.selected {
  background: #a10000;
  border: 3px solid red;
  box-shadow: 0 0 12px red;
}

.card:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 30px rgba(253,216,53,0.6);
}

.card img {
  width: 100%;
  object-fit: contain;
  background: white;
  border-radius: 6px;
}

.card h3 {
  font-size: 14px;
  color: #fdd835;
  margin: 5px 0;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
