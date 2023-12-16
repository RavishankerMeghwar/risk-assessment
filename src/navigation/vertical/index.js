// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'


const AdminRoutes = () => {
  return [
    // {
    //   title: 'Dashboard',
    //   icon: HomeOutline,
    //   path: '/tables/doctors'
    // },
    {
      sectionTitle: 'Records'
    },
    {
      title: 'Doctors',
      icon: Table,
      path: '/tables/doctors'
    },
    {
      title: 'Patients',
      icon: Table,
      path: '/tables/patients'
    },
    {
      title: 'Devices',
      icon: Table,
      path: '/tables/devices'
    },
    // {
    //   title: 'Account Settings',
    //   icon: AccountCogOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },

    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },

    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default AdminRoutes
