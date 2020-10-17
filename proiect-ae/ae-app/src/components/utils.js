export const getCookie = cname => {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

export const setCookie = (cname, cvalue) => {
    var maxAge = 'max-age=86400';
    document.cookie = cname + '=' + cvalue + ';' + maxAge + ';path=/';
    console.log(document.cookie);
  };

 export const checkCookie = () => {
    var isLoggedIn = getCookie('isLoggedIn');
    if (isLoggedIn !== '' && isLoggedIn === 'true') {
     return true;
    } else {
      return false;
    }
  };