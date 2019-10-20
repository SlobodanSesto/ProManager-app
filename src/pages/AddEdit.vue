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
         <!-- TO-DO debug and test selecting and make a div to display selection with a delete option 
        *********
        ***^
        ********
        *********
        **********-->
        <f7-list-input
          label="Assign to: "
          floating-label
          type="select"
          defaultValue=""
          placeholder="Please choose..."
          @input="addUserToTask($event.target.key)">
          <option value=""></option>
          <option 
            v-for="(user, i) in availableUsers" 
            :key="i"
            :value="user.id"
            >{{ user.email }}</option>
        </f7-list-input>
        <f7-list-input
          label="Select tags (optional)"
          floating-label
          type="select"
          defaultValue=""
          placeholder="Please choose..."
          @input="addTagToTask()">
          <option value=""></option>
          <option 
            v-for="(tag, i) in availableTags" 
            :key="i"
            :value="tag.tag_text"
            @input="addTagToTask(tag.tag_text)">{{ tag.tag_text }}</option>
        </f7-list-input>
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
          <f7-button v-if="!editing" fill class="task-btn add-btn">Create</f7-button>
          <f7-button v-if="editing" fill class="task-btn add-btn">Save</f7-button>
          <f7-button outline @click="goBack" class="task-btn">Cancel</f7-button>
        </div>
      </div>

      <p v-if="task">{{getCurTask}}</p>
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
import api from '../api/index';

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
       // console.log(this.$f7route.context.task);
      this.getAvailableData(this.$f7route.context.task.pro_id);
      this.task = this.$f7route.context.task;
      this.editing = true;
    } else if (this.$f7route.context.proId) {
      // console.log(this.$f7route.context.proId);
      this.getAvailableData(this.$f7route.context.proId);
      this.task = {
        deadline: "",
        description: "",
        priority: "",
        proid: this.$f7route.context.proId,
        tagarray: [],
        title: "",
        type: "",
        usersarray: [],
      }
    }
  },
  methods: {
    goBack() {
      this.$f7.views.main.router.back()
    },
    getAvailableData(id) {
      api.getAllTags(id).then( res => {
        this.availableTags = res.data.data;
      });
      api.getProjectUsers(id).then( res => {
        this.availableUsers = res.data.data;
      });
    },
    addUserToTask(id, index) {
      // if id is not already in taskToSend.usersarray
      // push id on to taskToSend.usersarray
      // the display arr in some div with delete buttons 
      console.log(this.task.usersarray);
      this.task.usersarray.push(this.availableUsers.splice(index,1));
      console.log(this.task.usersarray);
    },
    addTagToTask(tag) {
      console.log(tag);
    }
  },
  computed: {
    getCurTask() {
      return this.task;
    }
  }
}
</script>

<style scoped>
#add-edit {
  background: var(--theme-bg-color);
}

.add-btn {
	background: var(--f7-theme-color);
}

</style>