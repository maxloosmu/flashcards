export default {
  // https://firebase.google.com/docs/reference/rest/auth
  // curl 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAk1ueCLjDDWCNrt_23o5A4RCfeaYIlN6k' -H 'Content-Type: application/json' --data-binary '{"email":"maxlooo@yahoo.com","password":"PASSWORD","returnSecureToken":true}'
  async auth(state, mode) {
    let url =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyA-lugHzomAhvtBdqAqv0OhtcTpxPAi1D0';
    if (mode=="signup") {
      url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyA-lugHzomAhvtBdqAqv0OhtcTpxPAi1D0';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        returnSecureToken: true
      })
    });
    // state.response = response;
    const responseData = await response.json();
    state.response = responseData;
    localStorage.setItem('response', responseData);
    if (!response.ok) {
      state.error = new Error(
        responseData["error"]["message"] || 'Failed to authenticate. Check your login data.'
      );
      console.log(state.error);
      alert(state.error);
      throw state.error;
    }
    state.token = await responseData.idToken;
    localStorage.setItem('token', state.token);
    localStorage.setItem('userId', await responseData.localId);
    // state.token = localStorage.getItem('token');
    state.userId = localStorage.getItem('userId');

    window.location.reload();
  }
};