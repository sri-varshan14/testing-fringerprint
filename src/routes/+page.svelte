<script>
    import { onMount } from "svelte";

    let id = undefined;
    let fpPromise;

    onMount(async () => {
        try {
            const FingerprintJS = await import(
                "https://fpjscdn.net/v3/o1P0y7FQS6K1woZ7TD71"
            );
            fpPromise = FingerprintJS.load();
            const fp = await fpPromise;
            const result = await fp.get();
            id = result.visitorId;
        } catch (error) {
            console.error(error);
        }
    });
</script>

<p>{id}</p>
