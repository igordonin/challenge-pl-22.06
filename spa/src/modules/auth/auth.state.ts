import { User } from './user';

enum AuthActionTypes {
  SIGN_IN = '@challenge/auth-core/SIGN_IN',
  SIGN_UP = '@challenge/auth-core/SIGN_UP',
  SIGN_OUT = '@challenge/auth-core/SIGN_OUT',
}

interface AuthAction {
  type: AuthActionTypes;
  payload: User | null;
}

export default function reducer(state: User | null = null, action: AuthAction) {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
    case AuthActionTypes.SIGN_UP:
      return action.payload;

    case AuthActionTypes.SIGN_OUT:
      return null;

    default:
      return state;
  }
}

interface UserCredentials {
  email: string;
  password: string;
}

export const signIn = (credentials: UserCredentials) => {
  return {
    type: AuthActionTypes.SIGN_IN,
    payload: {
      id: 'response.data.id',
      email: 'response.data.email',
    },
  };
};

export const signUp = (credentials: UserCredentials) => {
  return {
    type: AuthActionTypes.SIGN_UP,
    payload: {
      id: 'response.data.id',
      email: 'response.data.email',
    },
  };
};

export const signOut = () => {
  return {
    type: AuthActionTypes.SIGN_OUT,
    payload: null,
  };
};
