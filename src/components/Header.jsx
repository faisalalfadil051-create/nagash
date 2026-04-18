import './Header.css'
import Notifications from './Notifications'

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="28" fill="#667eea" stroke="#764ba2" strokeWidth="2"/>
              <path d="M30 15 L40 25 L40 40 L35 40 L35 30 L25 30 L25 40 L20 40 L20 25 Z" fill="white"/>
              <circle cx="30" cy="12" r="3" fill="#ffd700"/>
            </svg>
          </div>
          <div className="title-section">
            <h1>قرية نقاش الكبرى</h1>
            <p className="subtitle">منصة التواصل والأنساب</p>
          </div>
        </div>
        <div className="header-actions">
          {user && (
            <>
              <Notifications />
              <div className="user-info">
                <span className="welcome-text">مرحباً، {user.name || user.email}</span>
                <button className="logout-btn" onClick={onLogout}>تسجيل خروج</button>
              </div>
            </>
          )}
        </div>
        <p className="tagline">تواصل مع عائلتك واكتشف نسبك وشارك في مناسبات القرية</p>
      </div>
    </header>
  )
}

export default Header
