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
							<span v-for="(tag, i) in task.tags" :key="i">
								<badge :_badge_text="tag.tag_text"></badge>
							</span>
						</div>
					</div>
					<div class="task-users">
						<span class="task-desc-header">Working:</span>
						<div class="task-users-wrap">
							<span class="one-user" v-for="(user, i) in task.usrworking" :key="i">
								<badge class="user-avatar"
								:_badge_text="user.name.substring(0, 1) + user.surname.substring(0, 1)"
								:_img_placeholder="true"
								></badge>
								{{ user.name }} {{ user.surname }}
							</span>
						</div>
					</div>
				</f7-block>
				<div v-if="task" class="button-container">
					<div class="btn-wrapper">
						<f7-button fill class="task-btn add-btn" @click="editTask">Edit task</f7-button>
						<f7-button outline @click="goToNotifications" class="task-btn">Notifications</f7-button>
					</div>
				</div>
			</f7-tab>
			<f7-tab id="tab-2" class="page-content" @tab:show="tabActive">
				<f7-block class="messages-wrap">
					<div class="msg-filter-wrapper">
						<span>
							<input type="radio" name="msg-radio" value="messages" 
							:checked="selectedFilter === 'messages'" 
							@change="filterFeed($event.target.value)">Messages
						</span>
						<span>
							<input type="radio" name="msg-radio" value="statuses" 
							:checked="selectedFilter === 'statuses'" 
							@change="filterFeed($event.target.value)">Events
						</span>
						<span>
							<input type="radio" name="msg-radio" value="files" 
							:checked="selectedFilter === 'files'" 
							@change="filterFeed($event.target.value)">Files
						</span>
						<span>
							<input type="radio" name="msg-radio" value="all" 
							:checked="selectedFilter === 'all'" 
							@change="filterFeed($event.target.value)">All
						</span>
					</div>
					<msgCard class="msg-comp" v-for="(msg, i) in taskFeed" :key="i" :_msg="msg" ></msgCard>
				</f7-block>
				<div class="input-container">
					<div class="msg-input-wrap">
						<f7-button fill class="msg-btn" @click="selectFile"><f7-icon material="attach_file" size="16px"></f7-icon></f7-button>
						<f7-input  class="msg-input" type="text" placeholder="New message" :value="inputMsg" @change="inputMsg = $event.target.value"></f7-input>
						<f7-button fill class="msg-btn send-btn" @click="sendMsg"><f7-icon material="send" size="16px"></f7-icon></f7-button>
					</div>
				</div>
			</f7-tab>
		</f7-tabs>
	</f7-page>
</template>

<script>
import api from "../api/index";
import navBar from './shared/NavBar.vue';
import badge from './shared/Badge.vue';
import msgCard from './shared/MsgCard.vue';
import Dom7 from 'dom7';
var $$ = Dom7;

export default {
	components: {
		navBar,
		badge,
		msgCard,
	},
	data() {
		return {
			currentTaskId: null,
			task: null,
			taskFeed: null,
			inputMsg: null,
			selectedFilter: 'all',
			scrollDone: false,
		}
	},
	mounted() {
		if (this.$f7route.context) {
			// console.log(this.$f7route.context.taskId);
			this.currentTaskId = this.$f7route.context.taskId;
      let params = {
        taskId: this.currentTaskId
      }
      api.getOneTask(params).then(res => {
        console.log(res)
				this.task = res.data.data[0];
			});

			this.filterFeed(this.selectedFilter);
		}
	},
	methods: {
		tabActive() {
			if(!this.scrollDone) {
				$$('.page-content').scrollTo(0, document.querySelector("#tab-2").scrollHeight, 800, () => {
						console.log('scroll done')
						this.scrollDone = true;
					}
				);
			}
		},
		selectFile() {
			console.log("todo - select file and upload")
			// select file
			// alert with are you sure you want to upload
			// then upload and refresh feed
		},
		filterFeed(val) {
			this.selectedFilter = val;
			let feedParams = {
				fedid:	0,
				pravac:	'start',
				type:	val,
				searchstring: ''
			}
			api.getTaskFeed(this.currentTaskId, feedParams).then( res => {
				console.log(res);
				this.taskFeed = res.data.data;
			});
		},
		sendMsg() {
			// console.log(this.inputMsg);
			let formData = new FormData();
			formData.append("type", 'text');
			formData.append("text", this.inputMsg);
			api.sendMessage(this.currentTaskId, formData).then( res => {
				if(res.data.status === "OK"){
					this.inputMsg = '';
					this.filterFeed(this.selectedFilter);
				}else{
					console.log(res.data.status);
				}
			})
			// type=file and file=myfile if sending attachment
		},
		editTask() {
			this.$f7router.navigate('/edittask/',{ context: { task: this.task } });
		},
		goToNotifications() {
			this.$f7.views.main.router.navigate('/feed/');
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
	padding-top: 30px;
	position: relative;
}

.task-info-wrapper {
	min-height: 85vh;
}

.task-info-wrapper div{
	margin-bottom: 20px;
}

.task-desc {
	display: flex;
	flex-direction: column;
	font-size: 12px;
	overflow-wrap: break-word;
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
	align-items: flex-start;
}

.task-users-wrap {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	min-height: 80px;
}

.task-status, .task-date, .task-deadline .task-users-wrap {
	font-size: 14px;
}

.one-user {
	align-items: flex-start;
}

.user-avatar {
	margin-right: 10px;
	margin-top: -3px;
}
.add-btn {
	background: #19D082;
	border: 1px solid #19D082;
}

.msg-filter-wrapper {
	display: flex;
	height: 30px;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
}

.msg-filter-wrapper span {
	display: flex;
	align-items: center;
}

input[type="radio"] {
	-webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
	transform: scale(1.5);
	margin: 0 5px 0 0;
	padding: 0;
}

.messages-wrap {
	min-height: 85%;
}

.messages-wrap .msg-comp:nth-child(even) {
	background: var(--theme-secondary-color);
}

.input-container {
	background: var(--theme-bg-color);
	position: sticky;
	left: 0;
	bottom: 0px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	z-index: 5;
}

.msg-input-wrap {
	background: var(--theme-bg-color);
	border: solid 1px var(--light-gray);
	border-radius: 5px;
	padding: 2%;
	margin-bottom: 25px;
	width: 82%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

.msg-btn {
	background: var(--f7-theme-color);
	width: 34px;
	height: 34px;
}

.send-btn {
	background: #19D082
}

.msg-btn i {
	transform: rotate(315deg) translateY(-2px) translateX(2px);
	
}

.msg-input {
	width: 90%;
	padding: 5px 0 0 5px;
	margin: 0 10px;
}

</style>