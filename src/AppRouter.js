import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { FavoritesProvider } from "./Contexts/FavoritesContext"

const AppRouter = () => {
  return (
    <ThemeProvider>
      <Router>
        <NavBar />
          <FavoritesProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Favorites" component={Favorites} />
            </Switch>
          </FavoritesProvider>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
