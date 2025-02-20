export function installEnvInfo(envInfo) {
    function formatURL(path) {
        if (path.startsWith('http')) {
            return path
        } else {
            return 'https://github.com/kylestew/acorn/blob/ether/src/' + path
        }
    }

    function updateModalContent() {
        const modalContentHTML = `
            <span class="close">&times;</span>
            <h2>Current Acorn Environment</h2>
            <h5>${JSON.stringify(envInfo, null, 2)}</h5>
            <h3>${window.doc_keys.length} functions installed</h3>
            ${window.doc_keys
                .map((key) => {
                    if (window.hasOwnProperty(key)) {
                        const fn = window[key]
                        return `
                        <div class="docInfo">
                        <span class="header"><span class="namespace">[${fn.namespace}]</span> <a href="${formatURL(
                            fn.path
                        )}" target="_blank">${fn.name}</a>: ${fn.docs.header}</span><span class="body">${
                            fn.docs.body
                        }</body>
                        </div>
                    `
                    }
                    return ''
                })
                .join('')}
        `
        document.querySelector('#environmentInfoModal .modal-content').innerHTML = modalContentHTML

        var span = document.getElementsByClassName('close')[0]
        span.onclick = function () {
            modal.style.display = 'none'
        }
    }

    const modalHTML = `
        <div id="environmentInfoModal" style="display:none;">
            <div class="modal-content"></div>
        </div>
    `
    document.body.insertAdjacentHTML('beforeend', modalHTML)

    var modal = document.getElementById('environmentInfoModal')

    // CMD/CTRL + E to toggle the modal
    document.addEventListener('keydown', function (event) {
        if (event.key === 'e' && (event.metaKey || event.ctrlKey)) {
            if (modal.style.display === 'block') {
                modal.style.display = 'none'
            } else {
                updateModalContent()
                modal.style.display = 'block'
            }
        }
    })
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none'
        }
    }
}
