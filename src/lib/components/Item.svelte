<script lang="ts">
    let { name, icon, size, progress } = $props();
</script>

<div class="item">
    <img class="icon" src="/img/items/{icon}.png" alt="" />
    <span class="label">{name}</span>
</div>

<style lang="scss">
    div.item {
        display: flex;
        flex-direction: column;
        width: 64px;
        height: 64px;
        font-size: 10pt;
        text-align: center;

        img {
            margin: auto;
            width: 32px;
            height: 32px;
        }

        &:hover {
            background-color: #ccc8;
        }
    }
</style>

<!-- <script lang="ts">
    let { name, label, amount, progress, image } = $props();
    let degrees = $derived((progress / amount) * 360);
</script>

<div class="item" style:background-image="url(img/{image})">
    <div class="progress-spinner" style:background-image="conic-gradient(#0000 {degrees}deg, #0C88 0deg)"></div>
</div>

<style lang="scss">
    div.item {
        position: relative;
        display: block;
        width: 64px;
        height: 64px;
        background-repeat: no-repeat;
        background-size: 100%;
    
        &:first-child > div.progress-spinner {
            position: absolute;
            left: 0;
            top: 0;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: transparent;
            mask: radial-gradient(circle, transparent 0 20px, white 20px 32px);
        }
    }
</style> -->