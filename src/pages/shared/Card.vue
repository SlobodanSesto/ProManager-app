
<template>
  <f7-block class="display-card">

		<div class="top-row" @click="goTo(_id)" >
			<span class="title">{{_name}}</span>
			<badge v-if="_project_obj && _project_obj.unseen_feed > 0" :_badge_text="_project_obj.unseen_feed+''" :_notification="true"></badge>
			<badge v-if="_task_obj && _task_obj.unseen_feed > 0" :_badge_text="_task_obj.unseen_feed+''" :_notification="true"></badge>
		</div>
		
		<span class="date">Date Created:  <span class="date-value">{{_date}}</span></span>

		<span>
			<!-- <f7-link v-if="!_is_task" popover-open=".project-popover">Project info</f7-link> -->
			<f7-link v-if="!_is_task" @click="openInfo(_project_obj)">Project info</f7-link>
			<f7-link v-if="_is_task" >ID: {{_id}}</f7-link>
		</span>

	</f7-block>
</template>

<script>
import api from "../../api/index";
import badge from "./Badge.vue";

export default {
	props: [
		'_name',
		'_date',
		'_id',
		'_project_obj',
		'_task_obj',
		'_is_task'
	],
	data() {
		return {
		}
	},
	components: {
		badge,
	},
	mounted() {

	},
	methods: {
		goTo(id) {
			console.log(id);
			if(this._is_task){
				this.$f7router.navigate('/onetask/',{ context: { taskId: id } });
			}else{
				this.$f7router.navigate('/tasks/',{ context: { proId: id } });
			}
		},
		openInfo(id) {
			console.log(id);
			this.$emit('selectedPro', id);
		}
	}
}
</script>

<style>
	.display-card {
		color: var(--theme-font-color);
		padding: 10px;
		display: flex;
		flex-direction: column;
		border-radius: 5px;
		margin: 7px 0;
		/* border: 1px solid red;	 */
	}

	.top-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.title {
		font-size: 15px;
		font-weight: 500;
	}

	.date {
		font-size: 14px;
		font-weight: 400;
	}
	.date-value {
		font-size: 11px;
		font-weight: 300;
	}
</style>