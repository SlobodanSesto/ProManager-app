<template>
  <div class="modal-wrap">
		<div class="my-modal">
			<div v-if="showInfo" class="modal-content">

				<div class="modal-header">
					<span class="pro-header-title">{{this.project.title}}</span>
					<f7-button class="close-modal-btn" @click="closeModal"><f7-icon material="clear" size="28px"></f7-icon></f7-button>
				</div>

				<div class="info-wrapper">
					<div v-if="this.project.tags.length > 0" class="project-tags">
						<span>Tags: </span>
						<div class="tags-wrap">
							<span v-for="(tag, i) in this.project.tags" :key="i">
								<!-- {{tag.tag_id}} {{tag.tag_text}} -->
								<badge :_badge_text="tag.tag_text"></badge>
							</span>
						</div>
					</div>
					<div class="project-users">
						<span>Users:</span>
						<div class="users-wrap">
							<span class="one-user" v-for="(user, i) in this.project.users" :key="i">
								{{ user.name }} {{ user.surname }} <badge v-if="user.admin === 'true'" :_admin_badge="true"></badge>
							</span>
						</div>
					</div>
					<div v-if="this.project.deadline" class="project-date">
						<span>Due date: {{this.project.deadline}}</span>
					</div>
					<div class="project-stats">
						<div class="user-count">
							<span><f7-icon material="group" size="16px"></f7-icon> Users on project:</span>
							<span>{{this._selectedPro.users_count}}</span>
						</div>
						<div class="tasks-in-progress">
							<span><f7-icon material="sync" size="16px"></f7-icon> Tasks in progress:</span>
							<span>{{this._selectedPro.inprogress_tasks}}</span>
						</div>
						<div class="cancelled-tasks">
							<span><f7-icon material="block" size="16px"></f7-icon> Cancelled tasks:</span>
							<span>{{this._selectedPro.cancelled_tasks}}</span>
						</div>
						<div class="failed-tasks">
							<span><f7-icon material="highlight_off" size="16px"></f7-icon> Failed tasks:</span>
							<span>{{this._selectedPro.failed_tasks}}</span>
						</div>
						<div class="completed-tasks">
							<span><f7-icon material="done" size="16px"></f7-icon> Completed tasks:</span>
							<span>{{this._selectedPro.completed_tasks}}</span>
						</div>
					</div>
				</div>
				
			</div>
			<f7-preloader v-if="!showInfo" color="blue" ></f7-preloader>
			<div class="pro-btn-container">
				<div class="project-btn-wrap">
					<f7-button fill class="notification-btn edit-pro-btn">Edit project</f7-button>
					<f7-button outline class="notification-btn">Notifications</f7-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import api from '../../api/index';
import { mapGetters, mapActions } from 'vuex';
import badge from './Badge';

export default {
	components: {
		badge,
	},
  data() {
		return {
			showInfo: false,
			project: null,
		}
	},
	props: [
		'_selectedPro'
	],
	mounted() {
		// console.log("modal mounted hook");
		console.log(this._selectedPro);
		let params = {
			proId: this._selectedPro.id
		}
		api.getOneProject(params).then( res => {
			this.project = res.data.data;
			console.log(this.project);
			this.showInfo = true;
		});
	},
	computed: {
		...mapGetters({
			getModalActive: 'getModalActive'
		})
	},
	methods: {
		...mapActions({
			'setModalActive': 'setModalActive'
		}),

		closeModal() {
			// console.log("close modal action")
			// this.setModalActive(false);
			this.$emit('emitCloseModal');
		}
	}
}
</script>

<style >
	.modal-wrap {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999 !important;
	}
	.my-modal {
		border-radius: 6px;
		width: 80%;
		height: 80%;
		background-color: var(--theme-bg-color);
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15), 0 25px 30px 0 rgba(0,0,0,0.35);
		overflow: scroll;
	}

	.modal-content{
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0px;
	}
	.info-wrapper {
		width: 86%;
		color: var(--light-gray);
		min-height: 63vh;
		padding-bottom: 40px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	.info-wrapper .icon {
		border-radius: 3px;
		padding: 2px;
		margin-bottom: 3px;
		margin-right: 4px;
		background: var(--f7-theme-color);
		color: white;
	}
	.project-stats{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.project-stats div {
		display: flex;
		font-size: 15px;
		line-height: 22px;
		margin-top: 15px;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}
	.project-tags {
		display: flex;
		flex-direction: row;
	}
	.tags-wrap{
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 10px;
	}
	.project-users {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: flex-start;
	}
	.users-wrap {
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: flex-start;
		padding-left: 10px;
		width: 100%;
	}
	.one-user {
		display: flex;
		flex-direction: row;
	}

	.pro-btn-container {
		background: var(--theme-bg-color);
		position: sticky;
		border-radius: 5px;
		bottom: 0;
		width: 100%;
		padding-bottom: 20px;
	}

	.project-btn-wrap {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		z-index: 3;
	}

	.notification-btn {
		height: 40px;
		background: var(--theme-bg-color);
		width: 42%;
		border: 1px solid var(--f7-theme-color);
		font-family: 'Saira', sans-serif;
		font-weight: 400;
		text-transform: capitalize;
		font-size: 13px;
		line-height: 2.2rem;
	}

	.edit-pro-btn {
		background: var(--f7-theme-color);
	}

	.modal-header {
		width: 86%;
		margin: 14px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}
	.pro-header-title {
		text-transform: capitalize;
		color: var(--f7-theme-color);
		font-weight: 500;
		font-size: 20px;
	}
	.close-modal-btn {
		padding: 0;
	}
</style>