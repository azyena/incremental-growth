<script lang="ts">
    import Button from "#lib/components/Button.svelte";
    import Frame from "#lib/components/Frame.svelte";
    import Progressbar from "#lib/components/Progressbar.svelte";
    let { x, y, width, height, item } = $props();
</script>

<Frame
    icon="downloader"
    title="Growth Accelerator - {item?.name ?? 'Completed'} ({item?.percentage ?? 100}%)"
    x={x}
    y={y}
    showMenubar={false}
    --width='{width}px'
    >
    <div class="downloader" style="height:{height}px">
        {#if item === undefined}
            <p>
                <img src="/img/ico-32/grow.png" alt="">
                
                <br>
                Growth completed <br>
                All items in inventory used.
            </p>

            <Progressbar
                min=0
                max=100
                width={width - 10}
                value={100}
                />

            <table>
                <tbody>
                    <tr>
                        <td>Growth:</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Growth rate:</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Remaining:</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>

            <div class="buttongroup">
                <Button label="Close" />
            </div>
        {:else}
            <p>
                <img src="/img/ico-32/grow.png" alt="">
                <img src="/img/downloader.gif" alt="">
                <img src="/img/items/{item?.icon}.png" alt="">
                <img src="/img/downloader.gif" alt="">
                <img src="/img/character.png" alt="">
                
                <br>
                
                Growing... <br>
                Size increase from {item.name}-{item.id.slice(0, 8)}...{item.id.slice(20, 28)}.ptn
            </p>

            <Progressbar
                min=0
                max=100
                width={width - 10}
                value={item.percentage}
                />

            <table>
                <tbody>
                    <tr>
                        <td>Potion:</td>
                        <td>{item.name}</td>
                    </tr>
                    <tr>
                        <td>Growth rate:</td>
                        <td>{item.calculateEffect} m/s</td>
                    </tr>
                    <tr>
                        <td>Remaining:</td>
                        <td>{item.remaining} seconds</td>
                    </tr>
                </tbody>
            </table>

            <div class="buttongroup">
                <Button label="Cancel" />
            </div>
        {/if}
    </div>
</Frame>

<style lang="scss">
    div.downloader {
        color: black;

        img {
            margin:15px 0 20px 13px;
            height: 32px;
        }

        p {
            margin: 4px 0;
        }

        table {
            margin: 4px 0;
            
            > tbody > tr > td {
                padding-right: 60px;
            }
        }

        div.buttongroup {
            flex: 1 0 auto;
            gap: 5px;
            padding: 5px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }
    }
</style>
