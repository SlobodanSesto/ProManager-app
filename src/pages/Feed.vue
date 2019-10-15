<template>
  <f7-page id="feed">
    <!-- nav -->
    <navBar :_title="'Notifications'" :_backButton="true" :_burger="true"></navBar>
  
    <!-- filter div with radio options and searchbar-->
    <div class="feed-top-wrap">
      <f7-input class="search-feed" type="text" outline placeholder="Filter items"></f7-input>
      
      <div class="feed-filter-wrapper">
        <span>
          <input type="radio" name="msg-radio" value="messages" 
          :checked="selectedFeedFilter === 'messages'" 
          @change="filterFeed($event.target.value)">Messages
        </span>
        <span>
          <input type="radio" name="msg-radio" value="statuses" 
          :checked="selectedFeedFilter === 'statuses'" 
          @change="filterFeed($event.target.value)">Events
        </span>
        <span>
          <input type="radio" name="msg-radio" value="files" 
          :checked="selectedFeedFilter === 'files'" 
          @change="filterFeed($event.target.value)">Files
        </span>
        <span>
          <input type="radio" name="msg-radio" value="all" 
          :checked="selectedFeedFilter === 'all'" 
          @change="filterFeed($event.target.value)">All
        </span>
      </div>
    </div>

    <f7-block class="feed-main-wrap" >  
      
      <!-- for each feed msg display msgCard -->
      <!-- msgCard will need a prop for feed to 
      display link to project/task and additional 
      info that differs from the tasks messages tab -->

      <!-- limit count 20 and when scrolling call for 20 more with offset -->

      <div v-if="feed">
        <msgCard class="card-comp" v-for="(f, i) in feed" :key="i" :_msg="f" :_feed="true" ></msgCard>
      </div>
      
    </f7-block>
  </f7-page>
</template>

<script>
  // type: all
  // searchstring: ""
  // offset:	0
  // count:	false
  //http://695u121.mars-t.mars-hosting.com/mngapi/users/feeds?type=all&searchstring=&offset=0&count=false&sid=zof9wzhw2lNLKMgxrqATobkSmp5eKXLk
  // for endless scroll offset by 20 more each time
  // type: all
  // searchstring: ""
  // offset:	20
  // count:	false
import api from '../api/index';
import navBar from './shared/NavBar.vue';
import msgCard from './shared/MsgCard.vue';

export default {
  data() {
    return {
      selectedFeedFilter: 'all',
      feed: null,
    }
  },
  components: {
    navBar,
    msgCard
  },
  mounted() {
    // get feed
    this.updateFeed();
  },
  methods: {
    filterFeed(filter) {
      this.selectedFeedFilter = filter;
      this.updateFeed();
      console.log(this.selectedFeedFilter)
    },
    updateFeed() {
      let params = {
        type: this.selectedFeedFilter,
        searchstring: "",
        offset:	0,
        count:	false,
      }
      api.getFeed(params).then( res => {
        console.log(res.data);
        this.feed = res.data.data;
// fed_id: 277194
// fed_important: 0
// fed_text: "Djfidudhsiyosyofosogsot"
// fed_time: "2019-10-15 10:25:25"
// fed_type: "message"
// pro_id: 234
// pro_name: "aaa"
// tsk_id: 569
// tsk_id_origin: 569
// tsk_title: "d"
// unseen: 0
// usr_name: "Danilo"
// usr_surname: "Pusic"
// usrimg: "users/63/img"
      });
    }
  }
}  
</script>

<style scoped>
#feed {
  background: var(--theme-bg-color);
}

.feed-main-wrap {
  margin-top: 1rem;
}

#feed .card-comp:nth-child(odd) {
	background: var(--theme-secondary-color);
}

.search-feed {
  height: 1.5rem;
  margin: 0 1.3rem .5rem 1.3rem; 
}

.feed-filter-wrapper {
	display: flex;
	height: 25px;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
}

.feed-filter-wrapper span {
	display: flex;
	align-items: center;
}

.feed-filter-wrapper input[type="radio"] {
	-webkit-transform: scale(1.5); /* Chrome, Safari, Opera */
	transform: scale(1.5);
	margin: 0 5px 0 0;
	padding: 0;
}
</style>