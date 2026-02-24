<script></script>

<template>
  <header class="header">
    <div class="brand">FLUENTIA</div>

    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/games">Games</RouterLink>
      <RouterLink to="/dictionary">Dictionary</RouterLink>
    </nav>

    <div class="user">
      <span class="user">User</span>
      <span class="name">Guest</span>
      <span class="icon">Icon</span>
      <span span="notificationIcon">NI</span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
$header-bg: #d9d9d9;
$text-color: #111;

.header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: $header-bg;
  width: 100%;
}
.brand {
  font-size: 18px;
  font-weight: 700;
  color: $text-color;
}
.nav {
  margin: 0 auto;
  display: flex;
  gap: 32px;
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  font-size: 10px;
}
.icon {
  cursor: pointer;
}
</style>
