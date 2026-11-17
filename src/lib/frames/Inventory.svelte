<script lang="ts">
    import Frame from "#lib/components/Frame.svelte";
    import Item from "../components/Item.svelte";

    const { x, y, width, height, items } = $props();
</script>

<Frame
    icon="inventory"
    title="Inventory - P:/"
    x={x}
    y={y}
    --width='{width}px'
    >
    <div class="inventory inset-box" style="height:{height}px">
        {#each items as item}
            <Item
                name={item.name}
                icon={item.icon}
                size={item.size}
                progress={item.progress}
            />
        {/each}
    </div>
</Frame>

<style>
    div.inventory {
        display: flex;
        flex-wrap: wrap;
        overflow-x:hidden;
        overflow-y:scroll;
        width: 100%;
        background-color: white;
    }
</style>