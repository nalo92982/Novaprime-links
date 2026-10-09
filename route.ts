import { getToken } from '@vercel/connect';
import { NextResponse } from 'next/server';

/**
 * Server-side AgentPhone token endpoint.
 * Replace the example user ID and add authentication before production use.
 */
export async function POST() {
  try {
    const token = await getToken('agentphone/novaprime-links', {
      subject: {
        type: 'user',
        id: 'usr_123', // TODO: replace with the real authenticated user ID
      },
    });

    // Use the token only on the server; never return it to the browser.
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No AgentPhone token was returned.' },
        { status: 502 }
      );
    }

    // TODO: Call the AgentPhone service here using `token`.
    return NextResponse.json({
      success: true,
      message: 'AgentPhone token obtained on the server.',
    });
  } catch (error) {
    console.error('AgentPhone token request failed:', error);
    return NextResponse.json(
      { success: false, error: 'AgentPhone connection failed.' },
      { status: 500 }
    );
  }
}
