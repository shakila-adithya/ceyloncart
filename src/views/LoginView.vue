<template>
  <div class="login-root min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
    <div class="login-mesh" aria-hidden="true"></div>
    <div class="orb orb-1" aria-hidden="true"></div>
    <div class="orb orb-2" aria-hidden="true"></div>
    <div class="orb orb-3" aria-hidden="true"></div>

    <div class="w-full max-w-sm relative z-10 animate-scale-in">

      <!-- Card -->
      <div class="login-card">

        <!-- header -->
        <div class="text-center mb-6">
          <RouterLink to="/" class="inline-flex items-center gap-2 mb-4 justify-center group">
            <img src="/logo.png" class="w-11 h-11 object-contain group-hover:scale-110 transition-transform drop-shadow-xl" alt="CeylonCart"/>
            <span class="font-display text-2xl font-bold bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent tracking-tight">CeylonCart</span>
          </RouterLink>
          <h1 class="login-title">Welcome Back</h1>
          <p class="login-sub">Sign in to your CeylonCart account</p>
        </div>

        <!-- hint -->
        <div class="demo-box mb-5">
          <p class="demo-title">Demo Credentials</p>
          <div class="demo-creds">
            <span>User: <code class="demo-code">jamesd</code></span>
            <span>Pass: <code class="demo-code">jamesdpass</code></span>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-4">

          <div>
            <label class="login-label">Username</label>
            <div class="input-wrap">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              <input v-model="form.username" type="text" required placeholder="Enter username" class="login-input"/>
            </div>
          </div>

          <div>
            <label class="login-label">Password</label>
            <div class="input-wrap">
              <svg class="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <input v-model="form.password" :type="showPw ? 'text' : 'password'" required placeholder="Enter password" class="login-input pr-10"/>
              <button type="button" @click="showPw = !showPw" class="pw-toggle">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path v-if="!showPw" stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <Transition name="err">
            <div v-if="authStore.error" class="msg-box msg-error">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ authStore.error }}
            </div>
          </Transition>

          <Transition name="err">
            <div v-if="loginSuccess" class="msg-box msg-success">
              <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              Signed in successfully! Redirecting…
            </div>
          </Transition>

          <button type="submit" :disabled="authStore.loading || loginSuccess" class="login-btn">
            <svg v-if="authStore.loading" class="w-4 h-4 spin-anim" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {{ authStore.loading ? 'Signing in…' : loginSuccess ? 'Redirecting…' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-xs mt-4" style="color:#9ca3af">
          By signing in you agree to our
          <a href="#" class="text-pink-500 hover:underline">Terms</a> &amp;
          <a href="#" class="text-pink-500 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const showPw = ref(false)
const loginSuccess = ref(false)
const form = ref({ username: 'jamesd', password: 'jamesdpass' })

async function handleLogin() {
  const ok = await authStore.login(form.value)
  if (ok) {
    loginSuccess.value = true
    setTimeout(() => {
      window.location.hash = '#/'
      window.location.reload()
    }, 600)
  }
}
</script>

<style scoped>
.login-root {
  background: #f8f4ff;
  background-image:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(236,72,153,.18) 0%, transparent 60%),
    radial-gradient(ellipse 70% 50% at 80% 90%, rgba(139,92,246,.20) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 60% 30%, rgba(99,102,241,.12) 0%, transparent 55%);
}
.dark .login-root {
  background: #0d0618 !important;
  background-image:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(236,72,153,.22) 0%, transparent 60%),
    radial-gradient(ellipse 70% 50% at 80% 90%, rgba(139,92,246,.25) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 60% 30%, rgba(99,102,241,.15) 0%, transparent 55%) !important;
}

.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  animation: orbFloat 8s ease-in-out infinite;
}
.orb-1 {
  width: 260px; height: 260px;
  top: -60px; left: -80px;
  background: radial-gradient(circle, rgba(236,72,153,.22) 0%, transparent 70%);
  animation-delay: 0s;
}
.orb-2 {
  width: 320px; height: 320px;
  bottom: -80px; right: -80px;
  background: radial-gradient(circle, rgba(139,92,246,.25) 0%, transparent 70%);
  animation-delay: 3s;
}
.orb-3 {
  width: 180px; height: 180px;
  top: 40%; left: 60%;
  background: radial-gradient(circle, rgba(59,130,246,.15) 0%, transparent 70%);
  animation-delay: 5s;
}
@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(20px, -30px) scale(1.05); }
  66% { transform: translate(-15px, 20px) scale(0.96); }
}

.login-card {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 28px;
  padding: 2rem 1.75rem;
  box-shadow:
    0 4px 24px rgba(139,92,246,.10),
    0 24px 64px rgba(236,72,153,.12),
    0 2px 4px rgba(0,0,0,.04),
    inset 0 1px 0 rgba(255,255,255,1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.dark .login-card {
  background: rgba(22, 14, 36, 0.92) !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
  box-shadow:
    0 4px 24px rgba(0,0,0,.4),
    0 24px 64px rgba(139,92,246,.15),
    inset 0 1px 0 rgba(255,255,255,.05) !important;
}

.login-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 4px;
}
.dark .login-title { color: #f9fafb !important; }

.login-sub {
  font-size: .8rem;
  color: #6b7280;
}
.dark .login-sub { color: #9ca3af !important; }

.demo-box {
  background: rgba(239,246,255,.9);
  border: 1px solid rgba(191,219,254,.8);
  border-radius: 14px;
  padding: .75rem 1rem;
}
.dark .demo-box {
  background: rgba(30, 58, 138, 0.15) !important;
  border-color: rgba(59, 130, 246, 0.25) !important;
}
.demo-title {
  font-size: .75rem;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 4px;
}
.dark .demo-title { color: #93c5fd !important; }
.demo-creds {
  display: flex;
  gap: 1rem;
  font-size: .75rem;
  color: #2563eb;
}
.dark .demo-creds { color: #60a5fa !important; }
.demo-code {
  background: rgba(219,234,254,.8);
  padding: 1px 5px;
  border-radius: 4px;
  font-family: monospace;
  font-size: .72rem;
}
.dark .demo-code {
  background: rgba(30,58,138,.4) !important;
  color: #93c5fd !important;
}

.login-label {
  display: block;
  font-size: .72rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 6px;
  letter-spacing: .02em;
}
.dark .login-label { color: #d1d5db !important; }

.input-wrap { position: relative; }
.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px; height: 16px;
  color: #9ca3af;
  pointer-events: none;
}

.login-input {
  width: 100%;
  padding: .65rem 1rem .65rem 2.25rem;
  border-radius: 12px;
  font-size: .875rem;
  color: #111827;
  background: rgba(249,250,251,.95);
  border: 1.5px solid rgba(209,213,219,.8);
  outline: none;
  transition: all .2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,.04), inset 0 1px 0 rgba(255,255,255,.9);
}
.login-input::placeholder { color: #9ca3af; }
.login-input:focus {
  border-color: #c084fc;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(192,132,252,.2), 0 1px 3px rgba(0,0,0,.06);
}
.dark .login-input {
  background: rgba(31, 20, 52, 0.9) !important;
  border-color: rgba(99, 60, 180, 0.35) !important;
  color: #f9fafb !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04) !important;
}
.dark .login-input::placeholder { color: #6b7280 !important; }
.dark .login-input:focus {
  border-color: #a78bfa !important;
  background: rgba(40, 24, 68, 0.95) !important;
  box-shadow: 0 0 0 3px rgba(167,139,250,.18) !important;
}

.pw-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  transition: color .2s;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
}
.pw-toggle:hover { color: #6b7280; }
.dark .pw-toggle { color: #6b7280 !important; }
.dark .pw-toggle:hover { color: #9ca3af !important; }

.msg-box {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: .75rem;
  padding: .6rem .75rem;
  border-radius: 12px;
  border: 1px solid;
}
.msg-error {
  background: rgba(254,242,242,.95);
  border-color: rgba(252,165,165,.6);
  color: #dc2626;
}
.msg-success {
  background: rgba(240,253,244,.95);
  border-color: rgba(134,239,172,.6);
  color: #16a34a;
}
.dark .msg-error {
  background: rgba(127,29,29,.25) !important;
  border-color: rgba(239,68,68,.3) !important;
  color: #fca5a5 !important;
}
.dark .msg-success {
  background: rgba(20,83,45,.25) !important;
  border-color: rgba(74,222,128,.3) !important;
  color: #86efac !important;
}

.login-btn {
  width: 100%;
  padding: .8rem;
  border-radius: 14px;
  font-size: .875rem;
  font-weight: 700;
  letter-spacing: .02em;
  color: #fff;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #6366f1 100%);
  background-size: 200% 200%;
  border: none;
  cursor: pointer;
  transition: all .3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(139,92,246,.35), 0 1px 3px rgba(0,0,0,.1);
}
.login-btn:hover:not(:disabled) {
  background-position: 100% 0;
  box-shadow: 0 8px 32px rgba(139,92,246,.5), 0 2px 6px rgba(0,0,0,.1);
  transform: translateY(-1px);
}
.login-btn:active:not(:disabled) { transform: translateY(0) scale(.98); }
.login-btn:disabled { opacity: .6; cursor: not-allowed; }

.spin-anim { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.err-enter-active, .err-leave-active { transition: all .25s ease; }
.err-enter-from, .err-leave-to { opacity: 0; transform: translateY(-4px); }
</style>