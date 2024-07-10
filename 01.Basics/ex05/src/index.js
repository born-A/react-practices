import ReactDom from 'react-dom/client';
import {App} from './App.js';

// document
//     .getElementById('root')
//     .appendChild(App());

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(App());