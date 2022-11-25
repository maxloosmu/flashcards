<template>
  <button @click="gotoCreate">Go back to Create Questions</button>
  <div style="border-style:solid">
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
    gotoCreate() {
      this.$router.replace('/create');
    },
    uploadContent() {
      let noLineBreaks = this.content.replace(/[\r\n]/gm, '');
      let splitContent = noLineBreaks.split("<br/><br/>");
      alert(splitContent.length);
      let count = 0;
      let currentSubject = "";
      let currentQuestion = "";
      let currentAnswer = "";
      while (count<splitContent.length) {
        currentSubject = splitContent[count];
        currentQuestion = splitContent[count+1];
        currentAnswer = splitContent[count+2];
        count += 3
        if (this.$store.state.subjects.length==0) {
          store.commit('loadSubjects');
        }
        if (!this.$store.state.subjects.includes(currentSubject)) {
          this.$store.state.subjects.push(currentSubject);
        }
        let payload = [currentSubject, currentQuestion, currentAnswer];
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
          let builtContent = filename + '<br/><br/>';
          for (const i of tempContent) {
            builtContent += i;
          }
          this.content = builtContent.replace(/\n/gm, '<br/>');
          this.uploadContent();
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