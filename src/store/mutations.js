// function shuffle(array) {
//   return array.sort();
//   // return [...array].sort(() => Math.random() - 0.5);
// }
// import { updateSubjects } from './mutations.js';
import store from '../store';

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
  },
  async addQuestionAnswer(state, payload) {
    let [selectedSubject, currentQuestion, currentAnswer] = payload;
    if (selectedSubject!="" && currentQuestion!="" && currentAnswer!="") {
      store.commit("updateSubjects");
      // this.updateSubjects(state);
      const response = await fetch('https://flashcards-01-e4d7d-default-rtdb.asia-southeast1.firebasedatabase.app/test.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: selectedSubject,
          question: currentQuestion,
          answer: currentAnswer,
        }),
      });
      if (response.ok) {
        alert('Question, Answer added to ' + selectedSubject);
      }
    }
  },
  async loadSubjects(state) {
    const response = await fetch('https://flashcards-01-e4d7d-default-rtdb.asia-southeast1.firebasedatabase.app/subjects.json');
    const data = await response.json();
    const indexedSubjects = data.subjects;
    for (const item in indexedSubjects) {
      state.subjects.push(indexedSubjects[item]);
    }
  },
  async loadSubjectQuestions(state, chosenSubject) {
    const response = await fetch('https://flashcards-01-e4d7d-default-rtdb.asia-southeast1.firebasedatabase.app/test.json');
    const data = await response.json();
    state.allSubjectQuestions = [];
    for (const item in data) {
      if (data[item]["subject"] == chosenSubject) {
        state.allSubjectQuestions.push([Math.random(), data[item]]);
      }
    }
    state.allSubjectQuestions = state.allSubjectQuestions.sort();
    // alert(state.allSubjectQuestions);
  },
  async updateSubjects(state) {
    const response = await fetch('https://flashcards-01-e4d7d-default-rtdb.asia-southeast1.firebasedatabase.app/subjects.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subjects: state.subjects,
      }),
    });
    if (response.ok) {
      // alert('Subjects updated.');
    }
  }
};