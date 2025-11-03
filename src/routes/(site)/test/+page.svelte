<script>
    async function hello() {
        const response = await fetch('/api/add', {
            method: 'GET',
            body: JSON.stringify("Alex")
        })
        return response
    }
</script>
<h1>Test</h1>
<p></p>