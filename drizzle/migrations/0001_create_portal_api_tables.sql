-- Enum for submission review status
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected');

-- DATASETS
CREATE TABLE public.datasets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  station TEXT NOT NULL DEFAULT 'Maitri',
  category TEXT NOT NULL DEFAULT 'general',
  file_link TEXT,
  format TEXT NOT NULL DEFAULT 'CSV',
  status public.submission_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  review_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.datasets TO authenticated;
GRANT SELECT ON public.datasets TO anon;
GRANT ALL ON public.datasets TO service_role;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved datasets" ON public.datasets FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Owners can view own datasets" ON public.datasets FOR SELECT TO authenticated USING (submitted_by = auth.uid());
CREATE POLICY "Admins can view all datasets" ON public.datasets FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Researchers can submit datasets" ON public.datasets FOR INSERT TO authenticated WITH CHECK (submitted_by = auth.uid() AND (public.has_role(auth.uid(), 'researcher') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Admins can update datasets" ON public.datasets FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete datasets" ON public.datasets FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- OUTREACH
CREATE TABLE public.outreach_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  media_link TEXT,
  media_type TEXT NOT NULL DEFAULT 'image',
  status public.submission_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.outreach_posts TO authenticated;
GRANT SELECT ON public.outreach_posts TO anon;
GRANT ALL ON public.outreach_posts TO service_role;
ALTER TABLE public.outreach_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved outreach" ON public.outreach_posts FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Owners can view own outreach" ON public.outreach_posts FOR SELECT TO authenticated USING (submitted_by = auth.uid());
CREATE POLICY "Admins can view all outreach" ON public.outreach_posts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Researchers can submit outreach" ON public.outreach_posts FOR INSERT TO authenticated WITH CHECK (submitted_by = auth.uid() AND (public.has_role(auth.uid(), 'researcher') OR public.has_role(auth.uid(), 'admin')));
CREATE POLICY "Admins can update outreach" ON public.outreach_posts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete outreach" ON public.outreach_posts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- EDUCATION MODULES
CREATE TABLE public.education_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  level TEXT NOT NULL DEFAULT 'school',
  kind TEXT NOT NULL DEFAULT 'module',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.education_modules TO anon, authenticated;
GRANT ALL ON public.education_modules TO service_role;
ALTER TABLE public.education_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view education content" ON public.education_modules FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage education content" ON public.education_modules FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- CAREERS
CREATE TABLE public.careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  position TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'internship',
  location TEXT NOT NULL DEFAULT 'Goa, India',
  deadline DATE,
  is_open BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.careers TO authenticated;
GRANT SELECT ON public.careers TO anon;
GRANT ALL ON public.careers TO service_role;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view careers" ON public.careers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage careers" ON public.careers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- CAREER APPLICATIONS
CREATE TABLE public.career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id UUID REFERENCES public.careers(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT,
  statement TEXT NOT NULL DEFAULT '',
  cv_link TEXT,
  status public.submission_status NOT NULL DEFAULT 'pending',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_applications TO authenticated;
GRANT ALL ON public.career_applications TO service_role;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Applicants view own applications" ON public.career_applications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins view applications" ON public.career_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated can apply" ON public.career_applications FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins update applications" ON public.career_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete applications" ON public.career_applications FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- COLLABORATIONS
CREATE TABLE public.collaborations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner TEXT NOT NULL,
  country TEXT,
  proposal TEXT NOT NULL DEFAULT '',
  kind TEXT NOT NULL DEFAULT 'proposal',
  status public.submission_status NOT NULL DEFAULT 'pending',
  submitted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collaborations TO authenticated;
GRANT SELECT ON public.collaborations TO anon;
GRANT ALL ON public.collaborations TO service_role;
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view approved partnerships" ON public.collaborations FOR SELECT TO anon, authenticated USING (status = 'approved');
CREATE POLICY "Owners view own proposals" ON public.collaborations FOR SELECT TO authenticated USING (submitted_by = auth.uid());
CREATE POLICY "Admins view all collaborations" ON public.collaborations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Authenticated submit proposals" ON public.collaborations FOR INSERT TO authenticated WITH CHECK (submitted_by = auth.uid());
CREATE POLICY "Admins update collaborations" ON public.collaborations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete collaborations" ON public.collaborations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- NEWS
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'update',
  image_link TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.news TO authenticated;
GRANT SELECT ON public.news TO anon;
GRANT ALL ON public.news TO service_role;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view news" ON public.news FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage news" ON public.news FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- VISUALIZATION MEASUREMENTS
CREATE TABLE public.visualization_series (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  station TEXT NOT NULL,
  parameter TEXT NOT NULL,
  unit TEXT NOT NULL DEFAULT '',
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  value NUMERIC NOT NULL
);
CREATE INDEX idx_visualization_series_station ON public.visualization_series (station, parameter, recorded_at);
GRANT SELECT ON public.visualization_series TO anon, authenticated;
GRANT ALL ON public.visualization_series TO service_role;
ALTER TABLE public.visualization_series ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view visualization data" ON public.visualization_series FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage visualization data" ON public.visualization_series FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER datasets_set_updated_at BEFORE UPDATE ON public.datasets FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER outreach_set_updated_at BEFORE UPDATE ON public.outreach_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER collaborations_set_updated_at BEFORE UPDATE ON public.collaborations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();