import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {apiListTicket} from '../apis/dsVeAPI';

export const ticket = createAsyncThunk(
    'tickets/ticketBooking',
    async (value) => {
        try {
            const data = await apiListTicket(value);
            return data.content;
        } catch (error) {
            throw error.response?.data?.content;
        }
    }
)

const initialState = {
    ticket: null,
    isLoading: false,
    error: null
}

const tictketsSlice = createSlice ({
    name : 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(ticket.pending, (state) => {
            return {...state, isLoading: true, error: null}
        });
        builder.addCase(ticket.fulfilled, (state, action) => {
            return {...state, isLoading: false, user: action.payload, error: null}
        });
        builder.addCase(ticket.rejected, (state, action) => {
            return {...state, isLoading: false, error: action.error.message}
        });
    }
})

export default tictketsSlice.reducer;