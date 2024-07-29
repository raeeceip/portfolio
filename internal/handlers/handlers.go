package handlers

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/html"
	"github.com/gomarkdown/markdown/parser"
	"github.com/labstack/echo/v4"
)

func renderMarkdown(c echo.Context, content string) error {
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs
	p := parser.NewWithExtensions(extensions)
	doc := p.Parse([]byte(content))

	htmlFlags := html.CommonFlags | html.HrefTargetBlank
	opts := html.RendererOptions{Flags: htmlFlags}
	renderer := html.NewRenderer(opts)

	htmlContent := markdown.Render(doc, renderer)

	return c.Render(http.StatusOK, "layout.html", map[string]interface{}{
		"Content": template.HTML(htmlContent),
	})
}

func HomeHandler(c echo.Context) error {
	content, err := ioutil.ReadFile("content/home.md")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error reading home file")
	}
	return renderMarkdown(c, string(content))
}

func AboutHandler(c echo.Context) error {
	content, err := ioutil.ReadFile("content/about.md")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error reading about file")
	}
	return renderMarkdown(c, string(content))
}

func ProjectsHandler(c echo.Context) error {
	content, err := ioutil.ReadFile("content/projects.md")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Error reading projects file")
	}
	return renderMarkdown(c, string(content))
}

func BlogHandler(c echo.Context) error {
	path := c.Param("path")

	if path == "" {
		// List available blog posts
		files, err := ioutil.ReadDir("content/blog")
		if err != nil {
			return c.String(http.StatusInternalServerError, "Error reading blog directory")
		}
		var content strings.Builder
		content.WriteString("# Latest:\n\n")
		for _, file := range files {
			if filepath.Ext(file.Name()) == ".md" {
				name := strings.TrimSuffix(file.Name(), ".md")
				content.WriteString(fmt.Sprintf("- [%s](/blog/%s)\n", name, name))
			}
		}
		return renderMarkdown(c, content.String())
	} else {
		// Render specific blog post
		content, err := ioutil.ReadFile(fmt.Sprintf("content/blog/%s.md", path))
		if err != nil {
			return c.String(http.StatusNotFound, "Blog post not found")
		}
		return renderMarkdown(c, string(content))
	}
}
