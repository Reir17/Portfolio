import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

// Import komponen-komponen yang digunakan
// PASTIKAN JALUR INI BENAR! Jika semua komponen ada di 'src/components/', gunakan './ComponentName'
import HeroSection from './HeroSection';
import AboutMeSection from './AboutMeSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperiencesSection from './ExperiencesSection';
import EducationSection from './EducationSection';
import ActivitiesSection from './ActivitiesSection'; // <--- JALUR IMPOR INI TELAH DIPERBAIKI
import ArticlesSection from './ArticlesSection';
import Contact from './Contact';

// Menerima heroText sebagai prop dari App.js
function Home({ heroText }) {
  const [aboutMe, setAboutMe] = useState({ id: 1, deskripsi: '', gambar_url: '', name: '' });
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [activities, setActivities] = useState([]);
  const [articles, setArticles] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  const [loadingHomeData, setLoadingHomeData] = useState(true);
  const [error, setError] = useState(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const API_BASE_URL = 'http://localhost:3001/api';

  const projectsRef = useRef(null);
  const scrollProjectsIntervalRef = useRef(null);
  const experiencesRef = useRef(null);
  const scrollExperiencesIntervalRef = useRef(null);
  const activitiesRef = useRef(null);
  const scrollActivitiesIntervalRef = useRef(null);
  const articlesRef = useRef(null);
  const scrollArticlesIntervalRef = useRef(null);

  const setupAutoScroll = useCallback((ref, items, intervalRef) => {
    const container = ref.current;
    if (!container || items.length === 0) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const scrollRight = () => {
      const itemWidth = container.children[0]?.offsetWidth + 24;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let targetScroll = currentScroll + itemWidth;

      if (targetScroll >= maxScroll) {
        targetScroll = 0;
      }

      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    intervalRef.current = setInterval(scrollRight, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchHomeSpecificData = async () => {
      try {
        const [
          aboutMeRes,
          skillsRes,
          projectsRes,
          experiencesRes,
          educationRes,
          activitiesRes,
          articlesRes,
          hobbiesRes
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/about`),
          axios.get(`${API_BASE_URL}/skills`),
          axios.get(`${API_BASE_URL}/projects`),
          axios.get(`${API_BASE_URL}/experiences`),
          axios.get(`${API_BASE_URL}/education`),
          axios.get(`${API_BASE_URL}/activities`),
          axios.get(`${API_BASE_URL}/articles`),
          axios.get(`${API_BASE_URL}/hobbies`)
        ]);

        setAboutMe({
          ...aboutMeRes.data || { id: 1, deskripsi: '', gambar_url: '', name: '' },
          name: aboutMeRes.data?.name || ''
        });

        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperiences(experiencesRes.data);
        setEducation(educationRes.data);
        setActivities(activitiesRes.data);
        setArticles(articlesRes.data);
        setHobbies(hobbiesRes.data);

      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch home-specific data:", err);
      } finally {
        setLoadingHomeData(false);
      }
    };

    fetchHomeSpecificData();
  }, []);

  useEffect(() => {
    if (!loadingHomeData && projects.length > 0) {
      return setupAutoScroll(projectsRef, projects, scrollProjectsIntervalRef);
    }
  }, [loadingHomeData, projects, setupAutoScroll]);

  useEffect(() => {
    if (!loadingHomeData && experiences.length > 0) {
      return setupAutoScroll(experiencesRef, experiences, scrollExperiencesIntervalRef);
    }
  }, [loadingHomeData, experiences, setupAutoScroll]);

  useEffect(() => {
    if (!loadingHomeData && activities.length > 0) {
      return setupAutoScroll(activitiesRef, activities, scrollActivitiesIntervalRef);
    }
  }, [loadingHomeData, activities, setupAutoScroll]);

  useEffect(() => {
    if (!loadingHomeData && articles.length > 0) {
      return setupAutoScroll(articlesRef, articles, scrollArticlesIntervalRef);
    }
  }, [loadingHomeData, articles, setupAutoScroll]);

  if (loadingHomeData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-solid"></div>
        <p className="mt-4 text-lg">Memuat data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800 p-4">
        <p className="text-xl font-bold">Terjadi Kesalahan:</p>
        <p className="mt-2 text-center">{error}</p>
        <p className="mt-4">Mohon pastikan server backend berjalan dan dapat diakses.</p>
      </div>
    );
  }

  return (
    <div className="home-page overflow-x-hidden">
      <HeroSection heroText={heroText} />
      <AboutMeSection heroText={heroText} aboutMe={aboutMe} hobbies={hobbies} />
      <SkillsSection skills={skills} />
      {projects.length > 0 && (
        <ProjectsSection
          projects={projects}
          projectsRef={projectsRef}
          activeProjectIndex={activeProjectIndex}
          setActiveProjectIndex={setActiveProjectIndex}
        />
      )}
      {experiences.length > 0 && (
        <ExperiencesSection experiences={experiences} experiencesRef={experiencesRef} />
      )}
      {education.length > 0 && (
        <EducationSection education={education} />
      )}
      {activities.length > 0 && (
        <ActivitiesSection activities={activities} activitiesRef={activitiesRef} />
      )}
      {articles.length > 0 && (
        <ArticlesSection articles={articles} articlesRef={articlesRef} />
      )}
      <Contact heroText={heroText} />
    </div>
  );
}

export default Home;
