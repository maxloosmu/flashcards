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
    <p v-if="getQuestions">
      Chosen Subject: {{ chosenSubject }}
    </p>
    <ol>
      <li v-for="questionObject in this.$store.state.allSubjectQuestions" :key="questionObject">
        {{ questionObject }}
      </li>
    </ol>
    <div v-if="this.$store.state.allSubjectQuestions.length>0">
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
    </div>
  </div>
</template>
<script>
import store from '../store';

export default {
  data() {
    return {
      chosenSubject: "",
    }
  },
  computed: {
    // currentItem(item) {
    //   return item['question'];
    // },
    getQuestions() {
      if (this.chosenSubject) {
        store.commit("loadSubjectQuestions", this.chosenSubject);
        return true;
      }
      return false;
    },
  },
  methods: {
    currentItem(item) {
      return item[1]['question'];
    },
    goBack() {
      this.$router.replace('/create');
    },
  },
}
</script>
