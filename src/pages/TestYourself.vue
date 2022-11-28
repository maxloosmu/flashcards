<template>
  <div>
    <button @click="gotoCreate">Go back to create questions and answers</button>
    <button @click="gotoUpload">File Upload</button>
    <br/><br/>
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
      <button @click="showHideQuestions">{{ showHideQuestionsButton }}</button>
      <button @click="resetQuestions">Reset Questions</button>
      <button @click="showHideAnswer">{{ showHideAnswerButton }}</button>
      <p v-html="question" :style="{ width: setWidth + 'px' }"></p>
      <p v-html="answer" v-show="toShowAnswer" :style="{ width: setWidth + 'px' }"></p>
    </div>
    <br/>
    <ol v-if="!!chosenSubject" v-show="toShowAllQuestions">
      <li v-html="currentItem(questionObject)" v-for="questionObject in this.$store.state.allSubjectQuestions" :key="questionObject">
      </li>
    </ol>
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
      toShowAnswer: true,
      toShowAllQuestions: false,
      showHideAnswerButton: "Show Answer",
      showHideQuestionsButton: "List All Questions",
      windowWidth: 500,
    }
  },
  computed: {
    setWidth() {
      if (this.windowWidth < 500) {
        // alert(this.windowWidth);
        return this.windowWidth;
      }
      else return 500;
    },
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
    gotoUpload() {
      this.$router.replace('/upload');
    },
    showHideQuestions() {
      this.toShowAllQuestions = !this.toShowAllQuestions;
      if (this.toShowAllQuestions) {
        this.showHideQuestionsButton = "Hide All Questions";
      }
      else this.showHideQuestionsButton = "List All Questions";
    },
    showHideAnswer() {
      this.toShowAnswer = !this.toShowAnswer;
      if (this.toShowAnswer) {
        this.showHideAnswerButton = "Hide Answer";
      }
      else this.showHideAnswerButton = "Show Answer";
      if (this.count<=this.totalQuestions) {
        this.answer =
          this.$store.state.allSubjectQuestions[this.count-1][1]['answer'];
      }
      else this.answer = "";
    },
    resetQuestions() {
      this.count = 0;
    },
    showQuestion() {
      this.toShowAnswer = false;
      this.showHideAnswerButton = "Show Answer";
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
    gotoCreate() {
      this.$router.replace('/create');
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  created: function() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted: function() {
    window.removeEventListener('resize', this.handleResize);
  },
}
</script>
