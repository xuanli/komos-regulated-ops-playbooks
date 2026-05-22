export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  if (!process.env.KOMOS_API_KEY || !process.env.KOMOS_TASK_ID) {
    res.status(500).json({ error: 'missing_komos_configuration' });
    return;
  }

  const response = await fetch(`https://api.komos.ai/public/v1/tasks/${process.env.KOMOS_TASK_ID}/runs`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.KOMOS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      input: {
        case_id: req.body.case_id,
        workflow_type: req.body.workflow_type || 'regulated_portal_check',
        portal: req.body.portal,
        subject: req.body.subject,
        return_fields: req.body.return_fields || ['status', 'evidence_url', 'exception_reason'],
        source: 'vercel-serverless'
      }
    })
  });

  const result = await readJsonSafely(response);

  if (!response.ok) {
    res.status(response.status).json({ queued: false, error: 'komos_run_create_failed', detail: result });
    return;
  }

  res.status(202).json({ queued: true, komos_run: result });
}

async function readJsonSafely(response) {
  try {
    return await response.json();
  } catch {
    return { status: response.status };
  }
}

