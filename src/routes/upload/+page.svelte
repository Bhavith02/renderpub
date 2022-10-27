<svelte:head>
	<title>User</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang='ts'>
    import { Form } from 'sveltekit-form';

    /* Sending a file appended to a FormData object */
    function readFile(file) {
        return new Promise((resolve, reject) => {
            // Create file reader
            let reader = new FileReader()

            // Register event listeners
            reader.addEventListener("loadend", e => resolve(e.target.result))
            reader.addEventListener("error", reject)

            // Read file
            reader.readAsArrayBuffer(file)
        })
    }

    async function getAsByteArray(file) {
        return new Uint8Array ( await readFile(file) )
    }

    function _(el: string) {
        return document.getElementById(el);
    }

    function progressHandler(event) {
        _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
        var percent = (event.loaded / event.total) * 100;
        _("progressBar").value = Math.round(percent);
        _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    }

    function completeHandler(event) {
        _("status").innerHTML = event.target.responseText;
        _("progressBar").value = 0; //wil clear progress bar after successful upload
    }

    function errorHandler(event) {
        _("status").innerHTML = "Upload Failed";
        console.log("Error: " + event.message)
    }

    function abortHandler(event) {
        _("status").innerHTML = "Upload Aborted";
    }

    async function onFileSelected(e){
        let file = e.target.files[0];
        const byteFile = await getAsByteArray(file)
        console.log(byteFile.length)
        console.log(file.type)
        console.log(file.name)
        console.log(file.size)

        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", progressHandler, false);
        xhr.addEventListener("load", completeHandler, false);
        xhr.addEventListener("error", errorHandler, false);
        xhr.addEventListener("abort", abortHandler, false);
        xhr.open("POST", "/api/storage/upload");
        xhr.setRequestHeader('rp-body-format', 'arrayBuffer')
        xhr.setRequestHeader('rp-file-name', file.name)
        xhr.setRequestHeader('rp-file-type', file.type)
        xhr.setRequestHeader('rp-file-size', file.size)
        xhr.setRequestHeader('rp-file-key', file.name)
        xhr.send(byteFile);
    }

    
</script>

<div class="content">
	<!-- <h1>Hello and welcome, {$page.params.user}</h1> -->
</div>



<!-- <Form id="form" method="post">
    <input type="file" id="file" on:change="{(e)=>onFileSelected(e)}"/>
</Form> -->

<Form id="upload_form" enctype="multipart/form-data" method="post">
    <input type="file" name="file" id="file" on:change="{(e)=>onFileSelected(e)}"/><br>
    <progress id="progressBar" value="0" max="100" style="width:300px;"></progress>
    <h3 id="status"></h3>
    <p id="loaded_n_total"></p>
</Form>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
