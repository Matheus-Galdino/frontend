<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal">
        <div id="add-modal" v-if="toAddModal">
          <header>Add a new photo</header>

          <form ref="addForm">
            <div class="input-group">
              <label for="label"> Label </label>
              <input
                type="text"
                id="label"
                v-model="newPhotoLabel"
                placeholder="Reading on the mountains"
              />
            </div>
            <div class="input-group">
              <label for="photoUrl">Photo Url</label>
              <input
                type="text"
                id="photoUrl"
                v-model="newPhotoUrl"
                placeholder="https://images.unsplash/example"
              />
            </div>
          </form>

          <footer>
            <button class="cancel-button" @click="$emit('close')">
              Cancel
            </button>
            <button class="submit-button" @click="addPhoto">Submit</button>
          </footer>
        </div>
        <div id="remove-modal" v-if="toRemoveModal">
          <header>Are you sure?</header>

          <footer>
            <button class="cancel-button" @click="$emit('close')">
              Cancel
            </button>
            <button class="delete-button" @click="deletePhoto">Delete</button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import API from "../../API";

export default {
  name: "DialogModal",
  components: {},
  props: {
    toAddModal: {
      type: Boolean,
      default: false,
    },
    toRemoveModal: {
      type: Boolean,
      default: false,
    },
    photoId: {
      type: String,
    },
  },
  data() {
    return {
      newPhotoLabel: "",
      newPhotoUrl: "",
    };
  },
  methods: {
    async addPhoto() {
      const result = await API.addPhoto({
        Label: this.newPhotoLabel,
        Url: this.newPhotoUrl,
      });

      if (result) {
        this.$emit("close-and-reload");
      }
    },
    async deletePhoto() {
      console.log(this.photoId);
      await API.deletePhoto(this.photoId);
      this.$emit("close-and-reload");
    },
  },
};
</script>

<style scoped>
.modal-mask {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: 9999;
  transition: all 0.3s ease;
}

.modal {
  background: #ffffff;

  padding: 25px 30px;

  border-radius: 12px;

  max-width: 620px;
  width: 620px;
}

.modal header {
  font-weight: 500;
  font-size: 24px;
  line-height: 33px;

  margin-bottom: 20px;
}

.modal button {
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;

  color: #ffffff;
  background: #3db46d;

  padding: 14px 18px;

  border: none;
  border-radius: 24px;

  cursor: pointer;
  transition: all 0.3s ease-out;
}

.modal footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.modal footer .cancel-button {
  background: none;
  color: #bdbdbd;
}

/*#region addModal */

#add-modal form {
  margin-bottom: 20px;
}

#add-modal .input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;

  font-size: 14px;
  line-height: 19px;

  margin-bottom: 10px;

  color: #4f4f4f;
}

.input-group input {
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  padding: 15px;
  border-radius: 12px;
  border: 1px solid #4f4f4f;

  width: 100%;

  transition: all 0.2s ease;
}

.input-group input:focus {
  border: 1px solid #7ed3a0;
}

#add-modal footer .submit-button:hover {
  background: #34995d;
}
/*#endregion */

#remove-modal header {
  margin-bottom: 10px;
}

#remove-modal footer .delete-button {
  background: #eb5757;
  border-radius: 24px;
}

#remove-modal footer .delete-button:hover {
  background: #e21b1b;
}
</style>