<template>
  <div class="notification-container" :style="{ backgroundColor: background }">
    <span class="material-icons" v-if="icon"> {{ icon }} </span>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    background: {
      type: String,
      default: "#249c24",
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style>
.notification-container {
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 20px;
  border-radius: 5px;
  padding: 0 10px;
  position: fixed;
  right: 15px;
  bottom: 20px;
  height: 60px;
  width: 350px;
}

.notification-container .material-icons {
  font-size: 30px;
}

.notification-container p {
  margin-left: 10px;
}
</style>