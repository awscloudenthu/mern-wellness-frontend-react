import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.REACT_APP_UserPoolId,
  ClientId: process.env.REACT_APP_ClientId
};

const userPool = new CognitoUserPool(poolData);

// Sign-Up Function
export const signUp = (email, password, callback) => {
  userPool.signUp(email, password, [], null, (err, result) => {
    if (err) {
      console.error('Sign-up error:', err);
      callback(err);
    } else {
      console.log('Sign-up success:', result);
      callback(null, result);
    }
  });
};

// Sign-In Function
export const signIn = (email, password, callback) => {
  const user = new CognitoUser({ Username: email, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });

  user.authenticateUser(authDetails, {
    onSuccess: (session) => {
      console.log('Sign-in success:', session);
      callback(null, session);
    },
    onFailure: (err) => {
      console.error('Sign-in error:', err);
      callback(err);
    },
  });
};

// Get Current User
export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

// Sign-Out Function
export const signOut = () => {
  const user = getCurrentUser();
  if (user) {
    user.signOut();
    console.log('User signed out.');
  } else {
    console.log('No user is currently signed in.');
  }
};
