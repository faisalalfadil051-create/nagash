import { useState } from 'react'
import './Auth.css'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api'

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register'
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="80" height="80" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" fill="#667eea" stroke="#764ba2" strokeWidth="2"/>
            <path d="M30 15 L40 25 L40 40 L35 40 L35 30 L25 30 L25 40 L20 40 L20 25 Z" fill="white"/>
            <circle cx="30" cy="12" r="3" fill="#ffd700"/>
          </svg>
        </div>

        <h2>{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
        <p className="auth-subtitle">قرية نقاش الكبرى</p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>الاسم الكامل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>رقم الهاتف</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="05xxxxxxxx"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'جاري التحميل...' : (isLogin ? 'دخول' : 'إنشاء حساب')}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <p>
              ليس لديك حساب؟{' '}
              <span onClick={() => setIsLogin(false)}>سجل الآن</span>
            </p>
          ) : (
            <p>
              لديك حساب بالفعل؟{' '}
              <span onClick={() => setIsLogin(true)}>سجل دخول</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
