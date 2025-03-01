import ReactDOM from 'react-dom/client';

import './tailwind.css';
import './variables.css';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';
import { ConfigProvider } from 'antd';

import store from "./redux/store";
import { Provider } from 'react-redux';
import { Loading } from './components/loading';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider theme={{ cssVar: true, hashed: false }}>
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <Loading />
    </Provider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
