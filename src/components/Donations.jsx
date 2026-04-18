import { useState } from 'react'
import './Donations.css'

function Donations() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: 'بناء مسجد القرية الجديد',
      description: 'مشروع لبناء مسجد جديد يتسع لـ 500 مصلي',
      category: 'مساجد',
      targetAmount: 500000,
      currentAmount: 325000,
      donors: 145,
      daysLeft: 45,
      image: null
    },
    {
      id: 2,
      title: 'مساعدة الأسر المحتاجة',
      description: 'توفير المساعدات الغذائية والمالية للأسر المحتاجة',
      category: 'خيري',
      targetAmount: 100000,
      currentAmount: 78000,
      donors: 89,
      daysLeft: 20,
      image: null
    },
    {
      id: 3,
      title: 'تطوير المدرسة',
      description: 'تجهيز المدرسة بأحدث الوسائل التعليمية',
      category: 'تعليم',
      targetAmount: 200000,
      currentAmount: 145000,
      donors: 67,
      daysLeft: 30,
      image: null
    }
  ])

  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [donationAmount, setDonationAmount] = useState('')
  const [showDonateModal, setShowDonateModal] = useState(false)
  const [showNewCampaign, setShowNewCampaign] = useState(false)

  const quickAmounts = [50, 100, 200, 500, 1000]

  const handleDonate = (e) => {
    e.preventDefault()
    if (selectedCampaign && donationAmount) {
      setCampaigns(campaigns.map(camp =>
        camp.id === selectedCampaign.id
          ? {
              ...camp,
              currentAmount: camp.currentAmount + parseInt(donationAmount),
              donors: camp.donors + 1
            }
          : camp
      ))
      setDonationAmount('')
      setShowDonateModal(false)
      alert('شكراً لك! تم استلام تبرعك بنجاح')
    }
  }

  const getProgress = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  const formatAmount = (amount) => {
    return amount.toLocaleString('ar-SA') + ' ريال'
  }

  return (
    <div className="donations-container">
      <div className="donations-header">
        <h2>منصة التبرعات الخيرية</h2>
        <p>ساهم في دعم المشاريع الخيرية في القرية</p>
        <button className="new-campaign-btn" onClick={() => setShowNewCampaign(true)}>
          ➕ إضافة حملة جديدة
        </button>
      </div>

      <div className="donations-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <span className="stat-number">
              {formatAmount(campaigns.reduce((sum, c) => sum + c.currentAmount, 0))}
            </span>
            <span className="stat-label">إجمالي التبرعات</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <span className="stat-number">{campaigns.length}</span>
            <span className="stat-label">حملة نشطة</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <span className="stat-number">
              {campaigns.reduce((sum, c) => sum + c.donors, 0)}
            </span>
            <span className="stat-label">متبرع</span>
          </div>
        </div>
      </div>

      <div className="campaigns-grid">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <div className="campaign-image">
              {campaign.image ? (
                <img src={campaign.image} alt={campaign.title} />
              ) : (
                <div className="placeholder-image">🎯</div>
              )}
              <span className="campaign-category">{campaign.category}</span>
            </div>

            <div className="campaign-content">
              <h3>{campaign.title}</h3>
              <p>{campaign.description}</p>

              <div className="campaign-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${getProgress(campaign.currentAmount, campaign.targetAmount)}%` }}
                  ></div>
                </div>
                <div className="progress-info">
                  <span className="current-amount">{formatAmount(campaign.currentAmount)}</span>
                  <span className="target-amount">من {formatAmount(campaign.targetAmount)}</span>
                </div>
              </div>

              <div className="campaign-stats">
                <div className="stat-item">
                  <span className="stat-icon">👥</span>
                  <span>{campaign.donors} متبرع</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">⏰</span>
                  <span>{campaign.daysLeft} يوم متبقي</span>
                </div>
              </div>

              <button
                className="donate-btn"
                onClick={() => {
                  setSelectedCampaign(campaign)
                  setShowDonateModal(true)
                }}
              >
                تبرع الآن
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDonateModal && selectedCampaign && (
        <div className="modal-overlay" onClick={() => setShowDonateModal(false)}>
          <div className="modal-content donate-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>التبرع لـ {selectedCampaign.title}</h2>
              <button className="close-btn" onClick={() => setShowDonateModal(false)}>✕</button>
            </div>

            <form onSubmit={handleDonate} className="donate-form">
              <div className="quick-amounts">
                <p>اختر مبلغ سريع:</p>
                <div className="amounts-grid">
                  {quickAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      className={`amount-btn ${donationAmount === amount.toString() ? 'active' : ''}`}
                      onClick={() => setDonationAmount(amount.toString())}
                    >
                      {amount} ريال
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>أو أدخل مبلغ مخصص:</label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="أدخل المبلغ بالريال"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>الاسم (اختياري):</label>
                <input
                  type="text"
                  placeholder="اسمك أو اختر التبرع بشكل مجهول"
                />
              </div>

              <div className="form-group">
                <label>
                  <input type="checkbox" />
                  <span>أرغب في التبرع بشكل مجهول</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  تأكيد التبرع
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowDonateModal(false)}>
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewCampaign && (
        <div className="modal-overlay" onClick={() => setShowNewCampaign(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>إضافة حملة تبرعات جديدة</h2>
              <button className="close-btn" onClick={() => setShowNewCampaign(false)}>✕</button>
            </div>

            <form className="campaign-form">
              <div className="form-group">
                <label>عنوان الحملة *</label>
                <input type="text" placeholder="أدخل عنوان الحملة" required />
              </div>

              <div className="form-group">
                <label>التصنيف *</label>
                <select>
                  <option>مساجد</option>
                  <option>خيري</option>
                  <option>تعليم</option>
                  <option>صحي</option>
                  <option>بنية تحتية</option>
                </select>
              </div>

              <div className="form-group">
                <label>المبلغ المستهدف (ريال) *</label>
                <input type="number" placeholder="100000" required />
              </div>

              <div className="form-group">
                <label>مدة الحملة (أيام) *</label>
                <input type="number" placeholder="30" required />
              </div>

              <div className="form-group">
                <label>الوصف *</label>
                <textarea placeholder="اكتب وصف تفصيلي للحملة..." rows="4" required></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">إنشاء الحملة</button>
                <button type="button" className="cancel-btn" onClick={() => setShowNewCampaign(false)}>
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

export default Donations
