import { useState } from 'react'
import './PhotoGallery.css'

function PhotoGallery() {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: null,
      title: 'زواج أحمد وفاطمة',
      uploadedBy: 'محمد علي',
      date: '2026-03-15',
      likes: 45,
      comments: [
        { user: 'خالد', text: 'مبروك للعروسين' },
        { user: 'سارة', text: 'الله يبارك فيهم' }
      ],
      category: 'مناسبات'
    },
    {
      id: 2,
      url: null,
      title: 'حملة النظافة',
      uploadedBy: 'أحمد حسن',
      date: '2026-04-10',
      likes: 32,
      comments: [
        { user: 'فاطمة', text: 'جهود رائعة' }
      ],
      category: 'فعاليات'
    },
    {
      id: 3,
      url: null,
      title: 'احتفال عيد الفطر',
      uploadedBy: 'علي محمد',
      date: '2026-04-01',
      likes: 78,
      comments: [],
      category: 'مناسبات'
    }
  ])

  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [showUpload, setShowUpload] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('الكل')
  const [newComment, setNewComment] = useState('')

  const categories = ['الكل', 'مناسبات', 'فعاليات', 'تاريخية', 'عائلية']

  const handleLike = (photoId) => {
    setPhotos(photos.map(photo =>
      photo.id === photoId ? { ...photo, likes: photo.likes + 1 } : photo
    ))
  }

  const handleComment = (photoId) => {
    if (newComment.trim()) {
      setPhotos(photos.map(photo =>
        photo.id === photoId
          ? { ...photo, comments: [...photo.comments, { user: 'أنت', text: newComment }] }
          : photo
      ))
      setNewComment('')
    }
  }

  const filteredPhotos = selectedCategory === 'الكل'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory)

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2>ألبوم صور قرية نقاش الكبرى</h2>
        <p>شارك ذكرياتك مع أهالي القرية</p>
        <button className="upload-btn" onClick={() => setShowUpload(true)}>
          📷 رفع صورة جديدة
        </button>
      </div>

      <div className="gallery-categories">
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

      <div className="gallery-grid">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="photo-card" onClick={() => setSelectedPhoto(photo)}>
            <div className="photo-placeholder">
              {photo.url ? (
                <img src={photo.url} alt={photo.title} />
              ) : (
                <div className="placeholder-icon">📷</div>
              )}
            </div>
            <div className="photo-info">
              <h4>{photo.title}</h4>
              <p className="photo-meta">
                <span>👤 {photo.uploadedBy}</span>
                <span>📅 {photo.date}</span>
              </p>
              <div className="photo-stats">
                <span>❤️ {photo.likes}</span>
                <span>💬 {photo.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPhoto(null)}>✕</button>

            <div className="modal-photo">
              {selectedPhoto.url ? (
                <img src={selectedPhoto.url} alt={selectedPhoto.title} />
              ) : (
                <div className="placeholder-large">📷</div>
              )}
            </div>

            <div className="modal-details">
              <h3>{selectedPhoto.title}</h3>
              <p className="photo-meta">
                <span>👤 {selectedPhoto.uploadedBy}</span>
                <span>📅 {selectedPhoto.date}</span>
                <span className="category-badge">{selectedPhoto.category}</span>
              </p>

              <div className="photo-actions">
                <button onClick={() => handleLike(selectedPhoto.id)}>
                  ❤️ {selectedPhoto.likes}
                </button>
                <button>🔗 مشاركة</button>
              </div>

              <div className="comments-section">
                <h4>التعليقات ({selectedPhoto.comments.length})</h4>
                <div className="comments-list">
                  {selectedPhoto.comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <strong>{comment.user}:</strong> {comment.text}
                    </div>
                  ))}
                </div>

                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="أضف تعليق..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment(selectedPhoto.id)}
                  />
                  <button onClick={() => handleComment(selectedPhoto.id)}>إرسال</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpload && (
        <div className="modal-overlay" onClick={() => setShowUpload(false)}>
          <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>رفع صورة جديدة</h2>
              <button className="close-btn" onClick={() => setShowUpload(false)}>✕</button>
            </div>

            <form className="upload-form">
              <div className="form-group">
                <label>اختر الصورة</label>
                <input type="file" accept="image/*" />
              </div>

              <div className="form-group">
                <label>عنوان الصورة</label>
                <input type="text" placeholder="أدخل عنوان الصورة" />
              </div>

              <div className="form-group">
                <label>التصنيف</label>
                <select>
                  <option>مناسبات</option>
                  <option>فعاليات</option>
                  <option>تاريخية</option>
                  <option>عائلية</option>
                </select>
              </div>

              <div className="form-group">
                <label>وصف (اختياري)</label>
                <textarea placeholder="أضف وصف للصورة..." rows="3"></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">رفع الصورة</button>
                <button type="button" className="cancel-btn" onClick={() => setShowUpload(false)}>
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

export default PhotoGallery
