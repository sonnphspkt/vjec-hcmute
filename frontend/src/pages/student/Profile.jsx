import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Award, Briefcase, Dna, Github, GraduationCap, Linkedin, Sparkles } from 'lucide-react';
import api from '@/services/api';
import useAuthStore from '@/store/authStore';

const StudentProfile = () => {
  const { profile, updateProfile } = useAuthStore();
  const queryClient = useQueryClient();
  const profileId = profile?._id;

  const { data, isLoading } = useQuery({
    queryKey: ['student', profileId],
    queryFn: () => api.get(`/students/${profileId}`).then((r) => r.data.data),
    enabled: !!profileId,
  });

  const [form, setForm] = useState({
    bio: '',
    phone: '',
    city: '',
    github: '',
    linkedin: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        bio: data.bio || '',
        phone: data.phone || '',
        city: data.location?.city || '',
        github: data.socialLinks?.github || '',
        linkedin: data.socialLinks?.linkedin || '',
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (body) => api.put(`/students/${profileId}`, body),
    onSuccess: (res) => {
      updateProfile(res.data.data);
      queryClient.invalidateQueries({ queryKey: ['student', profileId] });
      toast.success('Đã lưu hồ sơ');
    },
    onError: () => toast.error('Lưu thất bại'),
  });

  if (!profileId) {
    return <p className="text-slate-600 dark:text-gray-500">Không tìm thấy hồ sơ sinh viên.</p>;
  }

  if (isLoading) return <p className="text-slate-600 dark:text-gray-500">Đang tải...</p>;

  const handleSave = (e) => {
    e.preventDefault();
    mutation.mutate({
      bio: form.bio,
      phone: form.phone,
      location: { city: form.city, country: data?.location?.country || 'Vietnam' },
      socialLinks: {
        ...(data?.socialLinks || {}),
        github: form.github,
        linkedin: form.linkedin,
      },
    });
  };

  const skills = data?.skills || [];
  const education = data?.education || [];
  const experience = data?.experience || [];
  const certifications = data?.certifications || [];
  const careerDNA = data?.careerDNA || {};
  const completion = data?.completionPercentage ?? profile?.completionPercentage ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
          Career DNA Profile
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Hồ sơ nghề nghiệp số</h1>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-gray-400">
          Cập nhật thông tin cá nhân, kỹ năng, liên kết portfolio và dữ liệu nền để AI matching, Talent Hub và doanh nghiệp đánh giá năng lực thực tế.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="glass rounded-xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-500">Hoàn thiện hồ sơ</p>
              <p className="mt-1 text-4xl font-bold text-gradient">{completion}%</p>
            </div>
            <Dna className="h-9 w-9 text-accent-500" />
          </div>
          <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-white/10">
            <div className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" style={{ width: `${Math.min(100, completion)}%` }} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { label: 'Kỹ năng', value: skills.length, icon: Sparkles },
              { label: 'Học vấn', value: education.length, icon: GraduationCap },
              { label: 'Kinh nghiệm', value: experience.length, icon: Briefcase },
              { label: 'Chứng chỉ', value: certifications.length, icon: Award },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                <Icon className="mb-2 h-4 w-4 text-primary-500" />
                <p className="text-xs text-slate-500 dark:text-gray-500">{label}</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <form onSubmit={handleSave} className="glass rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-slate-900 dark:text-white">Thông tin hiển thị công khai</h2>
          <div>
            <label className="block text-sm text-slate-600 mb-1 dark:text-gray-400">Giới thiệu</label>
            <textarea
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={4}
              className="input-field min-h-[120px]"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-1 dark:text-gray-400">Điện thoại</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1 dark:text-gray-400">Thành phố</label>
              <input
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-600 mb-1 dark:text-gray-400">
                <Github className="h-4 w-4" />
                GitHub
              </label>
              <input
                value={form.github}
                onChange={(e) => setForm((f) => ({ ...f, github: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-600 mb-1 dark:text-gray-400">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </label>
              <input
                value={form.linkedin}
                onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                className="input-field"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-white disabled:opacity-50"
          >
            {mutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </form>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Kỹ năng</h2>
          {skills.length ? (
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 12).map((skill) => (
                <span key={skill._id || skill.name} className="rounded-full bg-primary-500/10 px-3 py-1 text-sm text-primary-800 dark:text-primary-200">
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600 dark:text-gray-400">Chưa có kỹ năng trong hồ sơ.</p>
          )}
        </section>

        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Định hướng AI</h2>
          <p className="text-sm leading-6 text-slate-600 dark:text-gray-400">
            {careerDNA.careerPath || 'Chưa có định hướng Career DNA. Dữ liệu sẽ được tạo khi hồ sơ có đủ kỹ năng, dự án và mục tiêu nghề nghiệp.'}
          </p>
        </section>

        <section className="glass rounded-xl p-5">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Skill gap</h2>
          {careerDNA.skillGaps?.length ? (
            <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
              {careerDNA.skillGaps.slice(0, 4).map((gap) => (
                <li key={gap.skill} className="flex items-center justify-between gap-3">
                  <span>{gap.skill}</span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-200">
                    {gap.importance}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-600 dark:text-gray-400">Chưa có dữ liệu khoảng trống kỹ năng.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentProfile;
