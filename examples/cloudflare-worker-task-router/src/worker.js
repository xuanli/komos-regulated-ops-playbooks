export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return json({ error: 'method_not_allowed' }, 405);
    }

    if (!env.KOMOS_API_KEY || !env.KOMOS_TASK_ID) {
      return json({ error: 'missing_komos_configuration' }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400);
    }

    const komosResponse = await fetch(`https://api.komos.ai/public/v1/tasks/${env.KOMOS_TASK_ID}/runs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.KOMOS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: {
          case_id: body.case_id,
          workflow_type: body.workflow_type || 'regulated_portal_check',
          portal: body.portal,
          subject: body.subject,
          return_fields: body.return_fields || ['status', 'evidence_url', 'exception_reason'],
          source: 'cloudflare-worker'
        }
      })
    });

    const result = await readJsonSafely(komosResponse);

    if (!komosResponse.ok) {
      return json({ queued: false, error: 'komos_run_create_failed', detail: result }, komosResponse.status);
    }

    return json({ queued: true, komos_run: result }, 202);
  }
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

async function readJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return { status: response.status };
  }
}

