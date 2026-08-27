import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const answers: Record<string, string> = {
  'root-element': '<html>',
  'href-attribute': 'href',
  'main-content': '<main>',
}

Deno.serve(async (request) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }
  if (request.method === 'OPTIONS') return new Response('ok', { headers: cors })

  const authorization = request.headers.get('Authorization')
  if (!authorization) return Response.json({ error: '로그인이 필요합니다.' }, { status: 401, headers: cors })

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!, { global: { headers: { Authorization: authorization } } })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: '유효하지 않은 세션입니다.' }, { status: 401, headers: cors })

  const { quizId, answer } = await request.json()
  const passed = answers[quizId]?.toLowerCase() === String(answer).trim().toLowerCase()
  await supabase.from('quiz_attempts').insert({ user_id: user.id, quiz_id: quizId, passed })
  return Response.json({ passed }, { headers: { ...cors, 'Content-Type': 'application/json' } })
})
