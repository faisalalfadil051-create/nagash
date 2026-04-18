import { useState } from 'react'
import './ImageUpload.css'

function ImageUpload({ onImageSelect, currentImage }) {
  const [preview, setPreview] = useState(currentImage || null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageSelect(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="image-upload-container">
      <div className="image-preview">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <div className="placeholder">
            <span>📷</span>
            <p>لا توجد صورة</p>
          </div>
        )}
      </div>
      <label className="upload-btn">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        {preview ? 'تغيير الصورة' : 'رفع صورة'}
      </label>
    </div>
  )
}

export default ImageUpload
