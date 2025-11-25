import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
} from "react";
import { useCookies } from "react-cookie";

export interface AuthState {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user: any;
}

interface PayloadAction<T> {
  type: AuthActionType;
  payload: T;
}

enum AuthActionType {
  INITIALIZE = "INITIALIZE",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

interface AuthContextType extends AuthState {
  dispatch: Dispatch<PayloadAction<AuthState>>;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

interface ReduceHandler {
  INITIALIZE(state: AuthState, action: PayloadAction<AuthState>): AuthState;
  SIGN_IN(state: AuthState, action: PayloadAction<AuthState>): AuthState;
  SIGN_OUT(state: AuthState): AuthState;
}

const reduceHandler: ReduceHandler = {
  INITIALIZE(state, action) {
    const { isAuthenticated, user } = action.payload;
    return { ...state, isAuthenticated, isInitialized: true, user };
  },
  SIGN_IN: function (
    state: AuthState,
    action: PayloadAction<AuthState>
  ): AuthState {
    const { user } = action.payload;
    return { ...state, isInitialized: true, user };
  },
  SIGN_OUT: function (state: AuthState): AuthState {
    return { ...state, isInitialized: false, user: null };
  },
};

export function reducer(state: AuthState, action: PayloadAction<AuthState>) {
  if (!reduceHandler[action.type]) return state;

  return reduceHandler[action.type](state, action);
}

export function initialize(payload: AuthState): PayloadAction<AuthState> {
  return {
    type: AuthActionType.INITIALIZE,
    payload,
  };
}

export function signIn(payload: AuthState): PayloadAction<AuthState> {
  return {
    type: AuthActionType.SIGN_IN,
    payload,
  };
}

export function signOut(payload: AuthState): PayloadAction<AuthState> {
  localStorage.removeItem("ACCESS_TOKEN");
  return {
    type: AuthActionType.SIGN_OUT,
    payload: {
      user: null,
    },
  };
}
