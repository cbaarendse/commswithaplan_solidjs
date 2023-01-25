// Cookies
// imports

// class
export default class Cookies {
  static setCookie(name: string, value: string, exdays: number, doc: Document) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires: string = 'expires=' + d.toUTCString();
    doc.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  static getCookie(name: string, doc: Document): string {
    const cname = name + '=';
    const decodedCookie = decodeURIComponent(doc.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(cname) == 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return '';
  }
  static checkCookie(name: string, doc: Document) {
    const value: string | null = this.getCookie(name, doc);
    if (name.startsWith('_commswithaplan') && (value === 'granted' || 'denied')) {
      return true;
    } else {
      return false;
    }
  }

  static deleteCookie(name: string, value: string, doc: Document): void {
    const d = new Date(0);
    const expires: string = 'expires=' + d.toUTCString();
    doc.cookie = name + '=' + value + ';' + expires + ';path=/';
  }

  static checkedToConsent(arg: boolean): 'granted' | 'denied' {
    return arg === false ? 'denied' : arg === true ? 'granted' : 'granted';
  }
  static consentToChecked(arg: string): boolean {
    return arg === 'denied' ? false : arg === 'granted' ? true : true;
  }
}
