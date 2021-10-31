export const HOME_ROOT = "/home";
export const CARD_REGISTRATION_ROUTE = "/card-register";
export const CARD_REGISTRATION_ROUTE_HEADER = "Register Card Form";

export const ABOUT_ROUTE = "/about";
export const ABOUT_ROUTE_HEADER = "About";

export const HomeRouteUtils = {
  getCardRegistrationRoutePath: () => {
    return HOME_ROOT + CARD_REGISTRATION_ROUTE;
  },

  getAboutRoutePath: () => {
    return HOME_ROOT + ABOUT_ROUTE;
  }

}