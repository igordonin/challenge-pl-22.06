import { User } from './user';

enum AuthActionTypes {
  SIGN_IN = '@challenge/auth-core/SIGN_IN',
  SIGN_UP = '@challenge/auth-core/SIGN_UP',
  SIGN_OUT = '@challenge/auth-core/SIGN_OUT',
}

interface SignInAction {
  type: AuthActionTypes.SIGN_IN;
  payload: User;
}

interface SignUpAction {
  type: AuthActionTypes.SIGN_UP;
  payload: User;
}

interface SignOutAction {
  type: AuthActionTypes.SIGN_OUT;
}

type AuthAction = SignInAction | SignUpAction | SignOutAction;

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

export const signIn = ({ id, email }: User) => {
  return {
    type: AuthActionTypes.SIGN_IN,
    payload: {
      id,
      email,
    },
  };
};

export const signUp = ({ id, email }: User) => {
  return {
    type: AuthActionTypes.SIGN_UP,
    payload: {
      id,
      email,
    },
  };
};

export const signOut = () => {
  return {
    type: AuthActionTypes.SIGN_OUT,
  };
};
