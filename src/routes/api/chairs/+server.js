import { EDGE_CONFIG_ID, EDGE_CONFIG_TOKEN, VERCEL_API_TOKEN, PRIVATE_PASSPHRASE } from '$env/static/private'

export async function GET() {
    try {
        const readAllEdgeConfigItems = await fetch(
            'https://edge-config.vercel.com/' + EDGE_CONFIG_ID + '/item/chairs?token=' + EDGE_CONFIG_TOKEN
        );
        const result = await readAllEdgeConfigItems.json();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response("Error reading chairs data", { status: 500 });
    }
}

export async function POST({ request }) {
    const { chairs, passphrase } = await request.json();

    if (passphrase !== PRIVATE_PASSPHRASE) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const updateEdgeConfig = await fetch(
            'https://api.vercel.com/v1/edge-config/' + EDGE_CONFIG_ID + '/items',
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${VERCEL_API_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [
                        {
                            operation: 'update',
                            key: 'chairs',
                            value: chairs,
                        },
                    ],
                }),
            },
        );
        const result = await updateEdgeConfig.json();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response("Error updating chairs data", { status: 500 });
    }
}
