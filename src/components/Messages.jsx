import { useState } from 'react'
import './Messages.css'

function Messages() {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: 'أحمد محمد',
      avatar: null,
      lastMessage: 'شكراً على المساعدة',
      time: '2026-04-18T04:30:00',
      unread: 2
    },
    {
      id: 2,
      user: 'فاطمة علي',
      avatar: null,
      lastMessage: 'متى موعد الاجتماع؟',
      time: '2026-04-17T15:20:00',
      unread: 0
    },
    {
      id: 3,
      user: 'خالد حسن',
      avatar: null,
      lastMessage: 'تمام، سأكون هناك',
      time: '2026-04-17T10:00:00',
      unread: 1
    }
  ])

  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState({
    1: [
      { sender: 'أحمد محمد', text: 'السلام عليكم', time: '2026-04-18T04:00:00', isMe: false },
      { sender: 'أنت', text: 'وعليكم السلام', time: '2026-04-18T04:05:00', isMe: true },
      { sender: 'أحمد محمد', text: 'شكراً على المساعدة', time: '2026-04-18T04:30:00', isMe: false }
    ],
    2: [
      { sender: 'فاطمة علي', text: 'متى موعد الاجتماع؟', time: '2026-04-17T15:20:00', isMe: false },
      { sender: 'أنت', text: 'الساعة 5 مساءً', time: '2026-04-17T15:25:00', isMe: true }
    ],
    3: [
      { sender: 'أنت', text: 'هل ستحضر الحفل؟', time: '2026-04-17T09:50:00', isMe: true },
      { sender: 'خالد حسن', text: 'تمام، سأكون هناك', time: '2026-04-17T10:00:00', isMe: false }
    ]
  })

  const [newMessage, setNewMessage] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const allUsers = [
    'أحمد محمد', 'فاطمة علي', 'خالد حسن', 'سارة أحمد', 'محمد علي', 'نورة خالد'
  ]

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const newMsg = {
        sender: 'أنت',
        text: newMessage,
        time: new Date().toISOString(),
        isMe: true
      }

      setMessages({
        ...messages,
        [selectedConversation]: [...(messages[selectedConversation] || []), newMsg]
      })

      setConversations(conversations.map(conv =>
        conv.id === selectedConversation
          ? { ...conv, lastMessage: newMessage, time: new Date().toISOString() }
          : conv
      ))

      setNewMessage('')
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

  const formatMessageTime = (time) => {
    const date = new Date(time)
    return date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
  }

  const filteredConversations = conversations.filter(conv =>
    conv.user.includes(searchTerm)
  )

  const selectedUser = conversations.find(c => c.id === selectedConversation)

  return (
    <div className="messages-container">
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h2>الرسائل</h2>
          <button className="new-chat-btn" onClick={() => setShowNewChat(true)}>
            ✏️
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 ابحث عن محادثة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="conversations-list">
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`conversation-item ${selectedConversation === conv.id ? 'active' : ''}`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="conv-avatar">
                {conv.avatar ? (
                  <img src={conv.avatar} alt={conv.user} />
                ) : (
                  <span>👤</span>
                )}
              </div>
              <div className="conv-info">
                <h4>{conv.user}</h4>
                <p>{conv.lastMessage}</p>
              </div>
              <div className="conv-meta">
                <span className="conv-time">{formatTime(conv.time)}</span>
                {conv.unread > 0 && (
                  <span className="unread-badge">{conv.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="messages-main">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <div className="chat-user">
                <div className="user-avatar">
                  {selectedUser?.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.user} />
                  ) : (
                    <span>👤</span>
                  )}
                </div>
                <h3>{selectedUser?.user}</h3>
              </div>
            </div>

            <div className="chat-messages">
              {(messages[selectedConversation] || []).map((msg, index) => (
                <div key={index} className={`message ${msg.isMe ? 'message-me' : 'message-other'}`}>
                  <div className="message-bubble">
                    <p>{msg.text}</p>
                    <span className="message-time">{formatMessageTime(msg.time)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="اكتب رسالة..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>إرسال</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="empty-state">
              <span className="empty-icon">💬</span>
              <h3>اختر محادثة للبدء</h3>
              <p>اختر محادثة من القائمة أو ابدأ محادثة جديدة</p>
            </div>
          </div>
        )}
      </div>

      {showNewChat && (
        <div className="modal-overlay" onClick={() => setShowNewChat(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>محادثة جديدة</h2>
              <button className="close-btn" onClick={() => setShowNewChat(false)}>✕</button>
            </div>

            <div className="users-list">
              {allUsers.map((user, index) => (
                <div key={index} className="user-item" onClick={() => {
                  setShowNewChat(false)
                  // يمكن إضافة منطق لإنشاء محادثة جديدة
                }}>
                  <div className="user-avatar">👤</div>
                  <span>{user}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
