import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { isMobileAction } from './action';

export interface UiState {
  isMobile: boolean
}

const initialState: UiState = {
  isMobile: false
}


function buildIsMobileReducer(builder: ActionReducerMapBuilder<UiState>){
  builder.addCase(isMobileAction, (state: UiState, action) => {
    state.isMobile = action?.payload?.isMobile
    return state
  })
}



export const uiSlice = createSlice({
  name: 'ui',
  initialState,
 reducers: {},
 extraReducers: (builder) => {
  buildIsMobileReducer(builder);

 
 }
})

export const uiReducer = uiSlice.reducer;