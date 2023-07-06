# Product Tracker

An application designed to easily track and manage web applications developed and maintained by the Province of BC. 
Built with Next.js


## Getting Started

First, install dependencies by running:

```bash
npm install
# or
yarn install
```

```JSON
"eslint": "8.36.0",
"eslint-config-next": "13.2.4",
"next": "13.2.4",
"react": "18.2.0",
"react-dom": "18.2.0",
"react-tooltip": "^5.10.1",
"sass": "^1.60.0",
"uuid": "^9.0.0"
```

Please copy the `.env.example` to a new `.env.local` with your `HOST` and `PORT` values
```js
NEXT_PUBLIC_HOST=
NEXT_PUBLIC_PORT=
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser!

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed at [http://localhost:3000/api/products](http://localhost:3000/api/products).

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## NOTES

**BUG** -- 
- currently, the first client-side transition to pages/product/[id] (dynamic route) causes Next to perform a...
```bash
[Fast Refresh] rebuilding
```
...which is a client/server rebuild thus causing state to reset to initial in-memory data.
- unfortunately I didn't have to time fix this prior to submission
- however, every subsequent transition/render functions exactly as intended! 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!