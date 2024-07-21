document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        document.getElementById('content').classList.remove('fade-in');
        setTimeout(() => {
            fetch(e.target.href)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const content = doc.getElementById('content').innerHTML;
                    document.getElementById('content').innerHTML = content;
                    document.getElementById('content').classList.add('fade-in');
                    history.pushState(null, '', e.target.href);
                });
        }, 250);
    }
});