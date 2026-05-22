import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Sparkles } from 'lucide-react';

const JobCard = ({ job }) => {
  const company = job.company || {};
  const city = job.location?.city || '—';
  const salary = job.salary;
  const salaryText =
    salary?.isPublic && (salary?.min || salary?.max)
      ? `${(salary.min / 1e6).toFixed(0)}–${(salary.max / 1e6).toFixed(0)} tr`
      : 'Thỏa thuận';

  return (
    <Link
      to={`/jobs/${job._id}`}
      className="glass rounded-xl p-6 card-hover block border border-slate-200/70 hover:border-primary-500/40 dark:border-white/5 dark:hover:border-primary-500/30"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/25 to-accent-500/25 flex items-center justify-center text-sm font-bold shrink-0 text-primary-800 dark:from-primary-500/40 dark:to-accent-500/40 dark:text-white">
            {(company.companyName || 'C').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-lg truncate text-slate-900 dark:text-white">{job.title}</h3>
            <p className="text-slate-600 text-sm truncate dark:text-gray-400">{company.companyName || 'Doanh nghiệp'}</p>
          </div>
        </div>
        {job.isFeatured && (
          <span className="flex items-center gap-1 text-xs text-accent-400 shrink-0">
            <Sparkles className="w-3.5 h-3.5" /> Nổi bật
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-slate-600 mb-4 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {city}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" /> {job.type}
        </span>
        <span className="text-primary-700 dark:text-primary-300">{salaryText}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {(job.requiredSkills || []).slice(0, 4).map((s) => (
          <span
            key={s.name}
            className="text-xs px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-800 dark:bg-dark-400 dark:border-white/10 dark:text-gray-100"
          >
            {s.name}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default JobCard;
