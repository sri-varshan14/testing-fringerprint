<script>
    import { onMount } from "svelte";

    let requestId = undefined;
    let visitorId = undefined;
    let score = undefined;
    let response = undefined;

    onMount(async () => {
        try {
            const FingerprintJS = await import(
                "https://fpjscdn.net/v3/o1P0y7FQS6K1woZ7TD71"
            );
            let fpPromise = FingerprintJS.load();
            const fp = await fpPromise;
            const result = await fp.get();

            requestId = result.requestId;
            visitorId = result.visitorId;
            score = result.confidence.score;
            response = result;
        } catch (error) {
            console.error(error);
        }
    });
</script>

<p>VisitorID: {visitorId}</p>
<p>RequestID: {requestId}</p>
<p>Score: {score}</p>
<p>API Response: {JSON.stringify(response, null, 4)}</p>
