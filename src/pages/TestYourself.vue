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
      <button @click="resetQuestions">Reset Questions</button>
      <button @click="showHideAnswer">{{ showHideButton }}</button>
      <p v-html="question" :style="{ width: setWidth + 'px' }"></p>
      <p v-html="answer" v-show="toShow" :style="{ width: setWidth + 'px' }"></p>
    </div>
    <br/>
    <ol v-if="!!chosenSubject">
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
      toShow: true,
      showHideButton: "Show Answer",
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
    showHideAnswer() {
      this.toShow = !this.toShow;
      if (this.toShow) {
        this.showHideButton = "Hide Answer";
      }
      else this.showHideButton = "Show Answer";
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
      this.toShow = false;
      this.showHideButton = "Show Answer";
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
