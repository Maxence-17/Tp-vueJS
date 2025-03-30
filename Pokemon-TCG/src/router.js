import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import AllCards from './pages/AllCards.vue';
import MyDecks from './pages/MyDecks.vue';
import OpenBooster from './pages/OpenBooster.vue';
import CardDetail from './pages/CardDetail.vue';
import DeckDetail from './pages/DeckDetail.vue';
import DeckCreate from './pages/DeckCreate.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/all-cards', component: AllCards },
        { path: '/my-decks', component: MyDecks },
        { path: '/open-booster', component: OpenBooster },
        { path: '/card/:id', component: CardDetail },
        { path: '/deck/:id', component: DeckDetail },
        { path: '/deck/deck-form', component: DeckCreate}
    ]
});
