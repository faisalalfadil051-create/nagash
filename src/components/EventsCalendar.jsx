import { useState } from 'react'
import './EventsCalendar.css'

function EventsCalendar() {
  const [events] = useState([
    {
      id: 1,
      title: 'زواج أحمد وفاطمة',
      date: '2026-05-15',
      type: 'wedding',
      location: 'قاعة الأفراح الكبرى',
      attendees: 45
    },
    {
      id: 2,
      title: 'عزاء الحاج محمد',
      date: '2026-04-20',
      type: 'funeral',
      location: 'المسجد الكبير',
      attendees: 120
    },
    {
      id: 3,
      title: 'عيد الفطر المبارك',
      date: '2026-04-30',
      type: 'holiday',
      location: 'ساحة المدينة',
      attendees: 200
    }
  ])

  const getEventIcon = (type) => {
    switch(type) {
      case 'wedding': return '💍'
      case 'funeral': return '🕊️'
      case 'holiday': return '🎉'
      default: return '📅'
    }
  }

  const getEventColor = (type) => {
    switch(type) {
      case 'wedding': return '#ff6b9d'
      case 'funeral': return '#666'
      case 'holiday': return '#ffa500'
      default: return '#667eea'
    }
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>المناسبات والأحداث</h2>
        <button className="add-event-btn">+ إضافة مناسبة</button>
      </div>

      <div className="events-grid">
        {events.map(event => (
          <div
            key={event.id}
            className="event-card"
            style={{ borderRight: `5px solid ${getEventColor(event.type)}` }}
          >
            <div className="event-icon">{getEventIcon(event.type)}</div>
            <div className="event-details">
              <h3>{event.title}</h3>
              <p className="event-date">📅 {event.date}</p>
              <p className="event-location">📍 {event.location}</p>
              <p className="event-attendees">👥 {event.attendees} مشارك</p>
            </div>
            <button className="attend-btn">تأكيد الحضور</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsCalendar
