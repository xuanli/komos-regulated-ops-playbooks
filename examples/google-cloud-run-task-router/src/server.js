import { createServer } from 'node:http';

const PORT = Number(process.env.PORT || 8080);
const KOMOS_API_BASE = process.env.KOMOS_API_BASE || 'https://api.komos.ai';
const MAX_BODY_BYTES = 1_000_000;

const server = createServer(async (request, response) => {
  if (request.url === '/healthz') {
    return json(response, { ok: true });
  }

  if (request.url !== '/run') {
    return json(response, { error: 'not_found' }, 404);
  }

  if (request.method !== 'POST') {
    return json(response, { error: 'method_not_allowed' }, 405);
  }

  if (!process.env.KOMOS_API_KEY || !process.env.KOMOS_TASK_ID) {
    return json(response, { error: 'missing_komos_configuration' }, 500);
  }

  let body;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    return json(response, { error: error.message }, 400);
  }

  const komosResponse = await fetch(`${KOMOS_API_BASE}/public/v1/tasks/${process.env.KOMOS_TASK_ID}/runs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KOMOS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: {
        case_id: body.case_id,
        workflow_type: body.workflow_type || 'regulated_portal_check',
        portal: body.portal,
        subject: body.subject,
        return_fields: body.return_fields || ['status', 'evidence_url', 'exception_reason', 'next_action'],
        audit: body.audit || {},
        source: 'google-cloud-run'
      }
    })
  });

  const result = await readJsonSafely(komosResponse);

  if (!komosResponse.ok) {
    return json(response, { queued: false, error: 'komos_run_create_failed', detail: result }, komosResponse.status);
  }

  return json(response, { queued: true, komos_run: result }, 202);
});

server.listen(PORT, () => {
  console.log(`Komos Cloud Run task router listening on ${PORT}`);
});

function json(response, payload, status = 200) {
  response.writeHead(status, {
    'Content-Type': 'application/json'
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  let rawBody = '';

  for await (const chunk of request) {
    rawBody += chunk;
    if (Buffer.byteLength(rawBody) > MAX_BODY_BYTES) {
      throw new Error('request_body_too_large');
    }
  }

  if (!rawBody) {
    throw new Error('empty_body');
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new Error('invalid_json');
  }
}

async function readJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return { status: response.status };
  }
}
