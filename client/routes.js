// pages
import Home from '../imports/ui/pages/CommsWithAPlan.svelte';
import CommsWithAPlan from '../imports/ui/pages/CommsWithAPlan.svelte';
// import ReachApp from './components/ReachApp.svelte'
// import Download from './components/Download.svelte'
// import Schedule from './components/Schedule.svelte'
// import Manual from './components/Manual.svelte'
// import Contact from './components/Contact.svelte'
// import Legal from './components/Legal.svelte'

 const routes = [
  {
    to: '/',
    page: Home,
  }, 
  {
    to: '/commswithaplan',
    page: CommsWithAPlan,
  },
  // {
  //   to: '/reachapp',
  //   page: ReachApp,
  // },
  // {
  //   to: '/download',
  //   page: Download,
  // },
  // {
  //   to: '/manual',
  //   page: Manual,
  // },
  // {
  //   to: '/schedule',
  //   page: Schedule,
  // },
  // {
  //   to: '/',
  //   page: Account,
  // }
  //   {
//     to: '/legal',
//     page: Legal,
//   },
//   {
//     to: '/contact',
//     page: Contact,
//   },
]


export default routes;