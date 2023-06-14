// store.js

import { createStore } from 'redux';
import rootReducer  from './reducers/index.js';

//recibe el rootReducer como argumento y devuelve una instancia del almacén Redux
const store = createStore(rootReducer);


export default store;
