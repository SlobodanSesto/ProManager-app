<template>
  <f7-page id="profile">
		<navBar :_title="'Profile'" :_backButton="true" :_burger="true"></navBar>
		<div v-if="this.user" class="profile-wrapper">
			<!-- {{user.email}}
			{{user.fcm}}
			{{user.getemail}}
			{{user.name}}
			{{user.surname}}
			{{user.usr_id}}
			{{user.utc}} -->
			<div class="img-wrapper">
				<div class="pro-img"></div>
			</div>
			<div class="info-wrapper">
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Name: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-input type="text" clear-button></f7-input>
							</span>
						</f7-col>
					</f7-row>	
				</div>	
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Surname: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-input type="text" clear-button></f7-input>
							</span>
						</f7-col>
					</f7-row>	
				</div>	
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Email: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-input type="text" clear-button></f7-input>
							</span>
						</f7-col>
					</f7-row>	
				</div>	
				<div class="info-line">		
					<f7-row>
						<f7-col>
							<span>Password: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-input type="text" clear-button></f7-input>
							</span>
						</f7-col>
					</f7-row>	
				</div>	
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Confirm password: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-input type="text" clear-button></f7-input>
							</span>
						</f7-col>
					</f7-row>	
				</div>	
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Email notification: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-list-item checkbox ></f7-list-item>
							</span>
						</f7-col>
					</f7-row>	
				</div>
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Change theme: </span>
						</f7-col>
						<f7-col>
							<div class="theme-wrap">
								<div class="theme-select" @click="changeTheme('light')"></div>
								<div class="theme-select dark" @click="changeTheme('dark')"></div>
							</div>
						</f7-col>
					</f7-row>	
				</div>
			</div>
			<div class="button-container">
				<div class="btn-wrapper">
					<f7-button fill class="profile-btn save-btn" @click="saveChanges">Save</f7-button>
					<f7-button outline class="profile-btn">Cancel</f7-button>
				</div>
			</div>
		</div>
	</f7-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import navBar from './shared/NavBar.vue';

export default {
	data() {
    return {
			user: null,
    }
	},
	components: {
		navBar
	},
  computed: {
    ...mapGetters({
      getUser: 'getUser', 
    })
	},
	mounted() {
		this.user = this.getUser;
	},
	methods: {
		saveChanges() {
			// todo save changes and push home
			this.$f7router.navigate('/projects/');
		},
		changeTheme(theme) {
			//setting dark
			if(theme === 'dark') {
				this.$f7.root[0].style.setProperty('--theme-bg-color', '#191a1d');
				this.$f7.root[0].style.setProperty('--theme-font-color', '#ffffff');
				this.$f7.root[0].style.setProperty('--theme-secondary-color', '#1d2124');
				this.$f7.root[0].style.setProperty('--theme-primary-color', '#31353e');
				localStorage.setItem("dark_theme", true);
			} else {
				this.$f7.root[0].style.setProperty('--theme-bg-color', '#ffffff');
				this.$f7.root[0].style.setProperty('--theme-font-color', '#808080');
				this.$f7.root[0].style.setProperty('--theme-secondary-color', '#F7F7F7');
				this.$f7.root[0].style.setProperty('--theme-primary-color', '#31353e');
				localStorage.setItem("dark_theme", false);
			}
			// light theme 
			// font color #272b29
			// bg #ffffff
			// 2nd #808080
			// primary #31353e
		}
	}
}
</script>

<style scoped>
#profile {
	background: var(--theme-bg-color);
}
.block.profile-wrapper {
	width: 100%;
	height: 90%;
	padding: 0 25px;
	margin: 0;
	display: flex;
	flex-direction: column;
}
.img-wrapper{
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 30px 0;
}

.pro-img {
	border-radius: 5px;
	width: 100px;
	height: 100px;
	background: rgb(248, 235, 56);
}

.info-wrapper {
	padding-bottom: 70px;
	padding-left: 20px;
	color: var(--theme-font-color);
	font-family: 'Saira', sans-serif;
	font-size: 16px;
}
input {
	border: 1px solid var(--theme-font-color) !important;
}
.info-line {
	height: 45px;
	width: 100%;
}
.theme-wrap {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
}
.theme-select {
	width: 45px;
	height: 25px;
	background: white;
	border: 2px solid var(--light-gray);
	border-radius: 4px;
}
.dark {
	margin: 0 5px;
	background: #2c2c2c
}
/* .button-container {
	height: 100%;
	border: 1px solid red;
} */

.btn-wrapper {
	position: fixed;
	right: 0;
	bottom: 20px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}

.profile-btn {
	height: 40px;
	width: 40%;
	border: 1px solid var(--f7-theme-color);
	font-family: 'Saira', sans-serif;
	font-weight: 400;
	text-transform: capitalize;
	font-size: 16px;
	line-height: 2.2rem;
}

.save-btn {
	background: var(--f7-theme-color);
}
</style>