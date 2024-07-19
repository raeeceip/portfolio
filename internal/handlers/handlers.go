package handlers

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/parser"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadFile("content/home.md")
	if err != nil {
		http.Error(w, "Error reading home file", http.StatusInternalServerError)
		return
	}
	renderMarkdown(w, string(content))
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadFile("content/about.md")
	if err != nil {
		http.Error(w, "Error reading about file", http.StatusInternalServerError)
		return
	}
	renderMarkdown(w, string(content))
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadFile("content/projects.md")
	if err != nil {
		http.Error(w, "Error reading projects file", http.StatusInternalServerError)
		return
	}
	renderMarkdown(w, string(content))
}

func BlogHandler(w http.ResponseWriter, r *http.Request) {
	blogPath := strings.TrimPrefix(r.URL.Path, "/blog/")
	if blogPath == "" {
		// List available blog posts
		files, err := ioutil.ReadDir("content/blog")
		if err != nil {
			http.Error(w, "Error reading blog directory", http.StatusInternalServerError)
			return
		}
		var content strings.Builder
		content.WriteString("# Blog Posts\n\n")
		for _, file := range files {
			if filepath.Ext(file.Name()) == ".md" {
				name := strings.TrimSuffix(file.Name(), ".md")
				content.WriteString(fmt.Sprintf("- [%s](/blog/%s)\n", name, name))
			}
		}
		renderMarkdown(w, content.String())
	} else {
		// Render specific blog post
		content, err := ioutil.ReadFile(fmt.Sprintf("content/blog/%s.md", blogPath))
		if err != nil {
			http.Error(w, "Blog post not found", http.StatusNotFound)
			return
		}
		renderMarkdown(w, string(content))
	}
}

func SSEHandler(w http.ResponseWriter, r *http.Request) {
	// ... (same as before)
}

func renderMarkdown(w http.ResponseWriter, content string) {
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs
	parser := parser.NewWithExtensions(extensions)
	md := []byte(content)
	html := markdown.ToHTML(md, parser, nil)

	t, err := template.ParseFiles("templates/layout.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	data := struct {
		Content template.HTML
	}{
		Content: template.HTML(html),
	}

	t.ExecuteTemplate(w, "layout", data)
}
