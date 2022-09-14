import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@codiga/components';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

// PAGES
import Home from './pages/Home';
import FavoriteCookbooks from './pages/FavoriteCookbooks';
import FavoriteSnippets from './pages/FavoriteSnippets';
import MyCookbooks from './pages/MyCookbooks';
import MySnippets from './pages/MySnippets';
import TeamCookbooks from './pages/TeamCookbooks';
import TeamSnippets from './pages/TeamSnippets';
import ViewSnippet from './pages/ViewSnippet';
import ViewCookbookSnippets from './pages/ViewCookbookSnippets';

// STYLES
import './styles/reboot.css';
import './styles/fonts.css';
import './styles/app.css';

// OTHER
import client from './graphql/client';
import { rollbarConfig } from './lib/rollbar';
import Layout from './components/Layout';
import Filters from './components/Filters/Filters';
import { UserProvider } from './components/UserContext';
import { ThemeProvider } from './components/ThemeContext';
import { FiltersProvider } from './components/FiltersContext';

export default function App() {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <ApolloProvider client={client}>
          <ColorModeScript initialColorMode="system" />
          <ChakraProvider theme={theme}>
            <UserProvider>
              <ThemeProvider>
                <FiltersProvider>
                  <Router>
                    <Layout>
                      <Routes>
                        <Route element={<Filters />}>
                          <Route path="/" element={<Home />} />
                          <Route path="/my-snippets" element={<MySnippets />} />
                          <Route
                            path="/favorite-snippets"
                            element={<FavoriteSnippets />}
                          />
                          <Route
                            path="/my-cookbooks"
                            element={<MyCookbooks />}
                          />
                          <Route
                            path="/favorite-cookbooks"
                            element={<FavoriteCookbooks />}
                          />
                          <Route
                            path="/team-snippets"
                            element={<TeamSnippets />}
                          />
                          <Route
                            path="/team-cookbooks"
                            element={<TeamCookbooks />}
                          />
                        </Route>

                        <Route
                          path="/view-snippet/:snippetId"
                          element={<ViewSnippet />}
                        />
                        <Route
                          path="/view-cookbook/:cookbookId"
                          element={<ViewCookbookSnippets />}
                        />
                      </Routes>
                    </Layout>
                  </Router>
                </FiltersProvider>
              </ThemeProvider>
            </UserProvider>
          </ChakraProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
}
