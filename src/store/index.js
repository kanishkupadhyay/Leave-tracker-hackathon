import { configureStore } from '@reduxjs/toolkit'
import ui from './reducers/ui'
export const store = configureStore({
  reducer: {
      ui
  },
})