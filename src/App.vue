<template>
  <div id="app">
    <header>
      <a href="app.vue">
        <img src="./assets/logo.svg" alt="logo" />
      </a>

      <form class="search-area" @submit="filterPhotos($event)">
        <span class="material-icons"> search </span>
        <input type="search" placeholder="Search by name" v-model="query" />
      </form>
      <button @click="showAddModal = true">Add a photo</button>
    </header>

    <main>
      <template v-if="photos.length >= 1">
        <Photo
          v-for="photo in photos"
          :photo="photo"
          :key="photo.id"
          @delete-photo="showDeleteDialog($event)"
        />
      </template>

      <div class="hero-container" v-if="photos.length <= 0">
        <p>
          Couldn't find anything with "{{ query }}". Try adding your own image.
        </p>
        <img
          src="./assets/no-content.svg"
          alt="no content"
          class="hero-image"
        />
      </div>
    </main>

    <DialogModal
      v-if="showAddModal"
      :toAddModal="true"
      @close="showAddModal = false"
      @close-and-reload="closeAndReload"
    />

    <DialogModal
      v-if="showDeleteModal"
      :toRemoveModal="true"
      :photoId="selectedPhotoId"
      @close="showDeleteModal = false"
      @close-and-reload="closeAndReload"
    />

    <transition name="slide-fade">
      <NotificationModal
        v-if="hasExecutedAction"
        :background="notificationBg"
        :message="notificationMessage"
        :icon="notificationIcon"
      />
    </transition>
  </div>
</template>

<script>
import API from "./API";

import Photo from "./components/Photo";
import DialogModal from "./components/modals/DialogModal";
import NotificationModal from "./components/modals/NotificationModal";

export default {
  name: "App",
  components: {
    Photo,
    DialogModal,
    NotificationModal,
  },
  data() {
    return {
      photos: [],
      query: "",
      selectedPhotoId: "",
      showAddModal: false,
      showDeleteModal: false,
      hasExecutedAction: false,
      notificationIcon: "",
      notificationMessage: "",
      notificationBg: "",
    };
  },
  methods: {
    async filterPhotos(event) {
      event.preventDefault();

      this.photos = await API.filterPhotosByLabel(this.query);
    },
    async getPhotos() {
      this.photos = await API.getAllPhotos();
    },
    showDeleteDialog(id) {
      this.selectedPhotoId = id;
      this.showDeleteModal = true;
    },
    getNotificationStyle() {
      if (this.showAddModal) {
        this.notificationIcon = "done";
        this.notificationMessage = "Photo successfully added!";
        this.notificationBg = "#249c24";
      } else {
        (this.notificationIcon = "delete"),
          (this.notificationMessage = "Photo successfully deleted!");
        this.notificationBg = "#E62D2D";
      }
    },
    closeAndReload() {
      this.getNotificationStyle();
      this.showAddModal = false;
      this.showDeleteModal = false;
      this.showNotification();
      this.getPhotos();
    },
    showNotification() {
      this.hasExecutedAction = true;

      setTimeout(() => (this.hasExecutedAction = false), 2000);
    },
  },
  async beforeMount() {
    this.photos = await API.getAllPhotos();
  },
};
</script>

<style>
#app {
  height: 100vh;
  padding: 30px 120px;
  display: flex;
  flex-direction: column;
}

/*#region Header */
#app > header {
  display: flex;
  align-items: center;

  margin-bottom: 75px;
}

header .search-area {
  display: flex;
  align-items: center;

  border: 1px solid #bdbdbd;
  border-radius: 24px;
  color: #bdbdbd;

  padding: 13px;
  margin-left: 30px;
}

.search-area input {
  border: none;
  width: 250px;
  margin-left: 5px;

  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

header button {
  border: none;
  border-radius: 24px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);

  padding: 18px 22px;

  background: #3db46d;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;

  color: #ffffff;

  margin-left: auto;

  cursor: pointer;
  transition: all 0.3s ease-out;
}

header button:hover {
  background: #308c55;
}

/*#endregion */

main {
  width: 100%;
  column-width: 375px;
  column-gap: 35px;
  max-width: 2000px;

  flex-grow: 1;
}

.hero-container {
  height: 100%;
  column-span: all;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 5%;
}

.hero-container img {
  width: 100%;
}

.hero-container p {
  font-size: 3rem;
  color: #817f7f;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
</style>
