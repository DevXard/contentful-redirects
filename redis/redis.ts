import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

const redis = new Redis({
    host: 'localhost',
    port: 6379,
});

export async function addEntry(source: string, description: string) {
    console.log("source", source)
    console.log("description", description)
    const result = await redis.call("JSON.ARRAPPEND", "redirects", "data", JSON.stringify({ id: uuid(), source, description }));
    return result;
}

export async function get() {
    const url: any = await redis.call("JSON.GET", "redirects")
    return JSON.parse(url)
}