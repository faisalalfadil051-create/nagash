import { useState } from 'react'
import './ProjectManagement.css'

function ProjectManagement() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'بناء فصول دراسية جديدة',
      description: 'إضافة 4 فصول دراسية للمدرسة الابتدائية',
      category: 'تعليم',
      status: 'جاري التنفيذ',
      progress: 65,
      budget: 300000,
      spent: 195000,
      startDate: '2026-01-15',
      endDate: '2026-06-30',
      manager: 'أحمد محمد',
      team: ['خالد علي', 'فاطمة حسن', 'محمد سعيد'],
      milestones: [
        { id: 1, title: 'التخطيط والتصميم', status: 'مكتمل', date: '2026-01-30', progress: 100 },
        { id: 2, title: 'الحصول على التراخيص', status: 'مكتمل', date: '2026-02-15', progress: 100 },
        { id: 3, title: 'أعمال الحفر والأساسات', status: 'مكتمل', date: '2026-03-10', progress: 100 },
        { id: 4, title: 'البناء والتشييد', status: 'جاري', date: '2026-05-15', progress: 70 },
        { id: 5, title: 'التشطيبات النهائية', status: 'قادم', date: '2026-06-20', progress: 0 }
      ],
      updates: [
        { id: 1, date: '2026-04-15', author: 'أحمد محمد', text: 'تم الانتهاء من بناء الجدران الخارجية', images: [] },
        { id: 2, date: '2026-04-10', author: 'خالد علي', text: 'بدء أعمال السقف', images: [] }
      ],
      documents: [
        { id: 1, name: 'المخططات الهندسية.pdf', type: 'pdf', uploadDate: '2026-01-20' },
        { id: 2, name: 'عقد المقاول.pdf', type: 'pdf', uploadDate: '2026-02-01' }
      ]
    },
    {
      id: 2,
      name: 'تطوير شبكة الإنارة',
      description: 'تحديث وتوسيع شبكة الإنارة في الشوارع الرئيسية',
      category: 'بنية تحتية',
      status: 'التخطيط',
      progress: 15,
      budget: 150000,
      spent: 22500,
      startDate: '2026-03-01',
      endDate: '2026-08-30',
      manager: 'سارة أحمد',
      team: ['علي حسن', 'نورة خالد'],
      milestones: [
        { id: 1, title: 'دراسة الجدوى', status: 'مكتمل', date: '2026-03-15', progress: 100 },
        { id: 2, title: 'اختيار المقاول', status: 'جاري', date: '2026-04-30', progress: 50 },
        { id: 3, title: 'التنفيذ', status: 'قادم', date: '2026-08-15', progress: 0 }
      ],
      updates: [
        { id: 1, date: '2026-04-12', author: 'سارة أحمد', text: 'تم استلام 3 عروض من مقاولين', images: [] }
      ],
      documents: [
        { id: 1, name: 'دراسة الجدوى.pdf', type: 'pdf', uploadDate: '2026-03-10' }
      ]
    }
  ])

  const [selectedProject, setSelectedProject] = useState(null)
  const [activeView, setActiveView] = useState('overview')
  const [showNewProject, setShowNewProject] = useState(false)
  const [showNewUpdate, setShowNewUpdate] = useState(false)
  const [newUpdate, setNewUpdate] = useState('')

  const getStatusColor = (status) => {
    const colors = {
      'التخطيط': '#ffa500',
      'جاري التنفيذ': '#667eea',
      'مكتمل': '#4caf50',
      'متوقف': '#f44336',
      'ملغي': '#999'
    }
    return colors[status] || '#667eea'
  }

  const getMilestoneIcon = (status) => {
    const icons = {
      'مكتمل': '✅',
      'جاري': '🔄',
      'قادم': '⏳'
    }
    return icons[status] || '⏳'
  }

  const handleAddUpdate = () => {
    if (newUpdate.trim() && selectedProject) {
      const update = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        author: 'أنت',
        text: newUpdate,
        images: []
      }

      setProjects(projects.map(p =>
        p.id === selectedProject.id
          ? { ...p, updates: [update, ...p.updates] }
          : p
      ))

      setNewUpdate('')
      setShowNewUpdate(false)
    }
  }

  const ProjectCard = ({ project }) => (
    <div className="project-card" onClick={() => setSelectedProject(project)}>
      <div className="project-header">
        <h3>{project.name}</h3>
        <span className="project-status" style={{ background: getStatusColor(project.status) }}>
          {project.status}
        </span>
      </div>

      <p className="project-description">{project.description}</p>

      <div className="project-progress">
        <div className="progress-label">
          <span>التقدم</span>
          <span>{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${project.progress}%` }}></div>
        </div>
      </div>

      <div className="project-budget">
        <div className="budget-item">
          <span>الميزانية:</span>
          <strong>{project.budget.toLocaleString()} ريال</strong>
        </div>
        <div className="budget-item">
          <span>المصروف:</span>
          <strong>{project.spent.toLocaleString()} ريال</strong>
        </div>
      </div>

      <div className="project-meta">
        <span>👤 {project.manager}</span>
        <span>📅 {project.endDate}</span>
      </div>
    </div>
  )

  return (
    <div className="project-management-container">
      {!selectedProject ? (
        <>
          <div className="pm-header">
            <h2>إدارة مشاريع القرية</h2>
            <p>نظام متكامل لإدارة وتتبع المشاريع التنموية</p>
            <button className="new-project-btn" onClick={() => setShowNewProject(true)}>
              ➕ مشروع جديد
            </button>
          </div>

          <div className="projects-stats">
            <div className="stat-box">
              <span className="stat-icon">📊</span>
              <div>
                <span className="stat-number">{projects.length}</span>
                <span className="stat-label">مشروع نشط</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">🔄</span>
              <div>
                <span className="stat-number">
                  {projects.filter(p => p.status === 'جاري التنفيذ').length}
                </span>
                <span className="stat-label">قيد التنفيذ</span>
              </div>
            </div>
            <div className="stat-box">
              <span className="stat-icon">💰</span>
              <div>
                <span className="stat-number">
                  {projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
                </span>
                <span className="stat-label">إجمالي الميزانيات</span>
              </div>
            </div>
          </div>

          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      ) : (
        <div className="project-details">
          <div className="project-details-header">
            <button className="back-btn" onClick={() => setSelectedProject(null)}>
              ← العودة
            </button>
            <h2>{selectedProject.name}</h2>
            <span className="project-status" style={{ background: getStatusColor(selectedProject.status) }}>
              {selectedProject.status}
            </span>
          </div>

          <div className="project-tabs">
            <button
              className={activeView === 'overview' ? 'active' : ''}
              onClick={() => setActiveView('overview')}
            >
              نظرة عامة
            </button>
            <button
              className={activeView === 'milestones' ? 'active' : ''}
              onClick={() => setActiveView('milestones')}
            >
              المراحل
            </button>
            <button
              className={activeView === 'budget' ? 'active' : ''}
              onClick={() => setActiveView('budget')}
            >
              الميزانية
            </button>
            <button
              className={activeView === 'updates' ? 'active' : ''}
              onClick={() => setActiveView('updates')}
            >
              التحديثات
            </button>
            <button
              className={activeView === 'documents' ? 'active' : ''}
              onClick={() => setActiveView('documents')}
            >
              المستندات
            </button>
          </div>

          <div className="project-content">
            {activeView === 'overview' && (
              <div className="overview-section">
                <div className="info-card">
                  <h3>معلومات المشروع</h3>
                  <p>{selectedProject.description}</p>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>المدير:</strong>
                      <span>{selectedProject.manager}</span>
                    </div>
                    <div className="info-item">
                      <strong>الفئة:</strong>
                      <span>{selectedProject.category}</span>
                    </div>
                    <div className="info-item">
                      <strong>تاريخ البدء:</strong>
                      <span>{selectedProject.startDate}</span>
                    </div>
                    <div className="info-item">
                      <strong>تاريخ الانتهاء:</strong>
                      <span>{selectedProject.endDate}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3>فريق العمل</h3>
                  <div className="team-list">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="team-member">
                        <span className="member-avatar">👤</span>
                        <span>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="info-card">
                  <h3>التقدم الإجمالي</h3>
                  <div className="large-progress">
                    <div className="progress-circle">
                      <span className="progress-number">{selectedProject.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${selectedProject.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'milestones' && (
              <div className="milestones-section">
                <h3>مراحل المشروع</h3>
                <div className="milestones-timeline">
                  {selectedProject.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="milestone-item">
                      <div className="milestone-icon">
                        {getMilestoneIcon(milestone.status)}
                      </div>
                      <div className="milestone-content">
                        <h4>{milestone.title}</h4>
                        <p>التاريخ المستهدف: {milestone.date}</p>
                        <div className="milestone-progress">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${milestone.progress}%` }}></div>
                          </div>
                          <span>{milestone.progress}%</span>
                        </div>
                      </div>
                      <span className="milestone-status">{milestone.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'budget' && (
              <div className="budget-section">
                <div className="budget-summary">
                  <div className="budget-card">
                    <h4>الميزانية الإجمالية</h4>
                    <p className="budget-amount">{selectedProject.budget.toLocaleString()} ريال</p>
                  </div>
                  <div className="budget-card">
                    <h4>المصروف</h4>
                    <p className="budget-amount spent">{selectedProject.spent.toLocaleString()} ريال</p>
                  </div>
                  <div className="budget-card">
                    <h4>المتبقي</h4>
                    <p className="budget-amount remaining">
                      {(selectedProject.budget - selectedProject.spent).toLocaleString()} ريال
                    </p>
                  </div>
                </div>

                <div className="budget-chart">
                  <h3>توزيع الميزانية</h3>
                  <div className="chart-bar">
                    <div
                      className="chart-fill spent"
                      style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                    >
                      <span>مصروف {((selectedProject.spent / selectedProject.budget) * 100).toFixed(1)}%</span>
                    </div>
                    <div
                      className="chart-fill remaining"
                      style={{ width: `${((selectedProject.budget - selectedProject.spent) / selectedProject.budget) * 100}%` }}
                    >
                      <span>متبقي {(((selectedProject.budget - selectedProject.spent) / selectedProject.budget) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'updates' && (
              <div className="updates-section">
                <div className="updates-header">
                  <h3>تحديثات المشروع</h3>
                  <button className="add-update-btn" onClick={() => setShowNewUpdate(true)}>
                    ➕ إضافة تحديث
                  </button>
                </div>

                <div className="updates-list">
                  {selectedProject.updates.map(update => (
                    <div key={update.id} className="update-item">
                      <div className="update-header">
                        <span className="update-author">👤 {update.author}</span>
                        <span className="update-date">📅 {update.date}</span>
                      </div>
                      <p className="update-text">{update.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'documents' && (
              <div className="documents-section">
                <div className="documents-header">
                  <h3>مستندات المشروع</h3>
                  <button className="upload-doc-btn">📎 رفع مستند</button>
                </div>

                <div className="documents-list">
                  {selectedProject.documents.map(doc => (
                    <div key={doc.id} className="document-item">
                      <span className="doc-icon">📄</span>
                      <div className="doc-info">
                        <h4>{doc.name}</h4>
                        <p>تاريخ الرفع: {doc.uploadDate}</p>
                      </div>
                      <button className="download-btn">تحميل</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showNewUpdate && (
        <div className="modal-overlay" onClick={() => setShowNewUpdate(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>إضافة تحديث جديد</h2>
              <button className="close-btn" onClick={() => setShowNewUpdate(false)}>✕</button>
            </div>

            <div className="update-form">
              <textarea
                value={newUpdate}
                onChange={(e) => setNewUpdate(e.target.value)}
                placeholder="اكتب التحديث..."
                rows="5"
              />
              <div className="form-actions">
                <button className="submit-btn" onClick={handleAddUpdate}>نشر التحديث</button>
                <button className="cancel-btn" onClick={() => setShowNewUpdate(false)}>إلغاء</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectManagement
