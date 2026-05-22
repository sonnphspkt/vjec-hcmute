import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Eye } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const student = project.student || {};
  const name = [student.firstName, student.lastName].filter(Boolean).join(' ') || 'Sinh viên';
  const likes = project.likes?.length ?? project.likeCount ?? 0;
  const comments = project.comments?.length ?? project.commentCount ?? 0;

  return (
    <Link
      to={`/projects/${project._id}`}
      className="glass rounded-xl overflow-hidden card-hover block border border-slate-200/70 hover:border-accent-500/40 dark:border-white/5 dark:hover:border-accent-500/30"
    >
      <div className="h-36 bg-gradient-to-br from-primary-200/80 to-slate-200 flex items-center justify-center text-4xl font-bold text-primary-700/35 dark:from-primary-900/60 dark:to-dark-400 dark:text-white/20">
        {(project.title || 'P').slice(0, 1)}
      </div>
      <div className="p-5">
        <p className="text-xs text-accent-400 uppercase tracking-wide mb-1">{project.category}</p>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-slate-900 dark:text-white">{project.title}</h3>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 dark:text-gray-400">{project.description}</p>
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-gray-500">
          <span>{name}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" /> {likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> {comments}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" /> {project.views ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
