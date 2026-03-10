<script setup>
import { ref, computed } from "vue";
import logo from "../assets/img/image.png";

const userName = ref("");
const isLoggedIn = computed(() => userName.value.trim().length > 0);

function login() {
  if (isLoggedIn.value) {
    userName.value = "";
    return;
  }
  const name = prompt("What is your name?");
  if (name && name.trim()) {
    userName.value = name.trim();
    alert(`Hello ${userName.value}`);
  } else {
    alert("Hello");
  }
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
  </nav>
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
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  background: $color-3;
  width: 100%;
}
.logo-wrap {
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.logo {
  height: 50px;
  width: auto;
  display: block;
}
.right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
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
  height: 2em;
}
@media (max-width: 576px) {
  .header {
    height: 70px;
    padding: 0 12px;
  }
  .logo {
    height: 52px;
    width: auto;
    display: block;
  }
  .right {
    gap: 12px;
  }
}
.user {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 6px;
}
.user-name {
  font-weight: 600;
  font-size: 14px;
}
</style>
