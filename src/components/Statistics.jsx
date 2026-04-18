import './Statistics.css'

function Statistics() {
  const stats = {
    totalFamilies: 45,
    totalMembers: 320,
    upcomingEvents: 8,
    activeUsers: 156,
    marriages: 12,
    births: 23
  }

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h2>إحصائيات قرية نقاش الكبرى</h2>
        <p>نظرة شاملة على مجتمع القرية</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍👩‍👧‍👦</div>
          <div className="stat-number">{stats.totalFamilies}</div>
          <div className="stat-label">عائلة</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-number">{stats.totalMembers}</div>
          <div className="stat-label">فرد من القرية</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-number">{stats.upcomingEvents}</div>
          <div className="stat-label">مناسبة قادمة</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{stats.activeUsers}</div>
          <div className="stat-label">مستخدم نشط</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💍</div>
          <div className="stat-number">{stats.marriages}</div>
          <div className="stat-label">زواج هذا العام</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👶</div>
          <div className="stat-number">{stats.births}</div>
          <div className="stat-label">مولود جديد</div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>النشاطات الأخيرة</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">➕</span>
            <span>أحمد محمد أضاف 3 أفراد جدد لشجرة العائلة</span>
            <span className="activity-time">منذ ساعتين</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">📅</span>
            <span>تم إضافة مناسبة زواج جديدة</span>
            <span className="activity-time">منذ 5 ساعات</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">👥</span>
            <span>15 شخص أكدوا حضورهم لمناسبة عيد الفطر</span>
            <span className="activity-time">منذ يوم</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">🎉</span>
            <span>تم الاحتفال بزواج علي وفاطمة بنجاح</span>
            <span className="activity-time">منذ 3 أيام</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics
