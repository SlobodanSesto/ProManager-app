<template>
  <f7-block class="msg-card">
    <div class="inner-wrap"  @click="goToTask(_msg.tsk_id)"><!-- row -->
      <div class="img-wrap">
        <!-- img -->
        <img v-if="_msg.usrimg" :src="getImgSrc"/>
        <!-- or if feed this will be a link to
         a task with the id sent as context obj-->
      </div>
      <div class="msg-data-wrap"><!-- this one needs to be flex col 100%-->
        <div class="msg-top"><!-- row 100%-->
          <!-- name -->
          <span>{{_msg.usr_name}} {{_msg.usr_surname}}</span>
          <!-- date -->
          <span>{{_msg.fed_time.substring(11, _msg.fed_time.length)}}<f7-icon material="star_border" size="18px"></f7-icon></span>
        </div>

        <!-- another div should go here if _feed with task name and project name -->
        <div v-if="_feed">
          Project: {{_msg.pro_name}}
        </div>
        <div class="msg-body-wrap"><!-- row 100%- -->
          <!-- msg -->
          {{_msg.fed_text}}
        </div>
      </div>
    </div>
  </f7-block>
</template>

<script>
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
export default {
  props: [
    '_msg',
    '_feed'
  ],
  methods: {
    goToTask(id) {
      if(this._feed) {
        this.$f7router.navigate('/onetask/',{ context: { taskId: id } });
      }
    },
  },
  computed: {
    getImgSrc() {
      let sid = localStorage.getItem("sid")
      // return 'http://695u121.mars-t.mars-hosting.com/mngapi/' + this._msg.usrimg + '?sid=' + sid;
      return "";
    }
  }
  
}
</script>

<style scoped>
.msg-card {
  color: var(--theme-font-color);
  padding: 10px;
  /* height: 80px; */
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin: 7px 0;
  /* border: 1px solid red;	 */
}

.inner-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.img-wrap {
  min-height: 60px;
  min-width: 60px;
  max-height: 60px;
  max-width: 60px;
  background: rgb(255, 242, 61);
  border-radius: 4px;
  margin-right: .5rem;
}

.img-wrap img {
  border-radius: 4px;
  object-fit: cover;
  height: 60px;
  width: 60px;
}

.msg-data-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.msg-top {
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.msg-body-wrap {
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow-wrap: break-word;
}

</style>