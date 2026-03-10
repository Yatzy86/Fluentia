<script setup>
import { ref, computed } from "vue";
import logo from "../assets/img/image.png";

const showLoginModal = ref(false);
const userName = ref("");
const tempName = ref("");
const isLoggedIn = computed(() => userName.value.trim().length > 0);

function login() {
  if (isLoggedIn.value) {
    userName.value = "";
    return;
  }

  showLoginModal.value = true;
}

// Danar
function confirmLogin() {
  if (tempName.value.trim()) { // kontrollera att använderan har skrivit någonting
    userName.value = tempName.value.trim();  // spara namnet
  }
  tempName.value ="";  // rensar bort namnet nästa gång när du öppnar 
  showLoginModal.value = false;
}
</script>

<template>
  <nav class="header navbar navbar-light">
    <div class="left logo-wrap">
      <RouterLink to="/">
        <img class="logo" :src="logo" alt="Fluentia logo" />
      </RouterLink>
    </div>

    <div class="right">
      <span class="bi bi-bell icon" title="Notifications"></span>

      <div class="user">
        <i class="bi bi-person icon" title="User"> </i>
        <span v-if="isLoggedIn" class="user-name">{{ userName }}</span>
      </div>

      <div class="dropdown">
        <button
          class="btn p-0 hamburger-btn"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="Menu"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><RouterLink class="dropdown-item" to="/">Home</RouterLink></li>
          <li>
            <RouterLink class="dropdown-item" to="/dictionary"
              >Dictionary</RouterLink
            >
          </li>
          <li>
            <button class="dropdown-item" type="button" @click="login">
              {{ isLoggedIn ? "Log out" : "Log in" }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!--bootstrap inloggning // Danar-->
  </nav>
  <b-modal v-model="showLoginModal"  title ="Log in">
    <b-form-input v-model="tempName" placeholder="Enter your name"/>
    <template #footer>
      <b-button variant="secondary" @click="showLoginModal = false">
        Cancel
      </b-button>
      <b-button variant="third" :disabled="!tempName.trim()" 
       @click="confirmLogin">
        Log in
      </b-button>
    </template>
  </b-modal>
</template>

<style lang="scss" scoped>
$color-1: #fdc921;
$color-2: #fdd85d;
$color-3: #fffdf5;
$color-4: #99d6ea;
$color-5: #6798c0;

.header {
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: $color-3;
  width: 100%;
}
.logo-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: -50px;
}
.logo {
  height: 80px;
  transform: scale(2.5);
  width: auto;
  transform-origin: left center;
}
.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 18px;
}

.icon {
  font-size: 22px;
  color: #111;
  cursor: pointer;
}
.hamburger-btn {
  border: 0;
  background: transparent;
}
.hamburger-btn .navbar-toggler-icon {
  width: 1.5em;
  height: 1.5em;
}
@media (max-width: 576px) {
  .header {
    height: 70px;
  }
  .logo {
    height: 52px;
    transform: none;
  }
  .logo-wrap {
    margin-left: 0;
  }
  .right {
    gap: 12px;
  }
}
.user {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.user-name {
  font-weight: 600;
  font-size: 14px;
}
</style>
