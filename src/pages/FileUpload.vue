<template>
  <button @click="gotoCreate">Go back to Create Questions and Answers</button>
  <button
    v-if="this.$store.state.subjects.length>0"
    @click="test">Test Yourself
  </button>
  <br/><br/>
  <div>
    <input type="file" ref="doc" @change="readFile()" />
    <div v-html="content"></div>
  </div>
</template>
<script>
import store from '../store';

export default {
  data() {
    return {
      file: null,
      content: null,
    };
  },
  methods: {
    test() {
      // store.commit("updateSubjects");
      this.$router.replace('/test');
    },
    gotoCreate() {
      this.$router.replace('/create');
    },
    uploadContent(filename) {
      let noLineBreaks = this.content.replace(/[\r\n]/gm, '');
      let splitContent = noLineBreaks.split("<br/><br/>");
      let count = 0;
      let currentSubject = filename;
      let currentQuestion = "";
      let currentAnswer = "";
      while (count<splitContent.length) {
        currentQuestion = splitContent[count];
        currentAnswer = splitContent[count+1];
        count += 2
        if (this.$store.state.subjects.length==0) {
          store.commit('loadSubjects');
        }
        if (!this.$store.state.subjects.includes(currentSubject)) {
          this.$store.state.subjects.push(currentSubject);
        }
        let payload = [currentSubject, currentQuestion, currentAnswer, false];
        store.commit('addQuestionAnswer', payload);
      }
    },
    readFile() {
      this.file = this.$refs.doc.files[0];
      const reader = new FileReader();
      if (this.file.name.includes(".txt")) {
        reader.onload = (res) => {
          let tempContent = res.target.result;
          let filename = this.file.name.replace(/\.[^/.]+$/, "");
          let builtContent = '';
          for (const i of tempContent) {
            builtContent += i;
          }
          this.content = builtContent.replace(/\n/gm, '<br/>');
          this.uploadContent(filename);
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
      } else {
        this.content = "check the console for file output";
        reader.onload = (res) => {
          console.log(res.target.result);
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);
      }
    },
  }
}
</script>