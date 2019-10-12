<template>
	<f7-page id="one-task">
		<navBar class="one-task-nav" v-if="task" :_title="task.tsk_title" :_backButton="true" :_burger="true"></navBar>
		<f7-toolbar class="task-tabs-nav" tabbar no-hairline top>
			<f7-link tab-link="#tab-1" tab-link-active>Task info</f7-link>
			<f7-link tab-link="#tab-2">Messages</f7-link>
		</f7-toolbar>
		<div class="tabs-border-bottom"></div>
		<f7-tabs swipeable>
			<f7-tab id="tab-1" class="page-content" tab-active>
				<f7-block class="task-info-wrapper" v-if="task">
					<div class="task-desc">
						<span class="task-desc-header">Descreption:</span>
						<span>{{task.description}}</span>
					</div>
					<div v-if="task.pri_text" class="task-priority">
						<span class="task-desc-header">Priority: </span>
						<badge 
						:_badge_text="task.pri_text" 
						:_low="task.pri_id === 1" 
						:_med="task.pri_id === 2"
						:_high="task.pri_id === 3"
							></badge>
					</div>
					<div class="task-status">
						<span class="task-desc-header">Task events: </span>
						<span>{{task.sta_text}}</span>
					</div>
					<div class="task-creator">
						<span class="task-desc-header">Created by: </span>
						<span>{{task.usr_creator_name}} {{task.usr_creator_surname}}</span>
					</div>
					<div v-if="task.tsk_timecreated" class="task-date">
						<span class="task-desc-header">Created date: </span>
						<span>{{task.tsk_timecreated}}</span>
					</div>
					<div v-if="task.tsk_deadline" class="task-deadline">
						<span class="task-desc-header">Deadline: </span>
						<span>{{task.tsk_deadline}}</span>
					</div>
					<div v-if="task.tags > 0" class="task-tags">
						<span class="task-desc-header">Tags: </span>
						<div class="tags-wrap">
							<span v-for="tag in task.tags">
								<badge :_badge_text="tag.tag_text"></badge>
							</span>
						</div>
					</div>
					<div class="task-users">
						<span class="task-desc-header">Users:</span>
						<div class="task-users-wrap">
							<span class="one-user" v-for="user in task.usrworking">
								{{ user.name }} {{ user.surname }}
							</span>
						</div>
					</div>
				</f7-block>
			</f7-tab>
			<f7-tab id="tab-2" class="page-content">
				<f7-block>
					<h1 > got task {{task}}</h1>
				</f7-block>
			</f7-tab>
		</f7-tabs>
	</f7-page>
</template>

<script>
import api from "../api/index";
import navBar from './shared/NavBar.vue';
import badge from './shared/Badge.vue';

export default {
	components: {
		navBar,
		badge,
	},
	data() {
		return {
			task: null,
		}
	},
	mounted() {
		if (this.$f7route.context) {
      console.log(this.$f7route.context.taskId);
      let params = {
        taskId: this.$f7route.context.taskId
      }
      api.getOneTask(params).then(res => {
        console.log(res)
				this.task = res.data.data[0];
      });
    }
	},
}
</script>

<style lang="scss" scoped>
#one-task {
	background: var(--theme-bg-color);
	color: var(--theme-font-color);
}

.one-task-nav {
	position: fixed;
	z-index: 666;
	top: 0;
	overflow: hidden;
}

.task-tabs-nav {
	background: var(--theme-bg-color);
	position: fixed;
	z-index: 666;
	top: 50px;
}

.tab-link {
	color: #afafaf;
}

.tab-link-active {
	color: var(--f7-theme-color);
}

.toolbar-top::before, .ios .toolbar-top-ios::before, .md .toolbar-top-md::before, .aurora .toolbar-top-aurora::before {
	height: 5px;
	top: 46px;
}

#tab-1, #tab-2{
	padding-top: 50px;
}

.task-info-wrapper div{
	margin-bottom: 20px;
}

.task-desc {
	display: flex;
	flex-direction: column;
	font-size: 12px;
}

.task-desc-header {
	font-size: 16px;
	font-weight: 500;
	margin-right: 15px;
}

.task-priority {
	display: flex;
	height: 26px;
	flex-direction: row;
	align-items: baseline;
}

.task-users {
	display: flex;
	flex-direction: row;
	align-items: baseline;
}

.task-users-wrap {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.task-status, .task-date, .task-deadline .task-users-wrap {
	font-size: 14px;
}

</style>