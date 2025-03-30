import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

interface List {
    _id: string;
    name: string;
}

interface ListState {
    lists: List[];
    loading: boolean;
    error: string | null;
}

const initialState: ListState = {
    lists: [],
    loading: false,
    error: null
}

export const fetchLists = createAsyncThunk<List[]>("lists/fetchLists", async () => {
    const response = await axios.get('http://localhost:5000/lists')
    return response.data
})

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchLists.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLists.fulfilled, (state, action) => {
                state.lists = action.payload
                state.loading = false
            })
            .addCase(fetchLists.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'failed to fetch lists'
            })
    }
})

export default listsSlice.reducer;