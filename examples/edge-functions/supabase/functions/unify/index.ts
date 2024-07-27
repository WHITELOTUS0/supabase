import 'https://deno.land/x/xhr@0.3.0/mod.ts'
import { CreateCompletionRequest } from 'https://esm.sh/openai@3.1.0'

Deno.serve(async (req) => {
  const { query } = await req.json()

  const completionConfig: CreateCompletionRequest = {
    model: 'llama-3-8b-chat@fireworks-ai', 
    messages: [{ role: 'user', content: query }], 
    temperature: 0.5,
    max_tokens: 1000,
    stream: true,
  }

  return fetch('https://api.unify.ai/v0/chat/completions', { 
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Deno.env.get('UNIFY_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completionConfig),
  })
})
