import {configureStore} from '@reduxjs/toolkit' 
import TemplateSlice from './template-slice';

const store = configureStore({
      reducer: {template: TemplateSlice.reducer},
     
})

export default store;