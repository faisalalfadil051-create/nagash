import { useState } from 'react'
import './AddMember.css'
import ImageUpload from './ImageUpload'

function AddMember({ onAddMember, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    image: null,
    relation: 'أب'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageSelect = (image) => {
    setFormData({
      ...formData,
      image
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddMember(formData)
    setFormData({
      name: '',
      age: '',
      phone: '',
      email: '',
      image: null,
      relation: 'أب'
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>إضافة فرد جديد للعائلة</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="add-member-form">
          <div className="form-section">
            <h3>الصورة الشخصية</h3>
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>

          <div className="form-section">
            <h3>المعلومات الأساسية</h3>

            <div className="form-group">
              <label>الاسم الكامل *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل الاسم الكامل"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>العمر</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="العمر"
                />
              </div>

              <div className="form-group">
                <label>العلاقة</label>
                <select name="relation" value={formData.relation} onChange={handleChange}>
                  <option>أب</option>
                  <option>أم</option>
                  <option>ابن</option>
                  <option>ابنة</option>
                  <option>أخ</option>
                  <option>أخت</option>
                  <option>عم</option>
                  <option>عمة</option>
                  <option>خال</option>
                  <option>خالة</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>معلومات التواصل</h3>

            <div className="form-group">
              <label>رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="05xxxxxxxx"
              />
            </div>

            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">إضافة الفرد</button>
            <button type="button" className="cancel-btn" onClick={onClose}>إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMember
