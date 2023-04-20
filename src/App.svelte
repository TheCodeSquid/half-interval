<script lang="ts">
  import Clock from "./Clock.svelte";

  import {background, bgVar} from "./state";
</script>

<div class="app" style="--bg: var({bgVar($background)});">
  <div class="center">
    <Clock/>
  </div>

  <div class="credits">
    Made with 💜 by
    <a href="https://github.com/TheCodeSquid">
      CodeSquid
    </a>
  </div>
</div>

<style lang="scss">
  .app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    --bg: var(--bg-default);
    background-color: var(--bg);
    transition: background-color 0.2s ease;
  }

  .center {
    margin: auto;
  }

  .credits {
    position: absolute;
    bottom: 0;
    left: 0;

    padding: 3px 10px 3px 5px;
    background-color: var(--panel);
    border-top-right-radius: 10px;

    a {
      background: linear-gradient(to right, #8ccdc4, #57a096);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
  }
</style>
