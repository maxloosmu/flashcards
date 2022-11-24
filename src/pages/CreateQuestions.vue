<template>
  <button @click="logout">Logout</button>
  <br/>
  <button
    v-if="this.$store.state.subjects.length>0"
    @click="test">Test Yourself</button>
  <section v-if="!this.token">
    <p>name: {{ name }}</p>
    <p>email: {{ email }}</p>
    <p>password: {{ password }}</p>
    <p>userId: {{ userId }}</p>
    <p>token: {{ token }}</p>
    <p>response: {{ response }}</p>
  </section>
  <div v-if="!!this.token">
    <label for="subjectInput">Enter New Subject</label>
    <input
      type="text"
      id="subjectInput"
      ref="subjectInput"
      v-model.trim="subjectInput"
      @keypress.enter="addSubject"
      @blur="clearSubjectInput"
    />
    <button @click="addSubjectButton">Add Subject</button>
    <div v-if="this.$store.state.subjects.length>0">
      <br/><br/>
      <label for="selectedSubject">Choose a Subject</label>
      <div
        v-for="subject in this.$store.state.subjects"
        :key="subject"
      >
        <input
          type="radio"
          name="selectedSubject"
          v-model="selectedSubject"
          :value="subject"
        />{{ subject }}
        <button @click="removeTask(subject)">
          <FontAwesomeIcon :icon="icon" />
        </button>
      </div>
      <p>Selected Subject: {{ selectedSubject }}</p>
      <div v-if="!!selectedSubject">
        <label for="question">Enter a New Question</label>
        <br/>
        <textarea
          id="question"
          ref="question"
          rows="4"
          cols="50"
          v-model="question"
        />
        <br/>
        <label for="answer">Enter a New Answer</label>
        <br/>
        <textarea
          id="answer"
          ref="answer"
          rows="4"
          cols="50"
          v-model="answer"
        />
        <br/>
        <button @click="addQuestionAnswer">Add Q&A to Server</button>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      icon: faTimes,
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
      userId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      response: localStorage.getItem('response'),
      subjectInput: "",
      selectedSubject: "",
      question: "",
      answer: "",
    };
  },
  methods: {
    test() {
      store.commit("updateSubjects");
      this.$router.replace('/test');
    },
    addQuestionAnswer() {
      if (this.selectedSubject!="" && this.question!="" && this.answer!="") {
        store.commit("updateSubjects");
        fetch('https://flashcards-01-e4d7d-default-rtdb.asia-southeast1.firebasedatabase.app/test.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: this.selectedSubject,
            question: this.question,
            answer: this.answer,
          }),
        });
      }
    },
    clearSubjectInput() {
      setTimeout(() => {
        this.$refs.subjectInput.value=""
      }, 1000);
    },
    addSubject(event) {
      this.$store.state.subjects.push(event.target.value);
      this.$refs.subjectInput.value = "";
      // this.$refs.selectedSubject.focus();
    },
    addSubjectButton() {
      this.$store.state.subjects.push(this.$refs.subjectInput.value);
      this.$refs.subjectInput.value = "";
      // this.$refs.selectedSubject.focus();
    },
    removeTask(subject) {
      const index = this.$store.state.subjects.indexOf(subject);
      if (index > -1) {
        this.$store.state.subjects.splice(index, 1);
      }
      this.$refs.subjectInput.focus();
    },
    logout() {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('response');
      this.$router.replace('/login');
    },

  },
  mounted() {
    if (this.$store.state.subjects.length==0) {
      store.commit("loadSubjects");
    }
  },
}
</script>