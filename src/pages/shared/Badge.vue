<template>
  <div class="badge" :class="{ 'admin-badge': _admin_badge, 'notification-badge': _notification, 'low': _low, 'med': _med, 'high': _high }">
    <span v-if="_badge_text">{{_badge_text}}</span>
    <span v-if="_admin_badge">ADMIN</span>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  props: [
    '_badge_text',
    '_admin_badge',
    '_notification',
    '_low',
    '_med',
    '_high'
  ],
}
</script>

<style scoped>
.badge {
  height: 16px;
  width: auto;
  color:white;
  background: rgb(245,180,104);
  background: linear-gradient(180deg, rgba(245,180,104,1) 44%, rgba(242,155,36,1) 100%); 
  border-radius: 3px;
  line-height: 16px;
  padding: 0 4px;
  margin: 4px 2px;
}
.admin-badge {
  background: rgb(167, 6, 6);
  width: 55px ;
  text-align: center;
  font-weight: 600;
  margin-left: 10px;
}
.notification-badge {
  margin: 0 0 0 4px;
  border-radius: 3px;
  min-height: 20px;
  min-width: 20px;
  max-height: 20px;
  max-width: 20px;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  font-weight: 600; 
  background: #e9d040;
}

.low , .med , .high {
  height: 22px;
  line-height: 24px;
  text-align: center;
  width: 55px;
}

.low {
  background: #19D082;
}

.med {
  background: #F7DC49;
}

.high {
  background: #D34242;
}
</style>