export default function SectionHeading({ kicker, title, subtitle, align = 'center', light = false, action }) {
  const center = align === 'center';
  return (
    <div className={`mb-10 flex flex-col gap-4 sm:mb-12 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        {kicker && <span className={`kicker ${light ? '!bg-white/10 !text-sun' : ''}`}>{kicker}</span>}
        <h2 className={`mt-3 text-3xl font-extrabold sm:text-4xl ${light ? '!text-white' : ''}`}>{title}</h2>
        {subtitle && <p className={`mt-3 text-lg ${light ? 'text-white/75' : 'text-navy/65'}`}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
