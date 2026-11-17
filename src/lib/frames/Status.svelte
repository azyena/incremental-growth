<script lang="ts">
    import Frame from "#lib/components/Frame.svelte";
    import { formatSize } from '#lib/functions/format.svelte.ts';

    let { x, y, name, size, width } = $props();

</script>

<Frame
    icon="status"
    title="Status - {name}"
    x={x}
    y={y}
    --width='{width}px'
    >
    <img src="img/avatar.png" alt="">
    <h1>{name} - {formatSize(size)}</h1>
</Frame>

<style lang="scss">

</style>