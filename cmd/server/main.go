package main

import (
	"fmt"
	"log"
	"net/http"

	"chiso.dev/internal/handlers"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	// Serve static files
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Routes
	r.HandleFunc("/", handlers.HomeHandler)
	r.HandleFunc("/about", handlers.AboutHandler)
	r.HandleFunc("/projects", handlers.ProjectsHandler)
	r.HandleFunc("/blog", handlers.BlogHandler)
	r.HandleFunc("/blog/{path:.*}", handlers.BlogHandler)
	r.HandleFunc("/sse", handlers.SSEHandler)

	r.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, World!")
	})

	fmt.Println("Server starting on :8081")
	log.Fatal(http.ListenAndServe(":8081", r))
}
