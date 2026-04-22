/**
 * Project: Space Station — Cloudflare Worker Entry Point
 *
 * This is a thin shim. The static assets binding (ASSETS) handles
 * serving index.html, JS bundles, .dsk disk images, etc.
 * The Worker only needs to handle edge cases and add headers.
 */

export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    _ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);

    // ── CORS headers for disk image fetches ──────────────────
    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── Serve .dsk files with correct binary content-type ────
    if (url.pathname.endsWith('.dsk')) {
      const assetResponse = await env.ASSETS.fetch(request);
      const headers = new Headers(assetResponse.headers);
      headers.set('Content-Type', 'application/octet-stream');
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        headers,
      });
    }

    // ── Everything else: delegate to the static assets binding ─
    const response = await env.ASSETS.fetch(request);

    // Add security + cache headers
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
