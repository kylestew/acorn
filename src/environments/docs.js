export function installEnvInfo() {
    const modalHTML = `
    <div id="environmentInfoModal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Current Acorn Environment</h2>
            <h5>${JSON.stringify(window.acorn_ENV, null, 2)}</h5>
            ${window.doc_keys
                .map((key) => {
                    if (window.hasOwnProperty(key)) {
                        const fn = window[key]
                        return `
                        <div class="docInfo">
                        <span class="header"><span class="namespace">[${fn.namespace}]</span> <a href="https://github.com/kylestew/acorn/blob/ether/src/${fn.path}">${fn.name}</a>: ${fn.docs.header}</span><span class="body">${fn.docs.body}</body>
                        </div>
                    `
                    }
                    return ''
                })
                .join('')}
        </div>
    </div>
`

    document.body.insertAdjacentHTML('beforeend', modalHTML)

    var modal = document.getElementById('environmentInfoModal')
    var span = document.getElementsByClassName('close')[0]

    // CMD/CTRL + E to toggle the modal
    document.addEventListener('keydown', function (event) {
        if (event.key === 'e' && (event.metaKey || event.ctrlKey)) {
            if (modal.style.display === 'block') {
                modal.style.display = 'none'
            } else {
                modal.style.display = 'block'
            }
        }
    })
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = 'none'
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none'
        }
    }
}
