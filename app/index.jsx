import './main.scss' ;

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Game from './components/game.jsx';

const app = document.getElementById('app');

render(<AppContainer component={Game} />, app);

// https://github.com/gaearon/redux-devtools/commit/64f58b7010a1b2a71ad16716eb37ac1031f93915#commitcomment-17141703
// You have to write this thing yourself. Upside: no more dreaded
// Error: locals[0] does not appear to be amoduleobject errors in
// server, test, and other environments!
if (module.hot) {
  module.hot.accept('./components/game.jsx', () => {
    render(
      <AppContainer
        component={require('./components/game.jsx').default} />,
      app);
  });
}
