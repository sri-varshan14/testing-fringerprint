<script>
    import { onMount } from "svelte";

    let results = [];

    onMount(async () => {
        try {
            const FingerprintJS = await import("https://fpjscdn.net/v3/mqrpPWNMJKpF6I5qT9Zk");
            let fpPromise = FingerprintJS.load();

            for (let i = 0; i < 100; i++) {
                const fp = await fpPromise;
                const result = await fp.get();

                // Push the result to the results array
                results = [...results, {
                    requestId: result.requestId,
                    visitorId: result.visitorId,
                    score: result.confidence.score,
                    response: result
                }];
            }
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
