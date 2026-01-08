import { Handler } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

interface AuditIssue {
  wcagSC: string // WCAG Success Criterion (e.g., "1.3.1", "2.4.7")
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion: string
  codeSuggestion?: string
}

interface AuditResponse {
  issues: AuditIssue[]
  summary: string
}

const WCAG_PROMPT = `You are an accessibility expert reviewing JSX/React code for WCAG 2.1 and 2.2 compliance.

Analyze the provided JSX code snippet and identify accessibility issues. For each issue:
1. Map it to the specific WCAG Success Criterion (SC) number (e.g., "1.3.1", "2.4.7", "4.1.2")
2. Determine severity: "error" (violates WCAG), "warning" (may cause issues), or "info" (best practice)
3. Provide a clear message explaining the issue
4. Suggest how to fix it
5. If applicable, provide corrected code

Focus on:
- Semantic HTML (1.3.1)
- Keyboard accessibility (2.1.1, 2.1.2)
- Focus management (2.4.7)
- ARIA usage (4.1.2, 4.1.3)
- Color contrast (1.4.3)
- Form labels (2.5.3)
- Status messages (4.1.3)

Return your response as a JSON object with this structure:
{
  "issues": [
    {
      "wcagSC": "2.4.7",
      "severity": "error",
      "message": "Button lacks visible focus indicator",
      "suggestion": "Add focus-visible styles with 2px outline",
      "codeSuggestion": "button:focus-visible { outline: 2px solid #0ea5e9; }"
    }
  ],
  "summary": "Found 3 issues: 2 errors, 1 warning"
}

Only return valid JSON, no markdown formatting.`

export const handler: Handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { code } = JSON.parse(event.body || '{}')

    if (!code || typeof code !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Code snippet is required' }),
      }
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'ANTHROPIC_API_KEY environment variable is not set',
        }),
      }
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `${WCAG_PROMPT}\n\nCode to review:\n\`\`\`jsx\n${code}\n\`\`\``,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Anthropic')
    }

    // Parse the JSON response
    let auditResult: AuditResponse
    try {
      // Extract JSON from the response (handle markdown code blocks if present)
      let jsonText = content.text.trim()
      if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '')
      }
      auditResult = JSON.parse(jsonText)
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the text
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        auditResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('Failed to parse audit response as JSON')
      }
    }

    // Validate response structure
    if (!auditResult.issues || !Array.isArray(auditResult.issues)) {
      auditResult = {
        issues: [],
        summary: 'No issues found or invalid response format',
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(auditResult),
    }
  } catch (error) {
    console.error('Audit API error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to perform accessibility audit',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}

