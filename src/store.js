import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/gameSlice'

export default configureStore({
  reducer: {
    gameReducer: gameReducer
  },
})