import React from 'react';
const UserContext = React.createContext({
    loggedUserName: null,
    secondUserName: null,
    updateMe: () => {}
});
export default UserContext;