import { useState, useEffect } from 'react'
import './Notifications.css'

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'event',
      title: 'مناسبة قادمة',
      message: 'زواج أحمد وفاطمة بعد 27 يوم',
      time: '2026-04-18T03:00:00',
      read: false
    },
    {
      id: 2,
      type: 'member',
      title: 'عضو جديد',
      message: 'محمد علي انضم إلى شجرة العائلة',
      time: '2026-04-17T10:30:00',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'تذكير',
      message: 'لا تنسى تأكيد حضورك لمناسبة عيد الفطر',
      time: '2026-04-16T15:00:00',
      read: true
    }
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'event': return '📅'
      case 'member': return '👤'
      case 'reminder': return '⏰'
      default: return '🔔'
    }
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

  return (
    <div className="notifications-wrapper">
      <button
        className="notification-bell"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </button>

      {showNotifications && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>الإشعارات</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-btn">
                تعليم الكل كمقروء
              </button>
            )}
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>لا توجد إشعارات</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {formatTime(notification.time)}
                    </span>
                  </div>
                  <button
                    className="delete-notification"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
