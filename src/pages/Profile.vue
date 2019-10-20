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
			<div @click="selectImage" class="img-wrapper">
				<div  class="pro-img">
					<img v-if="show && !imgChanged" :src="dbImg" alt="">
					<img v-if="imgChanged" :src="imgURLCopy" alt="">
				</div>
			</div>
			<div class="info-wrapper">
				<div class="info-line">
					<f7-row>
						<f7-col>
							<span>Name: </span>
						</f7-col>
						<f7-col>
							<span>
								<f7-input class="input-field" 
								type="text" 
								clear-button 
								:value="user.name" 
								@input='user.name = $event.target.value'></f7-input>
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
								<f7-input class="input-field" 
								type="text" 
								clear-button 
								:value="user.surname" 
								@input='user.surname = $event.target.value'></f7-input>
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
								<f7-input class="input-field" 
								type="email" 
								clear-button 
								:value="user.email" 
								@input='user.email = $event.target.value'></f7-input>
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
								<f7-input class="input-field" 
								type="password" 
								clear-button
								:value="pass" 
								@input='pass = $event.target.value'></f7-input>
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
								<f7-input class="input-field" 
								type="password" 
								clear-button
								:value="confPass" 
								@input='confPass = $event.target.value'></f7-input>
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
								<f7-list-item checkbox :checked="user.getemail > 0" @change="user.getemail = $event.target.checked" ></f7-list-item>
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
					<f7-button fill class="task-btn save-btn" @click="saveChanges">Save</f7-button>
					<f7-button outline class="task-btn" @click="goBack">Cancel</f7-button>
				</div>
			</div>
		</div>
	</f7-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import navBar from './shared/NavBar.vue';
import api from '../api/index';

export default {
	data() {
    return {
			user: null,
			imgURLCopy: null,
			imageData: null,
			show: false,
			dbImg: null,
			infoEdited: false,
			imgChanged: false,
			ct: 0,
			pass: '',
			confPass: '',
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
		this.setCurrentRoute('/profile/');
		this.user = this.getUser;
		api.hasImage().then( res => {
			if(res.data.data === 1) {
				this.dbImg = 'http://695u121.mars-t.mars-hosting.com/mngapi/auth/users/img?sid=' + localStorage.getItem("sid");
				this.show = true;
			}
		})

	},
	methods: {
		...mapActions({
			'setCurrentRoute': 'setCurrentRoute',
		}),
		selectImage() {
			let options = {
        quality: 80,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          mediaType: Camera.MediaType.PICTURE,
          encodingType: Camera.EncodingType.PNG,
      };
      navigator.camera.getPicture(
        this.cameraSuccess,
        this.cameraError,
        options
      );
		},
		b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512
      var byteCharacters = atob(b64Data)
      var byteArrays = []
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				var slice = byteCharacters.slice(offset, offset + sliceSize)
				var byteNumbers = new Array(slice.length)
				for (var i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i)
				}
				var byteArray = new Uint8Array(byteNumbers)
				byteArrays.push(byteArray)
			}
			var blob = new Blob(byteArrays, {type: contentType})
			return blob
    },
    // cameraSuccess(dataURL) {
    //   console.log("success", dataURL);
    //   dataURL = 'data:image/jpeg;base64,' + dataURL;
    //   this.imgURLCopy = dataURL;
		// 	this.imgChanged = true;
		// 	var block = dataURL.split(';')
		// 	var contentType = block[0].split(':')[1]
		// 	var realData = block[1].split(',')[1]
		// 	this.imageData = this.b64toBlob(realData, contentType);
    // },
    // cameraError(e) {
    //   console.log(e);
		// },
		cameraSuccess(dataURL) {
      console.log("success", dataURL);
      this.imgURLCopy = 'data:image/jpeg;base64,' + dataURL;
			// this.loadXHR(dataURL).then( blob => {
			// 	// here the image is a blob
			// 	this.imageData = blob;
			// 	this.imgChanged = true;
			// });
			fetch(this.imgURLCopy)
				.then(res => res.blob())
				.then(blob => {
					console.log(" blob done ")
					this.imageData = blob;
					this.imgChanged = true;
				})

		},
		// loadXHR(url) {
    // 	return new Promise(function(resolve, reject) {
    //     try {
		// 			var xhr = new XMLHttpRequest();
		// 			xhr.open("GET", url);
		// 			xhr.responseType = "blob";
		// 			xhr.onerror = function() {reject("Network error.")};
		// 			xhr.onload = function() {
		// 				if (xhr.status === 200) {resolve(xhr.response)}
		// 				else {reject("Loading error:" + xhr.statusText)}
		// 			};
		// 			xhr.send();
    //     }
    //     catch(err) {reject(err.message)}
  	// 	});
		// },
    cameraError(e) {
      console.log(e);
		},

		saveChanges() {
			// todo save changes and push home
			if(this.pass === this.confPass) {
				if(this.pass !== '' || this.infoEdited || this.imgChanged) {
					if(this.imgChanged) {
						let formData = new FormData();
						formData.append("img", this.imageData);
						api.saveNewImage(formData).then( response => {
							console.log(response);
						})
					}
					let data = new FormData();
					data.append("email", this.user.email);
					data.append("name", this.user.name);
					data.append("surname", this.user.surname);
					data.append("pass", this.confPass);
					if(this.user.getemail) {
						data.append("gatemail", 1);
					} else {
						data.append("gatemail", 0);
					}
					
					api.saveUserInfo(data).then( res => {
						console.log(res)
					})
					this.$f7router.navigate('/projects/');
				}
				this.$f7router.navigate('/projects/');
			}
		},
		goBack() {
			this.$f7.views.main.router.back()
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
	}, 
	watch: {
		user: {
      handler: function() {
				if(this.ct >= 1) {
					console.log("user info changed");
					this.infoEdited = true;
				}
				this.ct++;
			},
			deep: true
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

.img-wrapper img {
	width: 100px;
	height: 100px;
	object-fit: cover;
	border-radius: 5px;
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
.input-field {
	border-bottom: 1px solid var(--theme-font-color);
	z-index: 0;
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

/* .btn-wrapper {
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
} */

.save-btn {
	background: var(--f7-theme-color);
}
</style>