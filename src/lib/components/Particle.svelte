<script lang="ts">
    function random(weight: number): number {
        return (Math.random() - Math.random()) * weight;
    }

    function resetPositionAndVelocity(xpos: number, ypos: number): void {
        x = xpos + random(100);
        y = ypos - Math.random() * 64.0;
        vx = 0.0;
        vy = -1.0 - Math.random() * 2.0;
    }

    let { image, startX, startY, offset } = $props();

    let x = $state(0), y = $state(0);
    let vx: number, vy: number;
    let op = 0.05 + Math.random() * 0.01;
    let opacity = $state(0);

    $effect(() => {
        opacity = offset;
        
        setInterval(() => {
            x += vx;
            y += vy;
            opacity -= op;

            if(opacity < 0) {
                resetPositionAndVelocity(startX, startY);
                opacity = 1.0;
            }
        }, 20);
    })
</script>

<div class="particle" style="transform: translateX({x}px) translateY({y}px); opacity: {opacity}">
    <img src="{image}" alt="" />
</div>

<style lang="scss">
    div.particle {
        display: block;
        position: absolute;
    }
</style>