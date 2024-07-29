I remade gin by accidentally formatting the echo framework.

I'm not sure if this is a good idea, but I wanted to try it out.

I essentially just took bits of the echo framework I liked , like the middleware, and the logger, and added gin's formattting style to it. I also added a custom logger that prints the request method, path, status code, latency, and IP address.

The code is a mess, but it works.I miss the echo thing that pops up when you run go run main.go, and I didnt want to get rid of it,=. ut i had to. Now it runs CHISO's desk.