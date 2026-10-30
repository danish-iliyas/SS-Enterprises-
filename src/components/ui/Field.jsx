// Label + input wrapper with error message, sized for easy tapping.
export default function Field({ label, error, hint, optional, optionalText, id, children, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {optional ? (
            <span className="ml-1 text-sm font-normal text-navy/45">({optionalText || 'optional'})</span>
          ) : (
            <span className="ml-0.5 text-red-500">*</span>
          )}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-sm text-navy/50">{hint}</p>}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Honeypot: hidden from people, often filled by spam bots. The API ignores submissions that fill it.
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" name="website" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
