import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name : "movies",
    initialState:{
        nowPlayingMovies: null,
        trailervideo : null,
    },  
    reducers :{
        addNowPlayingMovies : (state, action) =>
        {
            state.nowPlayingMovies = action.payload;
         },
         addTrailerVideo : (state, action) => {
            state.trailervideo = action.payload;
         },
    }
})

export const {addNowPlayingMovies, addTrailerVideo} = movieSlice.actions;
export default movieSlice.reducer;