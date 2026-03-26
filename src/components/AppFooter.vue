<script setup>
import { ref } from "vue";

let emailInput = ref("");

function onSubscribe() {
  emailInput.value = "";
}
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <!--navigation länk-->
      <h2 class="footer-title">Explore</h2>
      <div class="footer-links">
        <RouterLink to="/" class="footer-link">Home</RouterLink>
        <RouterLink to="/glossary" class="footer-link">Glossary</RouterLink>
        <RouterLink to="/dictionary" class="footer-link">Dictionary</RouterLink>
      </div>

      <!--Sociala medier-->
      <div class="footer-social">
        <a href="#" class="social-icon" aria-label="Facebook">
          <i class="bi bi-facebook"></i>
        </a>
        <a href="#" class="social-icon" aria-label="instagram">
          <i class="bi bi-instagram"></i>
        </a>
      </div>
    </div>

    <!--Subscribe tips-->
    <div class="footer-email">
      <p class="email-title">Get weekly Swedish tips!</p>
      <div class="email-box">
        <input
          v-model="emailInput"
          class="email-input"
          type="email"
          placeholder="Enter your email"
        />
        <button v-b-modal="'subscribe-modal'" class="email-btn">
          Subscribe
        </button>
      </div>
      <p class="footer-bottom">Fluentia Policy & Terms</p>
    </div>

    <b-modal
      @click="onSubscribe"
      id="subscribe-modal"
      class="text-center"
      ok-only
      >You have been subscribed!
    </b-modal>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #fffdf7;
  padding: 25px 25px 1px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.footer-title {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
}

.footer-links {
  margin-top: 10px;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.footer-link {
  text-decoration: none;
  font-weight: 500;
}

.footer-link:hover {
  text-decoration: underline;
}
/* social */
.footer-social {
  display: flex;
  gap: 10px;
}

.social-icon {
  width: 30px;
  height: 30px;
  font-size: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  color: #000;
}

/* Email */

.footer-email {
  margin-top: 20px;
}

.email-title {
  margin: 0 0 10px;
  font-weight: 700;
}

.email-box {
  display: flex;
  gap: 12px;
  align-items: center;
}

.email-input {
  padding: 13px;
  border-radius: 10px;
  border: 1px solid;
  outline: none;
}

.email-btn {
  padding: 14px 22px;
  border-radius: 10px;
  border: 0;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.3s ease;
}

.email-btn:hover {
  background-color: #222;
  color: white;
  transform: translateY(-3px);
}

.footer-bottom {
  margin-top: 14px;
  text-align: center;
  font-size: 13px;
  width: 100%;
}

/* mobile */
@media (max-width: 576px) {
  .footer-top {
    flex-direction: column;
    gap: 20px;
  }

  .footer-social {
    justify-content: flex-start;
  }

  .email-box {
    flex-direction: column;
    align-items: stretch;
  }

  .email-btn {
    width: 100%;
  }

  .footer-bottom {
    text-align: center;
  }
}
</style>
