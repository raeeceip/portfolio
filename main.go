package main

import (
	"html/template"
	"io"
	"os"

	"chiso.dev/internal/handlers"
	"chiso.dev/utils" // Replace with your actual project path
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(utils.CustomLoggerMiddleware)
	e.Logger.SetOutput(&utils.CustomLogger{})
	e.Use(middleware.Recover())

	// Static files
	e.Static("/static", "static")

	// Templates
	t := &Template{
		templates: template.Must(template.ParseGlob("templates/*.html")),
	}
	e.Renderer = t

	// Routes
	e.GET("/", handlers.HomeHandler)
	e.GET("/about", handlers.AboutHandler)
	e.GET("/projects", handlers.ProjectsHandler)
	e.GET("/blog", handlers.BlogHandler)
	e.GET("/blog/:path", handlers.BlogHandler)
	// Print startup banner
	utils.PrintStartupBanner(os.Stdout)

	e.Logger.Fatal(e.Start(":8081"))
}

// ... (rest of your existing functions remain unchanged)
