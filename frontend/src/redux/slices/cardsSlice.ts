import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface Card {
    id: string;
    description: string;
    listId: string;
}

interface CardsState {
    cards: Card[],
    loading: boolean,
    error: string | null,
}

const initialState: CardsState = {
    cards: [],
    loading: false,
    error: null,
}

export const fetchCards = createAsyncThunk<Card[], string>("cards/fetchCards", async (listId: string) => {
    const response = await axios.get(`http://localhost:5000/cards/${listId}`)
    return response.data;
})

export const createCard = createAsyncThunk<Card, { listId: string; description: string }>('cards/createCard', async ({ listId, description }) => {
        const response = await axios.post(`http://localhost:5000/cards/${listId}`, { description });
        return response.data;
    }
);

export const deleteCard = createAsyncThunk<string, string>('cards/deleteCard', async (id: string) => {
    await axios.delete(`http://localhost:5000/cards/${id}`);
    return id;
});

export const moveCard = createAsyncThunk<Card, { cardId: string; targetListId: string }>(
    'cards/moveCard',
    async ({ cardId, targetListId }) => {
        const response = await axios.put(`http://localhost:5000/cards/${cardId}/move`, { targetListId });
        return response.data;
    }
);


const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.cards = [...state.cards, ...action.payload];
                state.loading = false;
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cards';
            })
            .addCase(createCard.fulfilled, (state, action) => {
                state.cards.push(action.payload);
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.cards = state.cards.filter((card) => card.id !== action.payload);
            })
            .addCase(moveCard.fulfilled, (state, action) => {
                const cardIndex = state.cards.findIndex((card) => card.id === action.payload.id);
                if (cardIndex !== -1) {
                    state.cards[cardIndex].listId = action.payload.listId;
                }
            });
    },
})


export default cardsSlice.reducer;