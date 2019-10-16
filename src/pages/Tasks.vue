<template>
  <f7-page id="tasks">
    <navBar :_title="'Tasks'" :_backButton="true" :_burger="true"></navBar>

    <!-- input will go here need to see what the requirements are for it
		weather it needs to filter the current results or fetch from DB matching results -->
		<div class="tasks-top-wrap">
      <f7-input id="search-input" type="text" outline placeholder="Filter items"></f7-input>
      <f7-button fill class="task-btn add-btn" @click="addTask">Add task</f7-button>
    </div>
    
		<f7-block class="project-cards-wrap">
			<taskCard class="card-comp" 
				v-for="( task, i ) in tasks" :key="i"
				:_name="task.title" 
				:_date="task.timecreated"
				:_id="task.id" 
        :_task_obj="task"
        :_is_task="true" >
			</taskCard>	
		</f7-block>
	</f7-page>
</template>

<script>
import api from "../api/index";
import navBar from './shared/NavBar.vue';
import taskCard from './shared/Card.vue';

export default {
	data(){
		return {
			tasks: null,
      projectId: null,
		}
  },
  components: {
    navBar,
    taskCard
	},
  mounted() {
    if (this.$f7route.context) {
      this.projectId = this.$f7route.context.proId;
      const params = {
        pro_id: this.$f7route.context.proId,
        created: false,
        assigned: false,
        archived: false,
        searchstr: "",
        tagarray: []
      };
      api.getTasks(params).then(res => {
				console.log(res);
				this.tasks = res.data.data;
      });
    }
  },
  methods: {
    addTask() {
      this.$f7router.navigate('/edittask/', { context: { proId: this.projectId } });
    },
    // goToTask(id) {
      // let params = {
      //   taskId: id
      // }
      // api.getOneTask(params).then(res => {
      //   console.log(res)
        // 0: {…}
        //   can_edit: null
        //   can_mark: null
        //   ​​​description: "Za:\n* Projekat\n* Task"
        //   ​​​​only_worker: null
        //   ​​​​pri_id: 3
        //   ​​​​pri_text: "High"
        //   ​​​​pro_id: 257
        //   ​​​​pro_name: "Debagovanje OmniTaskera 0"
        //   ​​​​sta_text: "In Progress"
        //   ​​​​tags: Array []
        //   ​​​​timecompleted: null
        //   ​​​​timecritical: 1
        //   ​​​​tsk_deadline: null
        //   ​​​​tsk_id: 709
        //   ​​​​tsk_timecreated: "2018-08-31 14:00:13"
        //   ​​​​tsk_title: "Staviti na beforeDestory lifecycle proveru dal je nesto menjano"
        //   ​​​​usr_creator_name: "Zeljko"
        //   ​​​​usr_creator_surname: "Milinkovic"
        //   ​​​​usr_email: "zex37173@gmail.com"
        //   ​​​​usr_ender_img: null
        //   ​​​​usr_ender_name: null
        //   ​​​​usr_ender_surname: null
        //   ​​​​usr_id_creator: 69
        //   ​​​​usrimg: "users/69/img"
        //   ​​​​usrworking: (1) […
     
    // }
  }
};
</script>

<style lang="scss" scoped>
#tasks {
  background: var(--theme-bg-color);
}
.project-cards-wrap {
	margin-top: 20px;
}

#tasks .card-comp:nth-child(odd) {
	// border: 1px solid red;
	background: var(--theme-secondary-color);
}

.tasks-top-wrap {
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#search-input {
	padding-top: 5px;
	margin-left: 1rem;
	line-height: 1.5rem;
	font-size: 14px;
	height: 1.5rem;
	width: 200px;
}

.task-btn {
	height: 1.5rem;
  margin-right: 1rem;
	width: 80px;
	background: var(--theme-bg-color);
	border: 1px solid var(--f7-theme-color);
	font-family: 'Saira', sans-serif;
	font-weight: 400;
	text-transform: capitalize;
	font-size: 13px;
	line-height: 1.5rem;
}

.add-btn {
	background: #19D082;
	border: 1px solid #19D082;
}

</style>