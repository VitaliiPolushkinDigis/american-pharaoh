import { Provider } from 'react-redux';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from '../../store/store';
import { theme } from '../../theme';
import { Loader } from '../../common/components/Loader/Loader';
import { InitialContainer } from '../../common/components/InitialContainer/InitialContainer';
import { Layout } from '../../common/components/Layout/Layout';
import { Home } from '../Home/Home';
import { Share } from '../Share/Share';

export const Main = () => {
  const generateClassName = createGenerateClassName({
    seed: 'coding-challenge',
  });

  return (
    <>
      <Provider store={store}>
        <StylesProvider generateClassName={generateClassName} injectFirst={false}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Loader />
              <InitialContainer>
                <Layout>
                  <Router>
                    <Switch>
                      <Route exact path="/">
                        <Home />
                      </Route>
                      <Route exact path="/share">
                        <Share />
                      </Route>
                    </Switch>
                  </Router>
                </Layout>
              </InitialContainer>
            </ThemeProvider>
          </StyledEngineProvider>
        </StylesProvider>
      </Provider>
    </>
  );
};

