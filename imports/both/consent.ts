import {Meteor} from 'meteor/meteor';
declare global {
  interface Window {
    dataLayer: [];
  }
}
interface Argument {
  key: string;
  value: Date | string | undefined;
}
export const googleAnalytics = (gtmID: string | undefined): void => {
  window.dataLayer = window.dataLayer || [];
  function gtag(arg: Argument): void {
    window.dataLayer.push(arg);
  }
  const js = {key: 'js', value: new Date()};
  gtag(js);
  const config = {key: 'config', value: gtmID};
  gtag(config);
  // gtag('consent', 'default', {
  //   'ad_storage': 'denied',
  //   'analytics_storage': 'denied'
  // }
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtmID}`;
  document.body.appendChild(script);
};
