import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchShows from './pages/SearchShows';
import SavedShows from './pages/SavedShows';
import Navbar from './components/Navbar';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Because we're not using the first parameter, but we still need to access 
// the second one, we can use an underscore _ to serve as a placeholder for the first parameter.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={<SearchShows />}
            />
            <Route
              path='/saved'
              element={<SavedShows />}
            />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
