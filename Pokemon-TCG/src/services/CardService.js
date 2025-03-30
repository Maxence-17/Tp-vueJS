import ApiService from './ApiService';

function buildImageUrl(baseUrl, quality = 'high', extension = 'webp') {
    return `${baseUrl}/${quality}.${extension}`;
}

const CardService = {
    async getAllCards({ page = 1, limit = 10 } = {}) {
        const url = `https://api.tcgdex.net/v2/fr/cards?pagination:page=${page}&pagination:itemsPerPage=${limit}`;
        const response = await ApiService.get(url);
        return response.data.map(card => ({
          id: card.id,
          name: card.name,
          image: card.image ? buildImageUrl(card.image, 'low', 'webp') : "/back.png"
        }));
      },

    async getCardDetails(id) {
        const response = await ApiService.get(`https://api.tcgdex.net/v2/fr/cards/${id}`);
        return {
            id: response.data.id,
            name: response.data.name,
            types: response.data.types,
            image: buildImageUrl(response.data.image, 'high', 'webp')
        };
    },

    async searchCardsByName(query) {
        const lowerQuery = query.toLowerCase();
        const url = `https://api.tcgdex.net/v2/fr/cards?name=${encodeURIComponent(lowerQuery)}`;
        const response = await ApiService.get(url);
        return response.data.map(card => ({
            id: card.id,
            name: card.name
        }));
    },    

    async getCardSummary(id) {
        const response = await ApiService.get(`https://api.tcgdex.net/v2/fr/cards/${id}`);
        return {
            id: response.data.id,
            name: response.data.name
        };
    }
};

export default CardService;
