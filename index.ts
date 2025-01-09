import figlet from "figlet";

let requestCounter = 0;

const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        requestCounter++;
        console.log(`Web request #${requestCounter} received`);
        if (req.method === "POST") {
            const formData = await req.formData();
            const userInput = formData.get("input") || "";
            const body = figlet.textSync(`Hello, ${userInput} - You're using Bun! `);
            const html = `
                <html>
                    <body>
                        <pre>${body}</pre>
                        <form method="POST">
                            <input type="text" name="input" />
                            <button type="submit">Submit</button>
                        </form>
                    </body>
                </html>
            `;
            return new Response(html, { headers: { "Content-Type": "text/html" } });
        }

        const initialBody = figlet.textSync("Hello, Bun!");
        const html = `
            <html>
                <body>
                    <pre>${initialBody}</pre>
                    <form method="POST">
                        <input type="text" name="input" />
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </html>
        `;
        return new Response(html, { headers: { "Content-Type": "text/html" } });
    },
  });
  
  console.log(`Listening on http://localhost:${server.port} ...`);