import { useState } from 'react'
import './Forum.css'

function Forum() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'أحمد محمد',
      avatar: null,
      title: 'تنظيم حملة نظافة للقرية',
      content: 'السلام عليكم، أقترح تنظيم حملة نظافة شاملة للقرية يوم الجمعة القادم. من يرغب في المشاركة؟',
      time: '2026-04-17T10:00:00',
      likes: 15,
      comments: 8,
      category: 'مبادرات'
    },
    {
      id: 2,
      author: 'فاطمة علي',
      avatar: null,
      title: 'استفسار عن المدرسة الجديدة',
      content: 'هل هناك معلومات عن موعد افتتاح المدرسة الثانوية الجديدة؟',
      time: '2026-04-16T14:30:00',
      likes: 8,
      comments: 12,
      category: 'استفسارات'
    },
    {
      id: 3,
      author: 'خالد حسن',
      avatar: null,
      title: 'شكر وتقدير للمركز الصحي',
      content: 'أود أن أشكر طاقم المركز الصحي على الخدمة الممتازة والاهتمام بالمرضى',
      time: '2026-04-15T09:00:00',
      likes: 25,
      comments: 5,
      category: 'شكر وتقدير'
    }
  ])

  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'عام'
  })

  const [selectedCategory, setSelectedCategory] = useState('الكل')

  const categories = ['الكل', 'عام', 'مبادرات', 'استفسارات', 'شكر وتقدير', 'إعلانات']

  const handleSubmitPost = (e) => {
    e.preventDefault()
    const post = {
      id: posts.length + 1,
      author: 'أنت',
      avatar: null,
      title: newPost.title,
      content: newPost.content,
      time: new Date().toISOString(),
      likes: 0,
      comments: 0,
      category: newPost.category
    }
    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', category: 'عام' })
    setShowNewPost(false)
  }

  const formatTime = (time) => {
    const date = new Date(time)
    const now = new Date()
    const diff = now - date
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `منذ ${days} يوم`
    if (hours > 0) return `منذ ${hours} ساعة`
    return 'الآن'
  }

  const filteredPosts = selectedCategory === 'الكل'
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h2>منتدى قرية نقاش الكبرى</h2>
        <p>شارك أفكارك واستفساراتك مع أهالي القرية</p>
        <button className="new-post-btn" onClick={() => setShowNewPost(true)}>
          ✏️ منشور جديد
        </button>
      </div>

      <div className="forum-categories">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="forum-posts">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-author">
                <div className="author-avatar">
                  {post.avatar ? (
                    <img src={post.avatar} alt={post.author} />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
                <div className="author-info">
                  <h4>{post.author}</h4>
                  <span className="post-time">{formatTime(post.time)}</span>
                </div>
              </div>
              <span className="post-category">{post.category}</span>
            </div>

            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>

            <div className="post-actions">
              <button className="action-btn">
                ❤️ {post.likes}
              </button>
              <button className="action-btn">
                💬 {post.comments}
              </button>
              <button className="action-btn">
                🔗 مشاركة
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNewPost && (
        <div className="modal-overlay" onClick={() => setShowNewPost(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>منشور جديد</h2>
              <button className="close-btn" onClick={() => setShowNewPost(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmitPost} className="new-post-form">
              <div className="form-group">
                <label>العنوان</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="عنوان المنشور"
                  required
                />
              </div>

              <div className="form-group">
                <label>التصنيف</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                >
                  <option>عام</option>
                  <option>مبادرات</option>
                  <option>استفسارات</option>
                  <option>شكر وتقدير</option>
                  <option>إعلانات</option>
                </select>
              </div>

              <div className="form-group">
                <label>المحتوى</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="اكتب محتوى المنشور..."
                  rows="6"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">نشر</button>
                <button type="button" className="cancel-btn" onClick={() => setShowNewPost(false)}>
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

export default Forum
