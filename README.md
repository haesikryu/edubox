# EduBox

영상 대신 읽고, 펼쳐보고, 퀴즈로 확인하는 HTML 기반 인터랙티브 교육 플랫폼 MVP입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

Supabase 환경변수가 없으면 브라우저 `localStorage`를 사용하는 데모 모드로 실행됩니다.

## Supabase 연결

`.env.example`을 `.env.local`로 복사하고 프로젝트 값을 입력합니다.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

`supabase/migrations/001_initial_schema.sql`을 적용하고 `check-answer` Edge Function을 배포합니다. 운영 환경에서는 퀴즈 정답을 프런트엔드 콘텐츠에서 제거하고 Edge Function에서만 관리해야 합니다. 현재 프런트엔드 정답은 데모 체험을 위한 것입니다.

Supabase Authentication → URL Configuration:

- Site URL: `https://haesikryu.github.io/edubox/`
- Redirect URL: `https://haesikryu.github.io/edubox/**`
- 개발 URL: `http://localhost:5173/**`

## GitHub Pages 배포

1. GitHub에서 `haesikryu/edubox` 저장소를 생성합니다.
2. 이 프로젝트를 `main` 브랜치에 push합니다.
3. Settings → Pages → Source를 `GitHub Actions`로 설정합니다.
4. 필요하면 Repository secrets에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`를 등록합니다.

배포 URL은 `https://haesikryu.github.io/edubox/`입니다.
