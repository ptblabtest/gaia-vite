import { Link, Outlet } from 'react-router-dom';
import ApplicationLogo from '@//components/ApplicationLogo';

const LoginLayout = () => {
  return (
    <div
      className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://gaia.id/wp-content/uploads/2023/02/DSC_3185-copy-scaled.jpg')",
      }}
    >
      <div className="w-full sm:max-w-md px-1 py-6 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <div className="flex flex-col sm:justify-center items-center pt-1 sm:pt-0">
          <div>
            <Link to="/">
              <ApplicationLogo className="w-20 h-20 fill-current" />
            </Link>
          </div>

          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white overflow-hidden sm:rounded-lg">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;