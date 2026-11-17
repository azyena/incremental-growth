<script lang="ts">
    import Frame from '#lib/components/Frame.svelte';
    import Particle from '#lib/components/Particle.svelte';
    import { formatSize } from '#lib/functions/format.svelte.ts';

    let { player, x, y, width = 640, height = 640 } = $props();

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let image: string = '/img/character.png';

    $effect(() => {
        if (!canvas) return;
        context = canvas.getContext('2d')!;
        context.font = "bold 16px Arial";
        context.strokeStyle = 'black';

        setInterval(() => {
            render();
        }, 30);
    })

    function render() {
        // clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // render grid
        let lowerBound = Math.max(0, Math.floor(Math.log10(player.size)));
        let upperBound = Math.min(9999999, Math.ceil(Math.log10(player.size) + 3));
        for(let q = lowerBound; q <= upperBound; q++) {
            for(let y = 0; y < 10; y++) {
                let yy = 250 * ((10 ** q) * y) / player.size;
                context.strokeStyle = '#8882';
                drawLine(0, canvas.height - yy, canvas.width, canvas.height - yy);
                context.strokeStyle = '#000';
                context.fillText(formatSize(10 ** q * y, 0), 10, canvas.height - yy);
                drawLine(0, canvas.height - yy, 25, canvas.height - yy);
            }
        }

        // Render the "below lower bound" with a decrementing opacity to ease in the animation.
        let qq = lowerBound - 1;
        if(qq >= 0) {
            for(let y = 0; y < 10; y++) {
                let yy = 250 * ((10 ** qq) * y) / player.size;

                let alpha = (250 * 10 ** qq / player.size) / 25;
                context.globalAlpha = alpha;
                context.strokeStyle = '#8882';
                context.font = `bold ${alpha * 16}px Arial`;
                drawLine(0, canvas.height - yy, canvas.width, canvas.height - yy);
                context.strokeStyle = '#000';
                context.fillText(formatSize(10 ** qq * y, 0), 10, canvas.height - yy);
                context.globalAlpha = 1.0;
                context.font = "bold 16px Arial";
            }
        }
    }

    function drawLine(x0: number, y0: number, x1: number, y1: number) {
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.closePath();
            context.stroke();
    }

</script>

<Frame
    icon="graph"
    title="Growth Graph"
    x={x}
    y={y}
    --width='480px'
>
    <canvas
        bind:this={canvas}
        width={width}
        height={height}
        class="GrowthGraph"
    >
    </canvas>

    <!-- We don't neccesarily need to draw the OC on screen, two image tags is more than enough. -->
    <img src="{image}" alt="" class="oc" />
    {#if player.isGrowing}
        <img src="{image}" alt="" class="oc-grow" />
    {/if}

    <!-- Might not be the best way... -->
    <div class="particles">
        {#each {length: 4 }, i}
            <Particle image={'/img/particle_grow.png'} startX={width / 2 - 16} startY={height / 4 * 3} offset={i / 2} />
            <Particle image={'/img/particle_plus.png'} startX={width / 2 - 16} startY={height / 4 * 3} offset={i / 2 + 0.1} />
        {/each}
    </div>
</Frame>

<style>
    canvas {
        display: block;
        background-color: white;
        border: 1px solid black;
    }

    img.oc {
        width: 250px;
        height: 250px;
        position: absolute;
        left: 25%;
        bottom: 0;
    }

    img.oc-grow {
        width: 250px;
        height: 250px;
        animation: expand ease-out infinite 500ms;
        position: absolute;
        left: 25%;
        bottom: 0;
    }

    div.particles {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    @keyframes expand {
        from {
            transform: scale(1.0);
            opacity: 1;
        }

        to {
            transform: scale(1.1);
            opacity: 0;
        }
    }
</style>