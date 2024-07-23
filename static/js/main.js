document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        loadContent(e.target.href);
    }
});

function loadContent(url) {
    document.getElementById('content').classList.remove('fade-in');
    setTimeout(() => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.getElementById('content').innerHTML;
                document.getElementById('content').innerHTML = content;
                document.getElementById('content').classList.add('fade-in');
                if (url.includes('/projects')) {
                    document.getElementById('content').classList.add('projects');
                } else {
                    document.getElementById('content').classList.remove('projects');
                }
                history.pushState(null, '', url);
                highlightSyntax();
            });
    }, 250);
}

function highlightSyntax() {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const text = block.textContent;
        const highlighted = text
            .replace(/\b(function|return|if|else|for|while)\b/g, '<span class="keyword">$1</span>')
            .replace(/\b([a-zA-Z]+)(?=\()/g, '<span class="function">$1</span>')
            .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span class="string">$&</span>')
            .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
        block.innerHTML = highlighted;
    });
}

// Initial syntax highlighting
highlightSyntax();