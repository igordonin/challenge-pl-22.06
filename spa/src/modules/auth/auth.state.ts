import { Dispatch } from 'redux';
import { User } from './user';

enum AuthActionTypes {
  SIGN_IN = '@challenge/auth-core/SIGN_IN',
  SIGN_UP = '@challenge/auth-core/SIGN_UP',
  SIGN_OUT = '@challenge/auth-core/SIGN_OUT',
}

export interface AuthAction {
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

interface UserSignIn {
  email: string;
  password: string;
}

export const signIn = (userSignIn: UserSignIn) => {
  return async (dispatch: Dispatch) => {
    dispatch<AuthAction>({
      type: AuthActionTypes.SIGN_IN,
      payload: {
        id: 1,
        email: 'teste',
      },
    });
  };
};
