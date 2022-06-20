import { useSelector } from 'react-redux';
import { SignIn } from '../modules/auth/sign-in';
import { CustomersHome } from '../modules/crm/customers-home';
import { StoreState } from '../reducers/root-reducer';

export const LandingPage = () => {
  const auth = useSelector((state: StoreState) => state.auth);

  return (
    <>
      {auth && <CustomersHome />}
      {!auth && <SignIn />}
    </>
  );
};
