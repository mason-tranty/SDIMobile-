import {User} from '@domain';
import {createReducer} from '@reduxjs/toolkit';
import {
  signInSuccess,
  signInFailed,
  signInBegin,
  signInLocally,
  signInLocallySuccess,
  signInLocallyFailed,
  signOut,
  signOutFailed,
  signOutSuccess,
} from '../actions';

export type AuthenticationState = {
  isAuthorized: boolean;
  isAuthenticating: boolean;
  isAuthenticatingLocally: boolean;
  isSigningOut: boolean;
  user?: User;
};

const INITIAL_STATE: AuthenticationState = {
  isAuthenticating: false,
  isAuthorized: false,
  isSigningOut: false,
  isAuthenticatingLocally: false,
};

export const authenticationReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(signInBegin, (state) =>
      Object.assign(state, {isAuthenticating: true}),
    )
    .addCase(signInSuccess, (state, action) =>
      Object.assign(state, {
        isAuthenticating: false,
        isAuthorized: true,
        user: action.payload.user,
      }),
    )
    .addCase(signInFailed, (state) =>
      Object.assign(state, {isAuthenticating: false, isAuthorized: false}),
    )
    .addCase(signInLocally, (state) =>
      Object.assign(state, {
        isAuthenticatingLocally: true,
      }),
    )
    .addCase(signInLocallySuccess, (state, action) =>
      Object.assign(state, {
        isAuthenticatingLocally: false,
        isAuthorized: true,
        user: action.payload.user,
      }),
    )
    .addCase(signInLocallyFailed, (state) =>
      Object.assign(state, {
        isAuthenticatingLocally: false,
        isAuthorized: false,
      }),
    )
    .addCase(signOut, (state) =>
      Object.assign(state, {
        isSigningOut: true,
      }),
    )
    .addCase(signOutFailed, (state) =>
      Object.assign(state, {
        isSigningOut: false,
      }),
    )
    .addCase(signOutSuccess, (state) => Object.assign(state, INITIAL_STATE)),
);
