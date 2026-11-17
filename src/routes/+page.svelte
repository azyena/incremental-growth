<script lang="ts">
    import { genericPotion, hyperPotion, Potion } from '#lib/classes/Potion.svelte.ts';
    import GrowthGraph from '#lib/frames/GrowthGraph.svelte';
    import Inventory from '#lib/frames/Inventory.svelte';
    import Downloader from '#lib/frames/Downloader.svelte';
    import Status from '#lib/frames/Status.svelte';

    let current = $state<Potion>();
    let tickRate = $state(60); // 1000 / 60 ~= 16.67

    let player = $state({
        name: 'Azarel',
        size: 1,
        isGrowing: false
    });

    let queue = $state<Potion[]>([
        genericPotion(),
        hyperPotion(),
        genericPotion(),
        hyperPotion(),
    ]);


    $effect(() => {
        setInterval(() => {

            player.isGrowing = current !== undefined;

            if(current === undefined && queue.length > 0) {
                current = queue.shift();
            }

            if(current !== undefined) {
                player.size += (current.effect.addition / tickRate);        // Addition formula: n+x/tickrate
                player.size *= current.effect.multiplier ** (1 / tickRate); // Multiplier formula: n*x^1/tickrate
                current.progress += 1 / tickRate;
                if(current.progress >= current.duration) {
                    current = queue.shift();
                }
            }

        }, 1000 / tickRate);
    });

</script>

<GrowthGraph
    x={10}
    y={10}
    width={500}
    height={500}
    player={player}
/>

<Inventory
    x={10}
    y={550}
    width={480}
    height={200}
    items={queue}
/>

<Downloader
    x={510}
    y={10}
    width={400}
    height={250}
    item={current}
/>

<Status
    x={510}
    y={300}
    width={400}
    name={player.name}
    size={player.size}
    />

<!-- TODO move this to a Taskbar component. -->
<div class="taskbar">

</div>

<style lang="scss">
    div.taskbar {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 24px;
        background-color: #ccc;
        border-top: 1px solid white;
        outline: 1px solid #ccc;
    }
</style>