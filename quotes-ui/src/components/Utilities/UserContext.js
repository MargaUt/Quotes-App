import React from "react";
const UserContext = React.createContext({
  loggedUserName: null,
  updateNavBar: () => {},
  updateBookButtons: () => {},
  updateQuoteButtons: () => {},
  updateQuoteView: () => {},
});
export default UserContext;
