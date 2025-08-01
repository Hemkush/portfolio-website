import   { createClient } from '@vercel/postgres';
//import { unstable_noStore } from 'next/cache';
import { sql } from '@vercel/postgres';

export async function connectToDB() {
    const client = createClient();
    await client.connect();

    try {
        if (client) {
            console.log("Connected to the database successfully!");
            return client;
        }

    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export const dynamic = 'force-dynamic';
export async function getPosts() {
    try {
        // unstable_noStore(); // Prevent caching of this function
       // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
        const data = await sql`SELECT * FROM posts ORDER BY date DESC`;
    return data.rows;
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export async function deletePosts(id: string) {
    
    try {
        // unstable_noStore(); // Prevent caching of this function
       // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
        const data = await sql`DELETE FROM posts WHERE id = (${id})`;
    return data.rows;
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export async function getCoursework() {
    try {
        // unstable_noStore(); // Prevent caching of this function
        const data = await sql`SELECT * FROM course_details`;
    return data.rows;
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}