This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

The following environment variables are required for the application to function correctly:

### Sanity
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID.
- `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity dataset (e.g., `production`).
- `SANITY_API_TOKEN`: Sanity API token with write access for order creation.

### Paystack
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Your Paystack public key for the frontend.
- `PAYSTACK_SECRET_KEY`: Your Paystack secret key for webhook verification.

### Emails (Resend & EmailJS)
- `RESEND_API_KEY`: Your Resend API key for sending order confirmations.
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: EmailJS Service ID for the support form.
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: EmailJS Template ID for the support form.
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: EmailJS Public Key for the support form.

## Deployment Checklist

Before pushing to production (Vercel):

1. **Verify Environment Variables**: Ensure all variables listed above are added to your Vercel project settings.
2. **Resend Domain Verification**: If using Resend, verify your domain in the Resend dashboard to send emails from your own domain (e.g., `orders@hajamuluxe.com`) instead of `onboarding@resend.dev`.
3. **Paystack Webhook**: Set up your Paystack webhook URL in the Paystack dashboard: `https://your-domain.com/api/webhooks/paystack`.
4. **Sanity CORS**: Add your production domain (e.g., `https://hajamuluxe.com`) to the CORS origins in your Sanity project settings.
5. **Sanity Webhook**: Set up a Sanity webhook to trigger on `order` document updates if you want automated status update emails. URL: `https://your-domain.com/api/webhooks/sanity-update`.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
