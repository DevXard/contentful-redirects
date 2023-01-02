import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

export async function addEntry(source: string, description: string) {
    const result = await redis.call("JSON.ARRAPPEND", "redirects", "data", JSON.stringify({ source, description }));
    return result;
}

export async function get() {
    const url: any = await redis.call("JSON.GET", "redirects")
    return JSON.parse(url)
}