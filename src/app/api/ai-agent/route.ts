import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { question, endpoint } = await request.json();
    
    let url: string;
    
    if (endpoint === 'primary') {
      url = 'https://rryvg55fyi.execute-api.us-east-1.amazonaws.com/default/Agente-Experto-Confluence';
    } else {
      url = 'https://451mknt4hg.execute-api.us-east-1.amazonaws.com/default/Agente-de-Consultas';
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: question
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Error en el servidor proxy' },
      { status: 500 }
    );
  }
} 