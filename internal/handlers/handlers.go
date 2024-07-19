package handlers

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"time"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "index.html", nil)
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, "about.html", nil)
}

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	projects := []string{"Project 1", "Project 2", "Project 3"}
	renderTemplate(w, "projects.html", projects)
}

func SSEHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	for {
		data := map[string]string{
			"time":    time.Now().Format(time.RFC1123),
			"message": "Server is alive!",
		}
		jsonData, _ := json.Marshal(data)
		fmt.Fprintf(w, "data: %s\n\n", jsonData)
		w.(http.Flusher).Flush()
		time.Sleep(5 * time.Second)
	}
}

func renderTemplate(w http.ResponseWriter, tmpl string, data interface{}) {
	t, err := template.ParseFiles("templates/layout.html", "templates/"+tmpl)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	t.ExecuteTemplate(w, "layout", data)
}
