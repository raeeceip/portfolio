package handlers

import (
	"fmt"
	"html/template"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"github.com/gorilla/mux"
)

func renderMarkdown(w http.ResponseWriter, content string) {
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs
	p := parser.NewWithExtensions(extensions)
	doc := p.Parse([]byte(content))

	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	htmlContent := markdown.Render(doc, renderer)

	// Preserve markdown syntax for headers and list items
	preservedContent := preserveMarkdownSyntax(string(htmlContent))

	tmpl, err := template.ParseFiles("templates/layout.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := struct {
		Content template.HTML
	}{
		Content: template.HTML(preservedContent),
	}

	tmpl.Execute(w, data)
}

func preserveMarkdownSyntax(content string) string {
	// Preserve headers
	for i := 6; i >= 1; i-- {
		search := fmt.Sprintf("<h%d>", i)
		replace := fmt.Sprintf("<h%d>%s ", i, strings.Repeat("#", i))
		content = strings.ReplaceAll(content, search, replace)
	}

	// Preserve list items
	content = strings.ReplaceAll(content, "<li>", "<li>- ")

	return content
}
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	content, err := os.ReadFile("content/home.md")
	if err != nil {
		http.Error(w, "Error reading home file", http.StatusInternalServerError)
		return
	}
	renderMarkdown(w, string(content))
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	content, err := os.ReadFile("content/about.md")
	if err != nil {
		http.Error(w, "Error reading about file", http.StatusInternalServerError)
		return
	}
	renderMarkdown(w, string(content))
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	content, err := os.ReadFile("content/projects.md")
	if err != nil {
		http.Error(w, "Error reading projects file", http.StatusInternalServerError)
		return
	}
	renderMarkdown(w, string(content))
}

func BlogHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	path := vars["path"]

	if path == "" {
		// List available blog posts
		files, err := os.ReadDir("content/blog")
		if err != nil {
			http.Error(w, "Error reading blog directory", http.StatusInternalServerError)
			return
		}
		var content strings.Builder
		content.WriteString("# Latest:\n\n")
		for _, file := range files {
			if filepath.Ext(file.Name()) == ".md" {
				name := strings.TrimSuffix(file.Name(), ".md")
				content.WriteString(fmt.Sprintf("- [%s](/blog/%s)\n", name, name))
			}
		}
		renderMarkdown(w, content.String())
	} else {
		// Render specific blog post
		content, err := os.ReadFile(fmt.Sprintf("content/blog/%s.md", path))
		if err != nil {
			http.Error(w, "Blog post not found", http.StatusNotFound)
			return
		}
		renderMarkdown(w, string(content))
	}
}

func SSEHandler(w http.ResponseWriter, r *http.Request) {
	// Implement SSE logic here
}
