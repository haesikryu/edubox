export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo" aria-label="EduBox 홈">
      <span className="logo-mark"><i /><i /><i /></span>
      {!compact && <span>EDU<span>BOX</span></span>}
    </div>
  )
}
