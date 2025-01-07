export function getSuccessHTML() {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Email Verification Success</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f5f5f5;
          }
          .container {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .title { color: #10b981; }
          .message { color: #374151; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">Email Verified Successfully!</h1>
          <p class="message">You can now return to the app and sign in.</p>
        </div>
      </body>
    </html>
  `;
}
