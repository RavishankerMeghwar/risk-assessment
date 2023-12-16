// ** MUI Imports
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout'

// ** Navigation Imports
import AdminRoutes from 'src/navigation/vertical'
import doctor_routes from 'src/navigation/vertical/doctor'
import patient_routes from 'src/navigation/vertical/patient'
// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ... (other imports and code)

const UserLayout = ({ children }) => {
  const { settings, saveSettings } = useSettings();
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'));

  // Check if running on the client side
  if (typeof window !== 'undefined') {
    // Get 'identifier' value from localStorage
    const identifier = localStorage.getItem('identifier');

    // Default case when 'identifier' is not set or has an unexpected value
    if (typeof identifier === 'undefined' || (identifier !== 'admin' && identifier !== 'doctor' && identifier !== 'patient')) {
      // You can add default behavior or redirect to a login page
      return <p>Invalid user type or not logged in</p>;
    }

    // Render layout based on 'identifier'
    return (
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalNavItems={identifier === 'admin' ? AdminRoutes() : (identifier === 'patient' ? patient_routes() : doctor_routes())}
        verticalAppBarContent={props => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
      </VerticalLayout>

    );
  } else {
    // If running on the server side, provide a loading or default behavior
    return <p>Loading...</p>;
  }
};

export default UserLayout;
