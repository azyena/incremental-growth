<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
	@font-face {
		font-family: "W95F";
		src: url("../lib/assets/w95f.woff2")
	}

	:global(*) {
		font-family: 'W95F', Courier, monospace;
		image-rendering: pixelated;
		text-rendering: unset;
		font-synthesis-weight: none;
	}

	:global(body) {
		background-color: #526b93;
	}

	:global(.inset-box) {
		border: 1px solid;
		box-sizing: border-box;
		position: relative;
		border-color: #000 #ccc #ccc #000;

		&::after {
            content: "";
            pointer-events: none;
            display: block;
            position: absolute;
            left: -2px;
            top: -2px;
            right: -2px;
            bottom: -2px;
            border: 1px solid;
            border-color: #888 #fff #fff #888;
		}
	}

	:global(.outset-box) {
		border: 1px solid;
		box-sizing: border-box;
		position: relative;
		border-color: #fff #888 #888 #fff;

		&::after {
            content: "";
            pointer-events: none;
            display: block;
            position: absolute;
            left: -2px;
            top: -2px;
            right: -2px;
            bottom: -2px;
            border: 1px solid;
            border-color: #ccc #000 #000 #ccc;
		}
	}
</style>

{@render children()}
