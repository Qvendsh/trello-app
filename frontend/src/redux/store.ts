import {configureStore} from "@reduxjs/toolkit";
import listsReducer from './slices/listsSlice';
import cardsReducer from './slices/cardsSlice';


const store = configureStore({
    reducer:{
        lists: listsReducer,
        cards: cardsReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;