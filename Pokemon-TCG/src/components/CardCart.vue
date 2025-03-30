<template>
    <RouterLink :to="`/card/${id}`">
    <div class="card">
        <img :src="image" :alt="name" />
        <h3>{{ name }}</h3>
    </div>
    </RouterLink>
</template>

<script setup>
defineProps({
    id: String,
    name: String,
    image: String
});
</script>

<style scoped>
.card {
    background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
    border: 2px solid gold;
    border-radius: 12px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: scale(1.1); /* Toute la carte grossit */
    box-shadow: 0 10px 30px rgba(253, 216, 53, 0.6);
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
