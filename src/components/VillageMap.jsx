import { useState } from 'react'
import './VillageMap.css'

function VillageMap() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const locations = [
    { id: 1, name: 'المسجد الكبير', type: 'mosque', x: 30, y: 40, icon: '🕌' },
    { id: 2, name: 'المدرسة الابتدائية', type: 'school', x: 60, y: 30, icon: '🏫' },
    { id: 3, name: 'المركز الصحي', type: 'hospital', x: 50, y: 60, icon: '🏥' },
    { id: 4, name: 'السوق الشعبي', type: 'market', x: 70, y: 50, icon: '🏪' },
    { id: 5, name: 'قاعة الأفراح', type: 'hall', x: 40, y: 70, icon: '🏛️' },
    { id: 6, name: 'الحديقة العامة', type: 'park', x: 20, y: 60, icon: '🌳' },
    { id: 7, name: 'مقر العمدة', type: 'government', x: 45, y: 45, icon: '🏢' },
    { id: 8, name: 'المكتبة العامة', type: 'library', x: 65, y: 70, icon: '📚' }
  ]

  return (
    <div className="village-map-container">
      <div className="map-header">
        <h2>خريطة قرية نقاش الكبرى</h2>
        <p>اكتشف المواقع المهمة في القرية</p>
      </div>

      <div className="map-legend">
        <h3>الأماكن المهمة</h3>
        <div className="legend-items">
          <div className="legend-item">
            <span>🕌</span>
            <span>مساجد</span>
          </div>
          <div className="legend-item">
            <span>🏫</span>
            <span>مدارس</span>
          </div>
          <div className="legend-item">
            <span>🏥</span>
            <span>مراكز صحية</span>
          </div>
          <div className="legend-item">
            <span>🏪</span>
            <span>أسواق</span>
          </div>
          <div className="legend-item">
            <span>🏛️</span>
            <span>قاعات</span>
          </div>
          <div className="legend-item">
            <span>🌳</span>
            <span>حدائق</span>
          </div>
        </div>
      </div>

      <div className="map-canvas">
        <div className="map-background">
          {locations.map(location => (
            <div
              key={location.id}
              className="map-marker"
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`
              }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="marker-icon">{location.icon}</div>
              <div className="marker-label">{location.name}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedLocation && (
        <div className="location-details" onClick={() => setSelectedLocation(null)}>
          <div className="location-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedLocation(null)}>✕</button>
            <div className="location-icon-large">{selectedLocation.icon}</div>
            <h3>{selectedLocation.name}</h3>
            <div className="location-info">
              <p><strong>النوع:</strong> {getLocationTypeName(selectedLocation.type)}</p>
              <p><strong>الموقع:</strong> وسط القرية</p>
              <p><strong>ساعات العمل:</strong> 8:00 ص - 8:00 م</p>
            </div>
            <button className="directions-btn">احصل على الاتجاهات</button>
          </div>
        </div>
      )}
    </div>
  )
}

function getLocationTypeName(type) {
  const types = {
    mosque: 'مسجد',
    school: 'مدرسة',
    hospital: 'مركز صحي',
    market: 'سوق',
    hall: 'قاعة أفراح',
    park: 'حديقة عامة',
    government: 'مبنى حكومي',
    library: 'مكتبة'
  }
  return types[type] || type
}

export default VillageMap
