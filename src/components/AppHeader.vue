<script setup>
import logo from "../assets/img/image.png";

function login() {
  const name = prompt("Vad heter du");
  alert(name && name.trim() ? `Hello ${name}` : "Hello");
}
</script>

<template>
  <nav class="header navbar navbar-light">
    <div class="left logo-wrap">
      <img class="logo" :src="logo" alt="Fluentia logo" />
    </div>

    <div class="right">
      <span class="bi bi-bell icon" title="Notifications"></span>

      <i class="bi bi-person icon" title="User"> </i>

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
              Log in
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
</style>
