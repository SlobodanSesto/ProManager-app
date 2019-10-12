<template>
  <f7-page id="home-view" name="home">
    <!-- <navBar :_title="'Omni Tasker'" :_backButton="true"></navBar> -->
    <!-- Top Navbar -->
    <!-- <f7-navbar :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Omni Tasker</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
      </f7-nav-right>
      <f7-nav-title-large sliding>Omni Tasker</f7-nav-title-large>
    </f7-navbar> -->
    <f7-block class="login-wrap">
      <f7-list class="login-form">
        <f7-list-input
          label="E-mail"
          type="email"
          placeholder="Your e-mail"
          clear-button
          :value="email"
          @input="email = $event.target.value"
        ></f7-list-input>
        <f7-list-input
          label="Password"
          type="password"
          placeholder="Your password"
          clear-button
          :value="pass"
          @input="pass = $event.target.value"
        ></f7-list-input>
        <f7-button large raised fill @click="login">LOGIN</f7-button>
      </f7-list>
    </f7-block>
    <!-- Toolbar-->
    <!-- <f7-toolbar bottom>
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar> -->
    <!-- Page content-->
    <!-- <f7-block strong>
      <p>Here is your blank Framework7 app. Let's see what we have here.</p>
    </f7-block>

    <f7-block-title>Navigation</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>

    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised popup-open="#my-popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#my-login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block> -->

    <!-- <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block> -->

    <!-- <f7-list>
      <f7-list-item
        title="Dynamic (Component) Route"
        link="/dynamic-route/blog/45/post/125/?foo=bar#about"
      ></f7-list-item>
      <f7-list-item
        title="Default Route (404)"
        link="/load-something-that-doesnt-exist/"
      ></f7-list-item>
      <f7-list-item
        title="Request Data & Load"
        link="/request-and-load/user/123456/"
      ></f7-list-item>
    </f7-list> -->

  </f7-page>
</template>
<script>
import api from '../api/index';
import { mapActions, mapGetters } from 'vuex';
import navBar from './shared/NavBar.vue';

export default {
  data() {
    return {
      email: "dpusic93@gmail.com",
      pass: "123",
    }
  },
  components: {
    navBar,
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser', 
    })
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      'setUser' : 'setUser',
    }),

    login() {
      const params = {
        email: this.email,
        pass: this.pass
      }
      //testing
      // this.$f7router.navigate('/projects/');
      api.loginApi(params).then( res => {
        console.log(res);
        if(res.data.status === 'ERR') {
          // display failed login msg
        } else if (res.data.status === 'OK') {
          // push to /projects route
          this.setUser(res.data.user);
          localStorage.setItem('sid', res.data.sid);
          this.$f7router.navigate('/projects/');
          console.log(this.getUser)
        } else {
          // an error occured
        }
      });
      
    }
  }
}
</script>
<style lang="scss" scoped>
#home-view {
  background: var(--theme-bg-color);
  color: var(--theme-font-color);
}
</style>