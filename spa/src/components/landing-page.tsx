import { SignIn } from '../modules/auth/sign-in';
import { User } from '../modules/auth/user';
import { CustomersHome } from '../modules/crm/customers-home';
import { customersMock } from '../modules/crm/customers.mock';

interface LandingPageProps {
  auth: User | null;
}

export const LandingPage = ({ auth }: LandingPageProps) => {
  return (
    <>
      {auth && <CustomersHome customers={customersMock} />}
      {!auth && <SignIn />}
    </>
  );
};
