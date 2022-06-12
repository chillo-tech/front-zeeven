const dev = process.env.NODE_ENV !== 'production';

export const server = process.env.REDIRECT_URI //dev ? 'http://localhost:3000' : 'https://app.zeeven.chillo.fr';
export const backend = process.env.API_URL //dev ? 'http://localhost:8087' : 'https://api.zeeven.chillo.fr';
