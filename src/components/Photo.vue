<template>
  <div class="container">
    <img :src="photo.url" :alt="photo.label" />
    <button @click="$emit('delete-photo', photo.id)">delete</button>
    <span>
      {{ photo.label }}
    </span>
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 30px;
  position: relative;

  transition: all 0.4s ease-out;
}

.container img {
  width: 100%;
  border-radius: 24px;

  transition: all 0.4s ease-out;
}

/* .container:hover::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 24px;
  z-index: 3;
} */

.container:hover button,
.container:hover span {
  opacity: 1;
}

.container button,
.container span {
  opacity: 0;
  z-index: 3;
  position: absolute;

  font-family: "Montserrat";
  transition: all 0.2s ease-out;
}

.container button {
  top: 18px;
  right: 18px;

  padding: 7px 14px;

  border: 1px solid #eb5757;
  background: none;
  border-radius: 12px;

  font-weight: 600;
  font-size: 14px;
  line-height: 15px;

  text-transform: lowercase;

  color: #eb5757;

  cursor: pointer;
}

.container button:hover {
  background: #eb5757;
  color: white;
}

.container span {
  left: 20px;
  bottom: 20px;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;

  color: #ffffff;
}
</style>