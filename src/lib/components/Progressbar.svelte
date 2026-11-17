<script>
    let { value, min, max, width } = $props();
    let percentage = $derived.by(() => (Math.max(min, Math.min(100, value / max * 100))).toFixed(2));
</script>

<div class="progressbar inset-box" style="width: {width}px">
    <div class="progress" style="width: {percentage}%"></div>
</div>

<style lang="scss">
    div.progressbar {
        display: block;
        position: relative;
        height: 20px;

        .progress {
            background-color: var(--foreground-color, #008);
            height: 20px;
            position: relative;
        }
    }

    @keyframes scaler {
        from {
            transform: scaleX(100%) scaleY(100%);
            opacity: 1;
        }

        to {
            transform: scaleY(150%);
            opacity: 0;
        }
    }
</style>