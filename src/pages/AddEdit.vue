<template>
  <f7-page id="add-edit">
    <navBar v-if="editing" :_title="task.tsk_title" :_backButton="true" :_burger="true"></navBar>
    <navBar v-if="!editing" :_title="'Create task'" :_backButton="true" :_burger="true"></navBar>
    <f7-block>
      <f7-list no-hairlines-md>
        <f7-list-input
          label="Title (required)"
          floating-label
          type="text"
          placeholder="Task title"
          clear-button>
        </f7-list-input>
        <f7-list-input
          label="Description (optional)"
          floating-label
          type="textarea"
          resizable
          placeholder="Description">
        </f7-list-input>
        <f7-list-input
          label="Deadline (optional)"
          floating-label
          type="datetime-local"
          placeholder="Please choose...">
        </f7-list-input>

        <!-- TO-DO! add assign to and tags inputs 
          figure out exactly what the expected behaviour is supposed to be -->

        <f7-list-input
          label="Priority"
          floating-label
          type="select"
          defaultValue="0"
          placeholder="Please choose...">
          <option value="0">No Priority</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </f7-list-input>

      </f7-list>

      <div v-if="task" class="button-container">
        <div class="btn-wrapper">
          <f7-button fill class="task-btn add-btn">Create</f7-button>
          <f7-button outline class="task-btn">Cancel</f7-button>
        </div>
      </div>

      <p v-if="task">{{this.task}}</p>
      <h2 v-if="!editing">Add a new task</h2>
    </f7-block>
  </f7-page>
</template>

<script>
// PUT to /tasks/:id ?sid=zofLQCtn62wm5uD2aAMAC61o0WYoSy8m if editing send task obj
// deadline: "2019-10-24 02:20:00"
// description: "dvsvsvsvsvzvczv"
// priority: "1"
// tagarray: "["d"]"
// title: "test"
// usersarray: "[63]"

// POST to /tasks ?sid=zofLQCtn62wm5uD2aAMAC61o0WYoSy8m
// adding
// deadline: "2019-10-24 01:15:00"
// description: "testing"
// priority: "1"
// proid: 230
// tagarray: "["test","tag"]"
// title: "test2"
// type: "task"
// usersarray: "[63]"

import navBar from './shared/NavBar.vue';

export default {
  components: {
    navBar,
  },
  data() {
    return {
      task: null,
      editing: null,
    }
  },
  mounted() {
    if (this.$f7route.context.task) {
      console.log(this.$f7route.context.task);
      this.task = this.$f7route.context.task;
      this.editing = true;
    } else if (this.$f7route.context.proId) {
      console.log(this.$f7route.context.proId);
      this.task = {
        deadline: "",
        description: "",
        priority: "",
        proid: this.$f7route.context.proId,
        tagarray: [],
        title: "",
        type: "",
        usersarray: "",
      }
    }
  }
}
</script>

<style scoped>
#add-edit {
  background: var(--theme-bg-color);
}
</style>