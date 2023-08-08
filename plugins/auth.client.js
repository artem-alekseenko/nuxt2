import Cookie from 'js-cookie'

export default ({ $config, store }) => {
  const decodeJwtResponse = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  const handleCredentialResponse = (response) => {
    const responsePayload = decodeJwtResponse(response.credential);

    Cookie.set($config.auth.cookieName, response.credential, { expires: 1/24, sameSite: 'Lax'})

    store.commit('auth/user', {
      fullName: responsePayload.name,
      profileUrl: responsePayload.picture,
    })
  }

  const init = () => {
    google.accounts.id.initialize({
      client_id: $config.auth.clientId,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }

  const addScript = () => {
    const script = document.createElement('script')
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.onload = init;
    document.head.appendChild(script)
  }

  window.initAuth = init
  addScript()
}
