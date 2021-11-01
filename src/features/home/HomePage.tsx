import { useState } from "react";
import { 
  Redirect, Switch, Route,
  useRouteMatch, useLocation, useHistory
} from "react-router-dom";
import "./HomePage.css";

import DehazeIcon from "@mui/icons-material/Dehaze";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CardRegistrationForm } from "../card/CardRegistrationForm";
import { AboutForm } from "../about/About";
import { HomeRouteUtils } from "./HomePage.service";

export function HomePage() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const cardRegistrationRoutePath = HomeRouteUtils.getCardRegistrationRoutePath();
  const aboutRoutePath = HomeRouteUtils.getAboutRoutePath();

  // get header base on the Route
  const headerTitle: string = location.pathname === cardRegistrationRoutePath ? "Register Card Form"
    : (location.pathname === aboutRoutePath ? "About" : "");
  const overlayClass: string = isMenuOpened ? "show" : "hide";

  // event handler
  const onLogoutHandler = () => {
    history.replace("/");
  }

  const onChooseMenu = (route: string) => {
    setIsMenuOpened(false);
    history.push(route);
  }

  return (
    <div className="homepage">
      <div className="menu_section">
        <div className="homepage_header">{isMenuOpened ? "Menu" : headerTitle}</div>
        <div className="sandwich-btn">
          {
            isMenuOpened ? <ArrowBackIcon className="cursor ml-10" onClick={() => setIsMenuOpened(!isMenuOpened)}></ArrowBackIcon>
            : <DehazeIcon className="cursor ml-10" onClick={() => setIsMenuOpened(!isMenuOpened)}></DehazeIcon> 
          }
        </div>
      </div>
      <div className="body_container">
        <Switch>
          <Route exact path={path}>
            <Redirect to={cardRegistrationRoutePath} />
          </Route>
          <Route path={cardRegistrationRoutePath}>
            <CardRegistrationForm></CardRegistrationForm>
          </Route>
          <Route path={aboutRoutePath}>
            <AboutForm></AboutForm>
          </Route>
        </Switch>
      </div>
      <div className={"overlay " + overlayClass}>
        <ul>
          <li className="menu-item" onClick={() => onChooseMenu(path)}>Home</li>
          <li className="menu-item about-menu-item" onClick={() => onChooseMenu(aboutRoutePath)}>About</li>
          <li className="menu-item" onClick={() => onLogoutHandler()}>Logout</li>
        </ul>
      </div>
    </div>
  );
}