<template>
<f7-app :params="f7params" >

  <!-- Left panel with cover effect-->
  <!-- <f7-panel left cover theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Left Panel"></f7-navbar>
        <f7-block>Left panel content goes here</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel> -->


  <!-- Right panel with cover effect-->
  <f7-panel right cover class="panel-sidebar">
    <f7-view class="sidebar-view">
      <f7-page>
        <!-- <f7-navbar title="Omni Tasker"></f7-navbar> -->
        <f7-block class="nav-menu-links">
          <f7-list no-hairlines>
            <f7-list-item>
              <div class="nav-header-wrap">
                <span><b>Pro</b> Manager</span>
                <f7-button @click="closeRightPanel" class="close-nav-btn"><f7-icon material="clear" size="1.7rem"></f7-icon></f7-button>
              </div>
            </f7-list-item>
            <f7-list-item @click="goToProjects"><span><f7-icon material="layers" size="24px"></f7-icon>   Projects</span></f7-list-item>
            <f7-list-item @click="goToFeed"><span><f7-icon material="markunread_mailbox" size="22px"></f7-icon>   Notifications</span></f7-list-item>
            <f7-list-item @click="goToProfile"><span><f7-icon material="account_circle" size="22px"></f7-icon>   Profile</span></f7-list-item>
            <f7-list-item v-if="this.getUser" @click="goToProfile"><span><f7-icon material="exit_to_app" size="22px"></f7-icon>   Log out</span></f7-list-item>
          </f7-list>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>


  <!-- Popup -->
  <!-- <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup> -->

  <!-- <f7-login-screen id="my-login-screen">
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen> -->
</f7-app>
</template>
<script>
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'dev.slobodansesto.promanager', // App bundle ID
          name: 'ProManager', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {
              user: {
                firstName: 'John',
                lastName: 'Doe',
              },

            };
          },

          // App routes
          routes: routes,


          // Input settings
          input: {
            scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
            scrollIntoViewCentered: this.$device.cordova && !this.$device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },

        // Login screen data
        username: '',
        password: '',
      }
    },
    methods: {
      ...mapActions({
        'setModalActive': 'setModalActive',
      }),
      alertLoginData() {
        this.$f7.dialog.alert('Username: ' + this.username + '<br>Password: ' + this.password);
      },
      goToFeed() {
        this.$f7.panel.close();
        this.$f7.views.main.router.navigate('/feed/');
      },
      goToProfile() {
        this.$f7.panel.close();
        this.$f7.views.main.router.navigate('/profile/');
      },
      goToProjects() {
        this.$f7.panel.close();
        this.$f7.views.main.router.navigate('/projects/');
      },
      closeRightPanel() {
        this.$f7.panel.close();
      }
    },
    computed: {
      ...mapGetters({
        'getModalActive': 'getModalActive',
        'getUser': 'getUser', 
      })
	  },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (f7.device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here

        // setting user selected theme
        // console.log(localStorage.getItem("dark_theme"));
        if( localStorage.getItem("dark_theme") === 'true' ) {
          // console.log('setting theme to dark');
          this.$f7.root[0].style.setProperty('--theme-bg-color', '#191a1d');
          this.$f7.root[0].style.setProperty('--theme-font-color', '#ffffff');
          this.$f7.root[0].style.setProperty('--theme-secondary-color', '#1d2124');
          this.$f7.root[0].style.setProperty('--theme-primary-color', '#31353e');
        } else {
          // console.log('setting theme to light');
          this.$f7.root[0].style.setProperty('--theme-bg-color', '#ffffff');
          this.$f7.root[0].style.setProperty('--theme-font-color', '#808080');
          this.$f7.root[0].style.setProperty('--theme-secondary-color', '#F7F7F7');
          this.$f7.root[0].style.setProperty('--theme-primary-color', '#31353e');
        }
      });

      // back button listener
      document.addEventListener("backbutton", () => {
        // console.log(this.$f7.panel);
        // console.log(this.$f7.panel.opened);
        if(this.getModalActive) {
          this.setModalActive(false);
        }else if(this.$f7.panel.right.opened){
          this.$f7.panel.close();
        }else{
          this.$f7.views.main.router.back()
        }
      	return true;
      }, false);
    }
  }
</script>

<style>
 /* sidebar styles */
.panel-sidebar {
  font-family: 'Saira', sans-serif;
  /* color: var(--theme-font-color); */
  border-radius: 12px;
  right: -10px;
}
.sidebar-view {
  border-radius: 12px;
}
.panel-right.panel-cover::after {
  background: none;
}
.panel-sidebar .navbar::before,
.panel-sidebar .simple-list li::after,
.panel-sidebar .links-list a::after,
.panel-sidebar .list .item-inner::after {
  content: none;
}
.nav-menu-links {
  position: relative;
  top: -25px;
}
.list > ul:nth-child(1),
div#framework7-root.framework7-root div.panel-sidebar.panel.panel-right.panel-cover div.sidebar-view.view div.page.page-current div.page-content {
  background: var(--theme-secondary-color);
  color: var(--theme-font-color);
}
.nav-header-wrap {
  width: 100%;
  margin: 0;
  top: 0;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  color: var(--f7-theme-color);
}
.close-nav-button {
  height: 1.8rem;
  width: 1.8rem;
}

</style>