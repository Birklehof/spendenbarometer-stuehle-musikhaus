import fs from 'fs/promises';

export async function GET() {
    const data = await fs.readFile('data.json', 'utf8');
    const json = JSON.parse(data);
    return new Response(JSON.stringify(json), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST({ request }) {
    const { chairs } = await request.json();

    await fs.writeFile('data.json', JSON.stringify({ chairs }, null, 2));
    return new Response("OK");
}
