<script lang="ts">
    let { title, icon, children, x, y, zindex = 0, showMenubar = true } = $props();

    let background = $state('#888');

    // Mouse events to handle the draggable window

    let isMoving = false;

    function onMouseDown() {
        // do some messing around
        // TODO convert to svelte alternative?
        document.querySelectorAll('.frame').forEach(el => el.style['z-index'] = '-999');

        isMoving = true;
        zindex = 999;
        background = '#008'
    }

    function onMouseMove(event: MouseEvent) {
        if (isMoving) {
            x += event.movementX;
            y += event.movementY;
        }
    }

    function onMouseUp() {
        isMoving = false;
        background = '#888'
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="frame" style="left: {x}px; top: {y}px; z-index:{zindex}">
    <div class="titlebar" onmousedown={onMouseDown} style="background-color:{background};">
        <img class="icon" src="/img/icons/{icon}.png" alt="" />
        <span class="title">{title}</span>
    </div>
    {#if showMenubar}
        <div class="menubar">
            <div class="manuitem">File</div>
            <div class="manuitem">Edit</div>
            <div class="manuitem">Help</div>
        </div>
    {/if}
    <div class="content">
        {@render children?.()}
    </div>
</div>

<svelte:window onmouseup={onMouseUp} onmousemove={onMouseMove} />

<style lang="scss">
    div.frame {
        display: flex;
        flex-direction:column;
        width: var(--width);
        height: var(--height);
        background-color: #ccc;
        border: 1px solid;
        border-color: #fff #888 #888 #fff;
        user-select: none;
        position: absolute;

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

        div.titlebar {
            display: flex;
            width: calc(100% -4px);
            height: 16px;
            margin: 2px;
            padding: 2px;
            gap: 4px;

            img {
                margin: 0;
                padding: 0;
                display: block;
                width: 16px;
                height: 16px;
            }

            span.title {
                color: white;
                font-size: 11pt;
                font-weight: 800;
                line-height: 14pt;
            }
        }

        div.menubar {
            font-size: 12pt;
            display: flex;
            gap: 8px;
            padding: 2px 4px 0 4px;
        }

        div.content {
            display: flex;
            flex-direction: column;
            width: calc(100% -4px);
            padding: 4px;
        }
    }
</style>