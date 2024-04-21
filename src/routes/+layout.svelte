<script lang="ts">
  import { base } from '$app/paths'
  import Scene from '$lib/Scene.svelte'
  import { Canvas } from '@threlte/core'
</script>

<svelte:head>
  <title>NFT3D</title>
</svelte:head>
<div>
  <nav>
    <a href="{base}/">Home</a>
    <a href="{base}/about">About</a>
  </nav>
  <Canvas>
    <Scene />
  </Canvas>
</div>
<slot></slot>

<style>
  :global(body) {
    margin: 0;
    background: linear-gradient(180deg, rgba(13, 19, 32, 1) 0%, rgba(8, 12, 21, 1) 100%);
    height: 100svh;
    width: 100svw;
    overflow: hidden;
  }
  div {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
