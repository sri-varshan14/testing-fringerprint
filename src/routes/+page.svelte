<script>
    import { onMount } from "svelte";

    let results = [];

    onMount(async () => {
        try {
            const FingerprintJS = await import("https://fpjscdn.net/v3/SMurNrieWff7FtJfhahj");
            let fpPromise = FingerprintJS.load();

            // Create an array of 100 promises for parallel execution
            let requests = Array.from({ length: 100 }, async () => {
                const fp = await fpPromise;
                const result = await fp.get();
                return {
                    requestId: result.requestId,
                    visitorId: result.visitorId,
                    score: result.confidence.score,
                    response: result
                };
            });

            // Wait for all requests to finish using Promise.all
            results = await Promise.all(requests);
        } catch (error) {
            console.error(error);
        }
    });
</script>

<h1>FingerprintJS Results</h1>

{#if results.length > 0}
    <table>
        <thead>
            <tr>
                <th>Request ID</th>
                <th>Visitor ID</th>
                <th>Score</th>
                <th>API Response</th>
            </tr>
        </thead>
        <tbody>
            {#each results as result, index}
                <tr>
                    <td>{result.requestId}</td>
                    <td>{result.visitorId}</td>
                    <td>{result.score}</td>
                    <td><pre>{JSON.stringify(result.response, null, 4)}</pre></td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>Loading...</p>
{/if}
