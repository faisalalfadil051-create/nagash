import { useState } from 'react'
import './Achievements.css'

function Achievements() {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: 'أحمد محمد علي',
      achievement: 'تخرج من كلية الطب',
      category: 'تعليم',
      date: '2026-03-20',
      description: 'تخرج بتقدير امتياز من كلية الطب جامعة الملك سعود',
      image: null,
      likes: 156
    },
    {
      id: 2,
      name: 'فاطمة خالد',
      achievement: 'جائزة التفوق العلمي',
      category: 'جوائز',
      date: '2026-02-15',
      description: 'حصلت على جائزة التفوق العلمي على مستوى المنطقة',
      image: null,
      likes: 98
    },
    {
      id: 3,
      name: 'محمد حسن',
      achievement: 'افتتاح مشروع تجاري',
      category: 'أعمال',
      date: '2026-01-10',
      description: 'افتتاح محل تجاري جديد في وسط القرية',
      image: null,
      likes: 67
    },
    {
      id: 4,
      name: 'سارة أحمد',
      achievement: 'بطولة الرياضة',
      category: 'رياضة',
      date: '2025-12-05',
      description: 'فازت بالمركز الأول في بطولة الجري',
      image: null,
      likes: 89
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [showAddAchievement, setShowAddAchievement] = useState(false)
  const [newAchievement, setNewAchievement] = useState({
    name: '',
    achievement: '',
    category: 'تعليم',
    description: '',
    date: ''
  })

  const categories = ['الكل', 'تعليم', 'جوائز', 'أعمال', 'رياضة', 'فنون', 'خدمة مجتمعية']

  const handleLike = (id) => {
    setAchievements(achievements.map(ach =>
      ach.id === id ? { ...ach, likes: ach.likes + 1 } : ach
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const achievement = {
      id: achievements.length + 1,
      ...newAchievement,
      image: null,
      likes: 0
    }
    setAchievements([achievement, ...achievements])
    setNewAchievement({
      name: '',
      achievement: '',
      category: 'تعليم',
      description: '',
      date: ''
    })
    setShowAddAchievement(false)
  }

  const filteredAchievements = selectedCategory === 'الكل'
    ? achievements
    : achievements.filter(ach => ach.category === selectedCategory)

  const getCategoryIcon = (category) => {
    const icons = {
      'تعليم': '🎓',
      'جوائز': '🏆',
      'أعمال': '💼',
      'رياضة': '⚽',
      'فنون': '🎨',
      'خدمة مجتمعية': '🤝'
    }
    return icons[category] || '⭐'
  }

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h2>سجل إنجازات أبناء القرية</h2>
        <p>نفتخر بإنجازات أبنائنا ونحتفي بنجاحاتهم</p>
        <button className="add-achievement-btn" onClick={() => setShowAddAchievement(true)}>
          ⭐ إضافة إنجاز
        </button>
      </div>

      <div className="achievements-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category !== 'الكل' && getCategoryIcon(category)} {category}
          </button>
        ))}
      </div>

      <div className="achievements-stats">
        <div className="stat-box">
          <span className="stat-number">{achievements.length}</span>
          <span className="stat-label">إنجاز مسجل</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{achievements.filter(a => a.category === 'تعليم').length}</span>
          <span className="stat-label">تخرج</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{achievements.filter(a => a.category === 'جوائز').length}</span>
          <span className="stat-label">جائزة</span>
        </div>
      </div>

      <div className="achievements-grid">
        {filteredAchievements.map(achievement => (
          <div key={achievement.id} className="achievement-card">
            <div className="achievement-icon">
              {getCategoryIcon(achievement.category)}
            </div>
            <div className="achievement-content">
              <span className="achievement-category">{achievement.category}</span>
              <h3>{achievement.name}</h3>
              <h4>{achievement.achievement}</h4>
              <p>{achievement.description}</p>
              <div className="achievement-footer">
                <span className="achievement-date">📅 {achievement.date}</span>
                <button className="like-btn" onClick={() => handleLike(achievement.id)}>
                  ❤️ {achievement.likes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddAchievement && (
        <div className="modal-overlay" onClick={() => setShowAddAchievement(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>إضافة إنجاز جديد</h2>
              <button className="close-btn" onClick={() => setShowAddAchievement(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="achievement-form">
              <div className="form-group">
                <label>اسم الشخص *</label>
                <input
                  type="text"
                  value={newAchievement.name}
                  onChange={(e) => setNewAchievement({ ...newAchievement, name: e.target.value })}
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>

              <div className="form-group">
                <label>الإنجاز *</label>
                <input
                  type="text"
                  value={newAchievement.achievement}
                  onChange={(e) => setNewAchievement({ ...newAchievement, achievement: e.target.value })}
                  placeholder="مثال: تخرج من الجامعة"
                  required
                />
              </div>

              <div className="form-group">
                <label>التصنيف *</label>
                <select
                  value={newAchievement.category}
                  onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                >
                  <option>تعليم</option>
                  <option>جوائز</option>
                  <option>أعمال</option>
                  <option>رياضة</option>
                  <option>فنون</option>
                  <option>خدمة مجتمعية</option>
                </select>
              </div>

              <div className="form-group">
                <label>التاريخ *</label>
                <input
                  type="date"
                  value={newAchievement.date}
                  onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>الوصف *</label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  placeholder="اكتب تفاصيل الإنجاز..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">إضافة الإنجاز</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddAchievement(false)}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Achievements
