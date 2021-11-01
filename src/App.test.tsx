import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import {createMemoryHistory} from 'history'
import { BrowserRouter, Router  } from "react-router-dom";

test('Test Renders Application correctly === expect the root element has App class', () => {
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const appDivElement = container.querySelector(".App");
  if (appDivElement) {
    expect(appDivElement).toBeInTheDocument();
  } else {
    throw new Error('Can not find App class')
  }
});

test('Test Routing === Render Signin page ', () => {
  const history = createMemoryHistory()
  history.push('/');
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )

  expect(getByText(/Sign In/i)).toBeInTheDocument();
})

test('Test Routing === Render Card Registration page ', () => {
  const history = createMemoryHistory()
  history.push('/home')
  const { getByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )
  expect(getByText(/Welcome/i)).toBeInTheDocument();
})

test('Test Routing === Render About Page ', () => {
  const history = createMemoryHistory()
  history.push('/home')
  const { getByText, container } = render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  )

  const aboutMenuItem = container.querySelector(".about-menu-item");
  if (aboutMenuItem) {
    fireEvent.click(aboutMenuItem);
    expect(getByText(/technical assessment/i)).toBeInTheDocument();
  } else {
    throw new Error('Can not find Menu About Item');
  }
})



