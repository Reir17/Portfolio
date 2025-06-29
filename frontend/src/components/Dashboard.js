import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Typography, Box, Button, TextField, CircularProgress, Switch, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Import form components
import AddProjectForm from './AddProjectForm';
import AddArticleForm from './AddArticleForm';
import AddHobbyForm from './AddHobbyForm';

export default function Dashboard() {
  const API_BASE_URL = 'http://localhost:3001/api';

  // State to manage which section is active
  const [activeSection, setActiveSection] = useState('hero'); // Default active section

  // === State Management for all data ===
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ nama_skill: '', level: '' });
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ nama_project: '', deskripsi: '', link: '', gambar: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ posisi: '', tempat: '', tahun: '', deskripsi: '' });
  const [editingExperienceId, setEditingExperienceId] = useState(null);

  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({ jurusan: '', institusi: '', tahun: '' });
  const [editingEducationId, setEditingEducationId] = useState(null);

  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ title: '', time: '', image: '', deskripsi: '' });
  const [editingActivityId, setEditingActivityId] = useState(null);

  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', author: '', date: '', content: '', image_url: '', article_url: '' });
  const [editingArticle, setEditingArticle] = useState(null);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);

  const [heroContent, setHeroContent] = useState({ name: '', role_text: '', main_title: '', year_text: '', social_linkedin: '', social_github: '', social_instagram: '', email: '' });
  const [editingHeroContent, setEditingHeroContent] = useState(false);

  const [aboutMeContent, setAboutMeContent] = useState({ id: 1, deskripsi: '', gambar_url: '', name: '' });
  const [editingAboutMeContent, setEditingAboutMeContent] = useState(false);

  const [hobbies, setHobbies] = useState([]);
  const [showAddHobbyForm, setShowAddHobbyForm] = useState(false);
  const [editingHobby, setEditingHobby] = useState(null);

  const [globalMessage, setGlobalMessage] = useState({ text: '', type: '' });
  const [loadingDashboard, setLoadingDashboard] = useState(true); // New loading state for the entire dashboard

  // Message display logic
  useEffect(() => {
    if (globalMessage.text) {
      const timer = setTimeout(() => {
        setGlobalMessage({ text: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [globalMessage]);

  const showMessage = (text, type) => {
    setGlobalMessage({ text, type });
  };

  // Fetch all initial data on component mount
  useEffect(() => {
    const fetchAllDashboardData = async () => {
      setLoadingDashboard(true);
      try {
        await Promise.all([
          fetchHeroContent(),
          fetchAboutMeContent(),
          fetchHobbies(),
          fetchSkills(),
          fetchProjects(),
          fetchExperiences(),
          fetchEducation(),
          fetchActivities(),
          fetchArticles(),
        ]);
      } catch (error) {
        console.error('Error fetching all dashboard data:', error);
        showMessage(`Failed to load all dashboard data: ${error.message}`, 'error');
      } finally {
        setLoadingDashboard(false);
      }
    };
    fetchAllDashboardData();
  }, []);

  // --- Hero Content Management ---
  const fetchHeroContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hero`);
      setHeroContent(response.data || { name: '', role_text: '', main_title: '', year_text: '', social_linkedin: '', social_github: '', social_instagram: '', email: '' });
    } catch (error) {
      console.error('Error fetching hero content:', error);
      showMessage(`Failed to retrieve Hero content: ${error.message}`, 'error');
      throw error; // Propagate error for Promise.all
    }
  };

  const saveHeroContent = async () => {
    try {
      await axios.put(`${API_BASE_URL}/hero`, heroContent);
      showMessage('Hero content successfully updated!', 'success');
      setEditingHeroContent(false);
      fetchHeroContent();
    } catch (error) {
      console.error('Error saving hero content:', error.response ? error.response.data : error.message);
      showMessage(`Failed to update Hero content: ${error.response?.data?.error || error.message}`, 'error');
    }
  };

  const handleHeroContentChange = (e) => {
    const { name, value } = e.target;
    setHeroContent(prev => ({ ...prev, [name]: value }));
  };

  // --- About Me Content Management ---
  const fetchAboutMeContent = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/about`);
      setAboutMeContent(response.data || { id: 1, deskripsi: '', gambar_url: '', name: '' });
    } catch (error) {
      console.error('Error fetching About Me content:', error);
      showMessage(`Failed to retrieve About Me content: ${error.message}`, 'error');
      throw error;
    }
  };

  const handleAboutMeChange = (e) => {
    const { name, value } = e.target;
    setAboutMeContent(prev => ({ ...prev, [name]: value }));
  };

  const saveAboutMeContent = async () => {
    try {
      await axios.put(`${API_BASE_URL}/about/1`, aboutMeContent);
      showMessage('About Me content successfully updated!', 'success');
      setEditingAboutMeContent(false);
      fetchAboutMeContent();
    } catch (error) {
      console.error('Error saving About Me content:', error.response ? error.response.data : error.message);
      showMessage(`Failed to update About Me content: ${error.response?.data?.message || error.message}`, 'error');
    }
  };

  // --- Hobbies Management ---
  const fetchHobbies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/hobbies`);
      setHobbies(response.data);
    } catch (error) {
      console.error('Error fetching hobbies:', error);
      showMessage(`Failed to retrieve hobbies: ${error.message}`, 'error');
      throw error;
    }
  };

  const handleSaveHobby = () => {
    setShowAddHobbyForm(false);
    setEditingHobby(null);
    fetchHobbies();
  };

  const startEditHobby = (hobby) => {
    setEditingHobby(hobby);
    setShowAddHobbyForm(true);
  };

  const deleteHobby = async (id) => {
    if (window.confirm('Are you sure you want to delete this hobby?')) {
      try {
        await axios.delete(`${API_BASE_URL}/hobbies/${id}`);
        showMessage('Hobby successfully deleted!', 'success');
        fetchHobbies();
      } catch (error) {
        console.error('Error deleting hobby:', error.response ? error.response.data : error.message);
        showMessage(`Failed to delete hobby: ${error.response?.data?.message || error.message}`, 'error');
      }
    }
  };

  // --- Skills Management ---
  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/skills`);
      setSkills(res.data);
    } catch (err) {
      showMessage(`Failed to retrieve skills: ${err.message}`, 'error');
      throw err;
    }
  };
  const addSkill = async () => {
    if (!newSkill.nama_skill || newSkill.level === '') {
      showMessage('Skill name and level must be filled.', 'error');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/skills`, newSkill);
      fetchSkills();
      setNewSkill({ nama_skill: '', level: '' });
      showMessage('Skill successfully added!', 'success');
    } catch (err) {
      showMessage(`Failed to add skill: ${err.message}`, 'error');
    }
  };
  const deleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`${API_BASE_URL}/skills/${id}`);
        fetchSkills();
        showMessage('Skill successfully deleted!', 'success');
      } catch (err) {
        showMessage(`Failed to delete skill: ${err.message}`, 'error');
      }
    }
  };
  const startEditSkill = (skill) => {
    setEditingSkillId(skill.id);
    setNewSkill({ nama_skill: skill.nama_skill, level: skill.level });
  };
  const updateSkill = async () => {
    if (!newSkill.nama_skill || newSkill.level === '') {
      showMessage('Skill name and level must be filled.', 'error');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/skills/${editingSkillId}`, newSkill);
      fetchSkills();
      setEditingSkillId(null);
      setNewSkill({ nama_skill: '', level: '' });
      showMessage('Skill successfully updated!', 'success');
    } catch (err) {
      showMessage(`Failed to update skill: ${err.message}`, 'error');
    }
  };

  // --- Projects Management ---
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(res.data);
    } catch (err) {
      showMessage(`Failed to retrieve projects: ${err.message}`, 'error');
      throw err;
    }
  };
  const handleAddProjectSuccess = () => {
    fetchProjects();
    showMessage('Project successfully added!', 'success');
  };
  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`);
        fetchProjects();
        showMessage('Project successfully deleted!', 'success');
      } catch (err) {
        showMessage(`Failed to delete project: ${err.message}`, 'error');
      }
    }
  };
  const startEditProject = (project) => {
    setEditingProjectId(project.id);
    setNewProject(project);
  };
  const updateProject = async () => {
    if (!newProject.nama_project || !newProject.deskripsi) {
      showMessage('Project name and description must be filled.', 'error');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/projects/${editingProjectId}`, newProject);
      fetchProjects();
      setEditingProjectId(null);
      setNewProject({ nama_project: '', deskripsi: '', link: '', gambar: '' });
      showMessage('Project successfully updated!', 'success');
    } catch (err) {
      showMessage(`Failed to update project: ${err.message}`, 'error');
    }
  };

  // --- Experience Management ---
  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/experiences`);
      setExperiences(res.data);
    } catch (err) {
      showMessage(`Failed to retrieve experiences: ${err.message}`, 'error');
      throw err;
    }
  };
  const addExperience = async () => {
    if (!newExperience.posisi || !newExperience.tempat || !newExperience.tahun || !newExperience.deskripsi) {
      showMessage('All experience fields must be filled.', 'error');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/experiences`, newExperience);
      fetchExperiences();
      setNewExperience({ posisi: '', tempat: '', tahun: '', deskripsi: '' });
      showMessage('Experience successfully added!', 'success');
    } catch (err) {
      showMessage(`Failed to add experience: ${err.message}`, 'error');
    }
  };
  const deleteExperience = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await axios.delete(`${API_BASE_URL}/experiences/${id}`);
        fetchExperiences();
        showMessage('Experience successfully deleted!', 'success');
      } catch (err) {
        showMessage(`Failed to delete experience: ${err.message}`, 'error');
      }
    }
  };
  const startEditExperience = (exp) => {
    setEditingExperienceId(exp.id);
    setNewExperience(exp);
  };
  const updateExperience = async () => {
    if (!newExperience.posisi || !newExperience.tempat || !newExperience.tahun || !newExperience.deskripsi) {
      showMessage('All experience fields must be filled.', 'error');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/experiences/${editingExperienceId}`, newExperience);
      fetchExperiences();
      setEditingExperienceId(null);
      setNewExperience({ posisi: '', tempat: '', tahun: '', deskripsi: '' });
      showMessage('Experience successfully updated!', 'success');
    } catch (err) {
      showMessage(`Failed to update experience: ${err.message}`, 'error');
    }
  };

  // --- Education Management ---
  const fetchEducation = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/education`);
      setEducation(res.data);
    } catch (err) {
      showMessage(`Failed to retrieve education: ${err.message}`, 'error');
      throw err;
    }
  };
  const addEducation = async () => {
    if (!newEducation.jurusan || !newEducation.institusi || !newEducation.tahun) {
      showMessage('All education fields must be filled.', 'error');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/education`, newEducation);
      fetchEducation();
      setNewEducation({ jurusan: '', institusi: '', tahun: '' });
      showMessage('Education successfully added!', 'success');
    } catch (err) {
      showMessage(`Failed to add education: ${err.message}`, 'error');
    }
  };
  const deleteEducation = async (id) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      try {
        await axios.delete(`${API_BASE_URL}/education/${id}`);
        fetchEducation();
        showMessage('Education successfully deleted!', 'success');
      } catch (err) {
        showMessage(`Failed to delete education: ${err.message}`, 'error');
      }
    }
  };
  const startEditEducation = (edu) => {
    setEditingEducationId(edu.id);
    setNewEducation(edu);
  };
  const updateEducation = async () => {
    if (!newEducation.jurusan || !newEducation.institusi || !newEducation.tahun) {
      showMessage('All education fields must be filled.', 'error');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/education/${editingEducationId}`, newEducation);
      fetchEducation();
      setEditingEducationId(null);
      setNewEducation({ jurusan: '', institusi: '', tahun: '' });
      showMessage('Education successfully updated!', 'success');
    } catch (err) {
      showMessage(`Failed to update education: ${err.message}`, 'error');
    }
  };

  // --- Activities Management ---
  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/activities`);
      setActivities(res.data);
    } catch (err) {
      showMessage(`Failed to retrieve activities: ${err.message}`, 'error');
      throw err;
    }
  };
  const addActivity = async () => {
    if (!newActivity.title || !newActivity.time || !newActivity.deskripsi) {
      showMessage('Activity title, time, and description must be filled.', 'error');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/activities`, newActivity);
      fetchActivities();
      setNewActivity({ title: '', time: '', image: '', deskripsi: '' });
      showMessage('Activity successfully added!', 'success');
    } catch (err) {
      showMessage(`Failed to add activity: ${err.message}`, 'error');
    }
  };
  const deleteActivity = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await axios.delete(`${API_BASE_URL}/activities/${id}`);
        fetchActivities();
        showMessage('Activity successfully deleted!', 'success');
      } catch (err) {
        showMessage(`Failed to delete activity: ${err.message}`, 'error');
      }
    }
  };
  const startEditActivity = (act) => {
    setEditingActivityId(act.id);
    setNewActivity(act);
  };
  const updateActivity = async () => {
    if (!newActivity.title || !newActivity.time || !newActivity.deskripsi) {
      showMessage('Activity title, time, and description must be filled.', 'error');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/activities/${editingActivityId}`, newActivity);
      fetchActivities();
      setEditingActivityId(null);
      setNewActivity({ title: '', time: '', image: '', deskripsi: '' });
      showMessage('Activity successfully updated!', 'success');
    } catch (err) {
      showMessage(`Failed to update activity: ${err.message}`, 'error');
    }
  };

  // --- Article Management ---
  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/articles`);
      setArticles(res.data);
    } catch (err) {
      showMessage(`Failed to retrieve articles: ${err.message}`, 'error');
      throw err;
    }
  };
  const deleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`${API_BASE_URL}/articles/${id}`);
        fetchArticles();
        showMessage('Article successfully deleted!', 'success');
      } catch (err) {
        showMessage(`Failed to delete article: ${err.message}`, 'error');
      }
    }
  };
  const handleSaveArticle = () => {
    setShowAddArticleForm(false);
    setEditingArticle(null);
    fetchArticles();
  };
  const startEditArticle = (article) => {
    setEditingArticle(article);
    setShowAddArticleForm(true);
  };

  // Render loading state for the whole dashboard
  if (loadingDashboard) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <CircularProgress color="primary" size={60} />
        <Typography variant="h6" className="mt-4">Loading Dashboard Data...</Typography>
      </Box>
    );
  }

  return (
    <Box className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Navigasi */}
      <Box className="w-64 bg-gray-800 text-white p-6 space-y-4 shadow-lg flex-shrink-0">
        <Typography variant="h6" className="font-bold text-center text-indigo-300 mb-6">
          Admin Panel
        </Typography>
        <nav className="space-y-2">
          {[
            { id: 'hero', name: 'Hero Section' },
            { id: 'aboutMe', name: 'About Me' },
            { id: 'hobbies', name: 'Hobbies' },
            { id: 'skills', name: 'Skills' },
            { id: 'projects', name: 'Projects' },
            { id: 'experiences', name: 'Experiences' },
            { id: 'education', name: 'Education' },
            { id: 'activities', name: 'Activities' },
            { id: 'articles', name: 'Articles' },
          ].map((item) => (
            <Button
              key={item.id}
              fullWidth
              variant={activeSection === item.id ? 'contained' : 'text'}
              onClick={() => setActiveSection(item.id)}
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: '1rem',
                padding: '10px 15px',
                color: activeSection === item.id ? 'white' : 'gray',
                backgroundColor: activeSection === item.id ? 'rgb(79, 70, 229)' : 'transparent', // indigo-600
                '&:hover': {
                  backgroundColor: activeSection === item.id ? 'rgb(67, 56, 202)' : 'rgba(255,255,255,0.1)', // indigo-700
                },
                borderRadius: '8px',
              }}
            >
              {item.name}
            </Button>
          ))}
        </nav>
      </Box>

      {/* Konten Utama */}
      <Box className="flex-grow p-8">
        <Typography variant="h4" component="h1" className="text-gray-800 font-bold mb-8 text-center">
          Admin Dashboard
        </Typography>

        {globalMessage.text && (
          <Box className={`p-4 mb-6 rounded-md text-center ${globalMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            <Typography variant="body1">{globalMessage.text}</Typography>
          </Box>
        )}

        {/* Conditional Rendering of Sections */}
        {activeSection === 'hero' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Konten Hero Section
            </Typography>
            {editingHeroContent ? (
              <Box className="space-y-4">
                <TextField
                  label="Nama (Hero)"
                  name="name"
                  value={heroContent.name}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Teks Peran (e.g., Graphic Designing)"
                  name="role_text"
                  value={heroContent.role_text}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Judul Utama (e.g., PORTFOLIO)"
                  name="main_title"
                  value={heroContent.main_title}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Teks Tahun (e.g., 2023)"
                  name="year_text"
                  value={heroContent.year_text}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  label="Email Kontak"
                  name="email"
                  type="email"
                  value={heroContent.email}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                  placeholder="email@example.com"
                />
                <Typography variant="h6" className="text-gray-700 mt-4">Link Sosial Media</Typography>
                <TextField
                  label="LinkedIn URL"
                  name="social_linkedin"
                  value={heroContent.social_linkedin}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://linkedin.com/in/username"
                />
                <TextField
                  label="GitHub URL"
                  name="social_github"
                  value={heroContent.social_github}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://github.com/username"
                />
                <TextField
                  label="Instagram URL"
                  name="social_instagram"
                  value={heroContent.social_instagram}
                  onChange={handleHeroContentChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://instagram.com/username"
                />
                <Box className="flex space-x-2 justify-end">
                  <Button variant="contained" color="primary" onClick={saveHeroContent}>Simpan Hero Content</Button>
                  <Button variant="outlined" onClick={() => setEditingHeroContent(false)}>Batal</Button>
                </Box>
              </Box>
            ) : (
              <Box className="text-gray-700">
                <Typography><strong>Nama:</strong> {heroContent.name}</Typography>
                <Typography><strong>Peran:</strong> {heroContent.role_text}</Typography>
                <Typography><strong>Judul Utama:</strong> {heroContent.main_title}</Typography>
                <Typography><strong>Tahun:</strong> {heroContent.year_text}</Typography>
                <Typography className="mt-4"><strong>Email:</strong> {heroContent.email || 'Tidak Ada'}</Typography>
                <Typography><strong>LinkedIn:</strong> {heroContent.social_linkedin || 'Tidak Ada'}</Typography>
                <Typography><strong>GitHub:</strong> {heroContent.social_github || 'Tidak Ada'}</Typography>
                <Typography><strong>Instagram:</strong> {heroContent.social_instagram || 'Tidak Ada'}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setEditingHeroContent(true)}>Edit Hero Content</Button>
              </Box>
            )}
          </Box>
        )}

        {activeSection === 'aboutMe' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Konten Tentang Saya
            </Typography>
            {editingAboutMeContent ? (
              <Box className="space-y-4">
                <TextField
                  label="Nama (Tentang Saya)"
                  name="name"
                  value={aboutMeContent.name}
                  onChange={handleAboutMeChange}
                  fullWidth
                  variant="outlined"
                  placeholder="Nama Anda"
                />
                <TextField
                  label="URL Gambar Profil"
                  name="gambar_url"
                  value={aboutMeContent.gambar_url}
                  onChange={handleAboutMeChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://via.placeholder.com/300x300"
                />
                <TextField
                  label="Deskripsi Tentang Saya"
                  name="deskripsi"
                  value={aboutMeContent.deskripsi}
                  onChange={handleAboutMeChange}
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                />
                <Box className="flex space-x-2 justify-end">
                  <Button variant="contained" color="primary" onClick={saveAboutMeContent}>Simpan Tentang Saya</Button>
                  <Button variant="outlined" onClick={() => setEditingAboutMeContent(false)}>Batal</Button>
                </Box>
              </Box>
            ) : (
              <Box className="text-gray-700">
                <Typography><strong>Nama:</strong> {aboutMeContent.name || 'Tidak Ada'}</Typography>
                <Typography><strong>URL Gambar:</strong> {aboutMeContent.gambar_url || 'Tidak Ada'}</Typography>
                {aboutMeContent.gambar_url && (
                  <img src={aboutMeContent.gambar_url} alt="Profil" className="w-24 h-24 object-cover rounded-md my-2" />
                )}
                <Typography className="mt-2"><strong>Deskripsi:</strong> {aboutMeContent.deskripsi || 'Tidak Ada'}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setEditingAboutMeContent(true)}>Edit Tentang Saya</Button>
              </Box>
            )}
          </Box>
        )}

        {activeSection === 'hobbies' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Hobi
            </Typography>
            {showAddHobbyForm && (
              <AddHobbyForm
                hobbyToEdit={editingHobby}
                onSave={handleSaveHobby}
                onCancel={() => {
                  setShowAddHobbyForm(false);
                  setEditingHobby(null);
                }}
              />
            )}
            {!showAddHobbyForm && (
              <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setShowAddHobbyForm(true)}>
                Tambah Hobi Baru
              </Button>
            )}

            {hobbies.length === 0 ? (
              <Typography variant="body1" className="text-gray-600 mt-4">Belum ada hobi.</Typography>
            ) : (
              <ul className="space-y-3 mt-4">
                {hobbies.map(hobby => (
                  <li key={hobby.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                    <Typography className={`text-gray-800 ${hobby.is_bold ? 'font-bold' : ''}`}>
                      {hobby.hobby_name} {hobby.is_bold ? '(Tebal)' : ''}
                    </Typography>
                    <Box className="flex space-x-2">
                      <Button variant="outlined" size="small" onClick={() => startEditHobby(hobby)}>Edit</Button>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteHobby(hobby.id)}>Hapus</Button>
                    </Box>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        )}

        {activeSection === 'skills' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Keterampilan
            </Typography>
            <Box className="space-y-4">
              <TextField
                label="Nama Keterampilan"
                value={newSkill.nama_skill}
                onChange={e => setNewSkill({ ...newSkill, nama_skill: e.target.value })}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="Level (0-100)"
                type="number"
                value={newSkill.level}
                onChange={e => setNewSkill({ ...newSkill, level: e.target.value })}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0, max: 100 }}
              />
              <Button variant="contained" onClick={editingSkillId ? updateSkill : addSkill}>
                {editingSkillId ? 'Perbarui Keterampilan' : 'Tambah Keterampilan'}
              </Button>
              {editingSkillId && (
                <Button variant="outlined" sx={{ ml: 1 }} onClick={() => {
                  setEditingSkillId(null);
                  setNewSkill({ nama_skill: '', level: '' });
                }}>
                  Batal Edit
                </Button>
              )}
            </Box>
            <ul className="space-y-3 mt-6">
              {skills.map(skill => (
                <li key={skill.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                  <Typography className="text-gray-800">{skill.nama_skill} ({skill.level}%)</Typography>
                  <Box className="flex space-x-2">
                    <Button variant="outlined" size="small" onClick={() => startEditSkill(skill)}>Edit</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => deleteSkill(skill.id)}>Hapus</Button>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {activeSection === 'projects' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Proyek
            </Typography>
            <AddProjectForm onAdd={handleAddProjectSuccess} />
            <ul className="space-y-3 mt-6">
              {projects.map(project => (
                <li key={project.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                  <Typography className="text-gray-800">{project.nama_project}</Typography>
                  <Box className="flex space-x-2">
                    <Button variant="outlined" size="small" onClick={() => startEditProject(project)}>Edit</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => deleteProject(project.id)}>Hapus</Button>
                  </Box>
                </li>
              ))}
            </ul>
            {editingProjectId && (
              <Box className="mt-6 p-4 border border-blue-300 rounded-lg bg-blue-50">
                <Typography variant="h6" className="mb-3">Edit Proyek</Typography>
                <TextField
                  label="Nama Proyek"
                  name="nama_project"
                  value={newProject.nama_project}
                  onChange={e => setNewProject({ ...newProject, nama_project: e.target.value })}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Deskripsi"
                  name="deskripsi"
                  value={newProject.deskripsi}
                  onChange={e => setNewProject({ ...newProject, deskripsi: e.target.value })}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Link Proyek"
                  name="link"
                  value={newProject.link}
                  onChange={e => setNewProject({ ...newProject, link: e.target.value })}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="URL Gambar"
                  name="gambar"
                  value={newProject.gambar}
                  onChange={e => setNewProject({ ...newProject, gambar: e.target.value })}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Box className="flex space-x-2 justify-end">
                  <Button variant="contained" color="primary" onClick={updateProject}>Perbarui Proyek</Button>
                  <Button variant="outlined" onClick={() => setEditingProjectId(null)}>Batal</Button>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {activeSection === 'experiences' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Pengalaman Kerja
            </Typography>
            <Box className="space-y-4">
              <TextField label="Posisi" value={newExperience.posisi} onChange={e => setNewExperience({ ...newExperience, posisi: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Tempat" value={newExperience.tempat} onChange={e => setNewExperience({ ...newExperience, tempat: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Tahun" value={newExperience.tahun} onChange={e => setNewExperience({ ...newExperience, tahun: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Deskripsi" value={newExperience.deskripsi} onChange={e => setNewExperience({ ...newExperience, deskripsi: e.target.value })} fullWidth multiline rows={3} variant="outlined" />
              <Button variant="contained" onClick={editingExperienceId ? updateExperience : addExperience}>
                {editingExperienceId ? 'Perbarui Pengalaman' : 'Tambah Pengalaman'}
              </Button>
              {editingExperienceId && (
                <Button variant="outlined" sx={{ ml: 1 }} onClick={() => { setEditingExperienceId(null); setNewExperience({ posisi: '', tempat: '', tahun: '', deskripsi: '' }); }}>
                  Batal Edit
                </Button>
              )}
            </Box>
            <ul className="space-y-3 mt-6">
              {experiences.map(exp => (
                <li key={exp.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                  <Typography className="text-gray-800">{exp.posisi} di {exp.tempat} ({exp.tahun})</Typography>
                  <Box className="flex space-x-2">
                    <Button variant="outlined" size="small" onClick={() => startEditExperience(exp)}>Edit</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => deleteExperience(exp.id)}>Hapus</Button>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {activeSection === 'education' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Pendidikan
            </Typography>
            <Box className="space-y-4">
              <TextField label="Asal" value={newEducation.jurusan} onChange={e => setNewEducation({ ...newEducation, jurusan: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Institusi" value={newEducation.institusi} onChange={e => setNewEducation({ ...newEducation, institusi: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Tahun" value={newEducation.tahun} onChange={e => setNewEducation({ ...newEducation, tahun: e.target.value })} fullWidth variant="outlined" />
              <Button variant="contained" onClick={editingEducationId ? updateEducation : addEducation}>
                {editingEducationId ? 'Perbarui Pendidikan' : 'Tambah Pendidikan'}
              </Button>
              {editingEducationId && (
                <Button variant="outlined" sx={{ ml: 1 }} onClick={() => { setEditingEducationId(null); setNewEducation({ jurusan: '', institusi: '', tahun: '' }); }}>
                  Batal Edit
                </Button>
              )}
            </Box>
            <ul className="space-y-3 mt-6">
              {education.map(edu => (
                <li key={edu.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                  <Typography className="text-gray-800">{edu.jurusan} dari {edu.institusi} ({edu.tahun})</Typography>
                  <Box className="flex space-x-2">
                    <Button variant="outlined" size="small" onClick={() => startEditEducation(edu)}>Edit</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => deleteEducation(edu.id)}>Hapus</Button>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {activeSection === 'activities' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Aktivitas
            </Typography>
            <Box className="space-y-4">
              <TextField label="Judul Aktivitas" value={newActivity.title} onChange={e => setNewActivity({ ...newActivity, title: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Waktu/Tanggal" value={newActivity.time} onChange={e => setNewActivity({ ...newActivity, time: e.target.value })} fullWidth variant="outlined" />
              <TextField label="URL Gambar" value={newActivity.image} onChange={e => setNewActivity({ ...newActivity, image: e.target.value })} fullWidth variant="outlined" />
              <TextField label="Deskripsi" value={newActivity.deskripsi} onChange={e => setNewActivity({ ...newActivity, deskripsi: e.target.value })} fullWidth multiline rows={3} variant="outlined" />
              <Button variant="contained" onClick={editingActivityId ? updateActivity : addActivity}>
                {editingActivityId ? 'Perbarui Aktivitas' : 'Tambah Aktivitas'}
              </Button>
              {editingActivityId && (
                <Button variant="outlined" sx={{ ml: 1 }} onClick={() => { setEditingActivityId(null); setNewActivity({ title: '', time: '', image: '', deskripsi: '' }); }}>
                  Batal Edit
                </Button>
              )}
            </Box>
            <ul className="space-y-3 mt-6">
              {activities.map(act => (
                <li key={act.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                  <Box className="flex flex-col">
                    <Typography className="font-medium text-gray-800">{act.title}</Typography>
                    <Typography className="text-gray-500 text-sm">{act.time}</Typography>
                    {act.image && <img src={act.image} alt={act.title} className="w-24 h-24 object-cover mt-1 rounded" />}
                    <Typography className="text-gray-500 text-sm">{act.deskripsi}</Typography>
                  </Box>
                  <Box className="flex space-x-2">
                    <Button variant="outlined" size="small" onClick={() => startEditActivity(act)}>Edit</Button>
                    <Button variant="contained" color="error" size="small" onClick={() => deleteActivity(act.id)}>Hapus</Button>
                  </Box>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {activeSection === 'articles' && (
          <Box className="bg-white p-6 rounded-lg shadow-md mb-8">
            <Typography variant="h5" component="h2" className="text-gray-800 font-semibold mb-4">
              Kelola Artikel
            </Typography>
            {showAddArticleForm && (
              <AddArticleForm
                articleToEdit={editingArticle}
                onSave={handleSaveArticle}
                onCancel={() => {
                  setShowAddArticleForm(false);
                  setEditingArticle(null);
                }}
              />
            )}
            {!showAddArticleForm && (
              <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => setShowAddArticleForm(true)}>
                Tambah Artikel Baru
              </Button>
            )}
            {articles.length === 0 ? (
              <Typography variant="body1" className="text-gray-600 mt-4">Belum ada artikel.</Typography>
            ) : (
              <ul className="space-y-3 mt-4">
                {articles.map(article => (
                  <li key={article.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-center bg-gray-50">
                    <Box className="flex flex-col">
                      <Typography className="font-medium text-gray-800">{article.title}</Typography>
                      <Typography className="text-gray-500 text-sm">Oleh {article.author}, {article.date}</Typography>
                      {article.article_url && (
                        <Typography className="text-gray-500 text-sm">
                          <a href={article.article_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                            Link Artikel
                          </a>
                        </Typography>
                      )}
                    </Box>
                    <Box className="flex space-x-2">
                      <Button variant="outlined" size="small" onClick={() => startEditArticle(article)}>Edit</Button>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteArticle(article.id)}>Hapus</Button>
                    </Box>
                  </li>
                ))}
              </ul>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
