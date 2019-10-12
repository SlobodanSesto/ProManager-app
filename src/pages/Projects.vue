<template>
	<f7-page id="projects">
		<navBar :_title="'Project list'" :_burger="true"></navBar>
		
		<!-- input will go here need to see what the requirements are for it
		weather it needs to filter the current results or fetch from DB matching results -->
		<f7-input id="search-input" type="text" outline placeholder="Filter items" :value="searchInput" @input="searchInput = $event.target.value " ></f7-input>
		
		<f7-block class="project-cards-wrap">
			<projectCard class="card-comp" 
				@selectedPro="openModal"
				v-for="( pro, i ) in projectsArr" :key="i" 
				:_name="pro.title" 
				:_date="pro.timecreated"
				:_id="pro.id" 
				:_project_obj="pro">
			</projectCard>	
		</f7-block>
		<!-- <mymodal v-if="showModal" @emitCloseModal="closeModal" :_selectedId="selectedProjectId"></mymodal> -->
		<mymodal v-if="showModal" @emitCloseModal="closeModal" :_selectedPro="selectedProject"></mymodal>
	</f7-page>
</template>
<script>
import api from '../api/index';
import { mapActions, mapGetters } from 'vuex';
import navBar from './shared/NavBar.vue';
import projectCard from './shared/Card.vue';
import mymodal from "./shared/Modal.vue";

export default {
	name: 'projects',
	data() {
		return {
			showModal: false,
			selectedProject: null,
			searchInput: '',
			projectsToShow: null,
		}
	},
	components: {
		navBar,
		projectCard,
		mymodal
	},
	methods: {
		...mapActions({
			'fetchProjects' : 'fetchProjects',
			'setModalActive': 'setModalActive',
		}),
		openModal(pro) {
			// console.log(pro)
			// console.log("modal opening");
			this.selectedProject = pro;
			this.showModal = true;
			this.setModalActive(true);
		},
		closeModal() {
			// console.log("closing modal");
			this.setModalActive(false);
			// this.showModal = false;
		}
	},
	mounted() {
		// this.fetchProjects().then( () => {
		// 	this.projectsToShow = this.getProjects;
		// });
		
	},
	computed: {
		...mapGetters({
			'getProjects' : 'getProjects',
			'getModalActive': 'getModalActive',
		}),
		projectsArr:  function () {
			if(this.searchInput === ""){
				// console.log("getprojects")
				return this.getProjects;
			} else {
				// console.log('projects to show')
				return this.projectsToShow;
			}
    }
	},
	watch: {
		searchInput: {
			handler: function() {
				// console.log(this.searchInput);
				this.projectsToShow = [];
				let pros = JSON.parse(JSON.stringify(this.getProjects));
				for(var i = 0; i < pros.length; i++) {
					if(pros[i].title.toLowerCase().includes(this.searchInput.toLowerCase())){
						// console.log(i)
						this.projectsToShow.push(pros[i]);
					}
				}
      }
		},
    getModalActive: {
      handler: function() {
				this.showModal = this.getModalActive;
				// console.log('watcher')
        // console.log(this.getModalActive);
      }
    },
    deep: true
  },
}
</script>
<style lang="scss" scoped>
#projects {
	background: var(--theme-bg-color);
}
.project-cards-wrap {
	margin-top: 20px;
}

#projects .card-comp:nth-child(odd) {
	// border: 1px solid red;
	// background: #F7F7F7;
	background: var(--theme-secondary-color);
}

#search-input {
	padding-top: 5px;
	margin-left: 16px;
	line-height: 24px;
	font-size: 14px;
	height: 24px;
	width: 200px;
}
</style>