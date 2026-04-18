import { useState, useEffect } from 'react'
import './App.css'
import FamilyTree from './components/FamilyTree'
import EventsCalendar from './components/EventsCalendar'
import Statistics from './components/Statistics'
import VillageMap from './components/VillageMap'
import Forum from './components/Forum'
import PhotoGallery from './components/PhotoGallery'
import Messages from './components/Messages'
import Achievements from './components/Achievements'
import Donations from './components/Donations'
import ProjectManagement from './components/ProjectManagement'
import Header from './components/Header'
import Auth from './components/Auth'

function App() {
  const [activeTab, setActiveTab] = useState('family')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Auth onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />

      <nav className="nav-tabs">
        <button
          className={activeTab === 'family' ? 'active' : ''}
          onClick={() => setActiveTab('family')}
        >
          🌳 العائلة
        </button>
        <button
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
        >
          🏗️ المشاريع
        </button>
        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          📅 المناسبات
        </button>
        <button
          className={activeTab === 'donations' ? 'active' : ''}
          onClick={() => setActiveTab('donations')}
        >
          💰 التبرعات
        </button>
        <button
          className={activeTab === 'gallery' ? 'active' : ''}
          onClick={() => setActiveTab('gallery')}
        >
          📷 الصور
        </button>
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          ✉️ الرسائل
        </button>
        <button
          className={activeTab === 'achievements' ? 'active' : ''}
          onClick={() => setActiveTab('achievements')}
        >
          ⭐ الإنجازات
        </button>
        <button
          className={activeTab === 'map' ? 'active' : ''}
          onClick={() => setActiveTab('map')}
        >
          🗺️ الخريطة
        </button>
        <button
          className={activeTab === 'forum' ? 'active' : ''}
          onClick={() => setActiveTab('forum')}
        >
          💬 المنتدى
        </button>
        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          📊 إحصائيات
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'family' && <FamilyTree />}
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'events' && <EventsCalendar />}
        {activeTab === 'gallery' && <PhotoGallery />}
        {activeTab === 'messages' && <Messages />}
        {activeTab === 'achievements' && <Achievements />}
        {activeTab === 'donations' && <Donations />}
        {activeTab === 'map' && <VillageMap />}
        {activeTab === 'forum' && <Forum />}
        {activeTab === 'stats' && <Statistics />}
      </main>
    </div>
  )
}

export default App
