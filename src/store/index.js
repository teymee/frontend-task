import {configureStore} from '@reduxjs/toolkit' 
import TemplateSlice from './template-slice';

const store = configureStore({
      reducer: {template: TemplateSlice.reducer},
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            immutableCheck: { warnAfter: 400 },
            serializableCheck: { warnAfter: 400 },
          })
     
})

export default store;