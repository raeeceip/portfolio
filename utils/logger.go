package utils

import (
	"fmt"
	"io"
	"time"

	"github.com/fatih/color"
	"github.com/labstack/echo/v4"
)

type CustomLogger struct{}

func (cl *CustomLogger) Write(p []byte) (n int, err error) {
	return 0, nil // This effectively disables the default Echo logger
}

func CustomLoggerMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		start := time.Now()

		err := next(c)

		stop := time.Now()
		latency := stop.Sub(start)

		method := c.Request().Method
		path := c.Request().URL.Path
		status := c.Response().Status

		methodColor := colorForMethod(method)
		statusColor := colorForStatus(status)

		fmt.Printf("[Chiso's Desk] %v | %s | %s %s | %s | %s\n",
			time.Now().Format("2006/01/02 - 15:04:05"),
			statusColor(fmt.Sprintf("%d", status)),
			methodColor(method),
			path,
			latency,
			c.RealIP(),
		)

		return err
	}
}

func colorForMethod(method string) func(a ...interface{}) string {
	switch method {
	case "GET":
		return color.New(color.FgBlue).SprintFunc()
	case "POST":
		return color.New(color.FgCyan).SprintFunc()
	case "PUT":
		return color.New(color.FgYellow).SprintFunc()
	case "DELETE":
		return color.New(color.FgRed).SprintFunc()
	default:
		return color.New(color.FgWhite).SprintFunc()
	}
}

func colorForStatus(status int) func(a ...interface{}) string {
	switch {
	case status >= 200 && status < 300:
		return color.New(color.FgGreen).SprintFunc()
	case status >= 300 && status < 400:
		return color.New(color.FgYellow).SprintFunc()
	case status >= 400 && status < 500:
		return color.New(color.FgMagenta).SprintFunc()
	default:
		return color.New(color.FgRed).SprintFunc()
	}
}

func PrintStartupBanner(w io.Writer) {
	banner := `
   _____ _     _           _       _____            _    
  / ____| |   (_)         ( )     |  __ \          | |   
 | |    | |__  _ ___  ___ |/ ___  | |  | | ___  ___| | __
 | |    | '_ \| / __|/ _ \  / __| | |  | |/ _ \/ __| |/ /
 | |____| | | | \__ \ (_) | \__ \ | |__| |  __/\__ \   < 
  \_____|_| |_|_|___/\___/  |___/ |_____/ \___||___/_|\_\
                                                         
  :) !
`
	color.New(color.FgCyan).Fprint(w, banner)
	fmt.Fprintln(w, "")
	color.New(color.FgGreen).Fprintf(w, "⇨ http server started on [::]:%d\n", 8081)
}
