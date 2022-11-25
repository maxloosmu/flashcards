<template>
  <div>
    <button @click="goBack">Go back to create questions and answers</button>
    <br/>
    <label for="chosenSubject">Choose a Subject</label>
    <div
      v-for="subject in this.$store.state.subjects"
      :key="subject"
    >
      <input
        type="radio"
        name="chosenSubject"
        v-model="chosenSubject"
        :value="subject"
      />{{ subject }}
    </div>
    <div v-if="getQuestions">
      Chosen Subject: {{ chosenSubject }}
      <br/>
      <button @click="showQuestion">Show Question</button>
      <button @click="resetQuestions">Reset Questions</button>
      <button @click="showAnswer">Show Answer</button>
      <p v-html="question"></p>
      <p v-html="answer"></p>
    </div>
    <br/>
    <ol>
      <li v-html="currentItem(questionObject)" v-for="questionObject in this.$store.state.allSubjectQuestions" :key="questionObject">
      </li>
    </ol>
    <!-- <div v-if="this.$store.state.allSubjectQuestions.length>0">
      <br/><br/>
      <label for="eachQuestion">Choose a Subject</label>
      <div
        v-for="item in this.$store.state.allSubjectQuestions"
        :key="item"
      >
        <textarea
          rows="4"
          cols="50"
          :value="currentItem(item)"
        />
      </div>
    </div> -->
  </div>
</template>
<script>
import store from '../store';

export default {
  data() {
    return {
      chosenSubject: "",
      count: 0,
      question: "",
      answer: "",
    }
  },
  computed: {
    totalQuestions() {
      return this.$store.state.allSubjectQuestions.length;
    },
    getQuestions() {
      if (this.chosenSubject) {
        store.commit("loadSubjectQuestions", this.chosenSubject);
        return true;
      }
      return false;
    },
  },
  methods: {
    showAnswer() {
      if (this.count<=this.totalQuestions) {
        this.answer = 
          this.$store.state.allSubjectQuestions[this.count-1][1]['answer'];
      }
    },
    resetQuestions() {
      this.count = 0;
    },
    showQuestion() {
      this.answer = "";
      if (this.count<this.totalQuestions) {
        this.question = 
          this.$store.state.allSubjectQuestions[this.count][1]['question'];
      }
      else {
        this.question = "";
      }
      this.count++;
    },
    currentItem(item) {
      return item[1]['question'];
    },
    goBack() {
      this.$router.replace('/create');
    },
  },
}
</script>
