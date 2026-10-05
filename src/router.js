/**
 * Lightweight Client-Side SPA Router for Vanilla JS
 * Uses HTML5 History API, clean paths, .html aliasing, and URL query params.
 */

class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.currentParams = {};

    window.addEventListener('popstate', () => {
      this.resolve();
    });

    // Intercept clicks on links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link], a[href^="/"], a[href$=".html"]');
      if (link && !link.target && !e.ctrlKey && !e.metaKey) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
          e.preventDefault();
          this.navigate(href);
        }
      }
    });
  }

  normalizePath(rawPath) {
    if (!rawPath) return '/';
    // Remove query and hash if present
    let path = rawPath.split('?')[0].split('#')[0];
    // Remove .html extension
    path = path.replace(/\.html$/i, '');
    // Alias /admin/index -> /admin
    if (path === '/admin/index') path = '/admin';
    if (path === '/index') path = '/';
    if (path === '/user/dashboard') path = '/dashboard';
    // Alias common hyphenated pages to standard routes
    if (path === '/note-details') path = '/notes';
    if (path.startsWith('/note-details/')) path = path.replace('/note-details/', '/notes/');
    if (path === '/pyq-details') path = '/pyqs';
    if (path.startsWith('/pyq-details/')) path = path.replace('/pyq-details/', '/pyqs/');
    if (path === '/job-details') path = '/jobs';
    if (path.startsWith('/job-details/')) path = path.replace('/job-details/', '/jobs/');
    if (path === '/company-details') path = '/companies';
    if (path.startsWith('/company-details/')) path = path.replace('/company-details/', '/companies/');
    if (path === '/interview-details') path = '/interviews';
    if (path.startsWith('/interview-details/')) path = path.replace('/interview-details/', '/interviews/');
    if (path === '/upload-note') path = '/notes/upload';
    if (path === '/upload-pyq') path = '/pyqs/upload';

    // Remove trailing slash except for root
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path || '/';
  }

  addRoute(path, handler) {
    if (path === '*') {
      this.routes.push({ path, regex: /^.*$/, paramNames: [], handler });
      return this;
    }

    // Convert path pattern e.g. /notes/:id into regex
    const paramNames = [];
    const regexPath = path.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return '([^\\/]+)';
    });

    const regex = new RegExp(`^${regexPath}$`);
    this.routes.push({ path, regex, paramNames, handler });
    return this;
  }

  navigate(url) {
    window.history.pushState(null, '', url);
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.resolve();
  }

  getQueryParams() {
    const search = window.location.search;
    return new URLSearchParams(search);
  }

  setQueryParams(paramsObj) {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(paramsObj)) {
      if (val !== undefined && val !== null && val !== '') {
        params.set(key, val);
      }
    }
    const qs = params.toString();
    const newUrl = window.location.pathname + (qs ? `?${qs}` : '');
    window.history.pushState(null, '', newUrl);
    this.resolve();
  }

  resolve() {
    const rawPathname = window.location.pathname;
    const pathname = this.normalizePath(rawPathname);

    for (const route of this.routes) {
      if (route.path === '*') continue;
      const match = pathname.match(route.regex);
      if (match) {
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        this.currentRoute = route;
        this.currentParams = params;
        route.handler(params, this.getQueryParams());
        return;
      }
    }

    // Fallback: 404 or redirect to /
    const notFoundHandler = this.routes.find(r => r.path === '*');
    if (notFoundHandler) {
      notFoundHandler.handler({}, this.getQueryParams());
    } else if (pathname !== '/') {
      this.navigate('/');
    }
  }
}

export const router = new Router();
