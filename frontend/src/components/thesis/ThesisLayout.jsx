/**
 * Khung trang cho nội dung đề án / chiến lược (khóa luận).
 */
const ThesisLayout = ({ title, eyebrow, children, aside }) => (
  <div className="max-w-4xl mx-auto px-4 py-12 pt-24 pb-20">
    {eyebrow && (
      <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-accent-400 mb-2">
        {eyebrow}
      </p>
    )}
    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">{title}</h1>
    <div className="flex flex-col lg:flex-row gap-10">
      <article className="flex-1 space-y-6 text-slate-700 dark:text-gray-300 leading-relaxed text-[15px] md:text-base">
        {children}
      </article>
      {aside && (
        <aside className="lg:w-72 shrink-0">
          <div className="glass rounded-xl p-5 border border-slate-200/80 dark:border-white/10 sticky top-24 text-sm">
            {aside}
          </div>
        </aside>
      )}
    </div>
  </div>
);

export const T = {
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-100 mt-2">{children}</h3>
  ),
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-gray-400">{children}</ul>
  ),
  li: ({ children }) => <li>{children}</li>,
  note: ({ children }) => (
    <div className="rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-3 text-sm text-slate-700 dark:text-gray-300">
      {children}
    </div>
  ),
  link: ({ to, children }) => (
    <a href={to} className="text-primary-600 hover:underline dark:text-primary-400">
      {children}
    </a>
  ),
};

export default ThesisLayout;
