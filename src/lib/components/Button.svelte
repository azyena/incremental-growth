<script lang="ts">
    const { label } = $props();
</script>

<button class="outset-box">{ label }</button>

<style lang="scss">
    button {
        background-color: #ccc;
        padding: 4px 24px;

        &:hover {
            background-color: #bebebe;
        }

        &:active {
		    border-color: #000 #ccc #ccc #000;
            &::after {
                border-color: #888 #fff #fff #888;
            }
        }
    }
</style>