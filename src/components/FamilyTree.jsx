import { useState, useEffect } from 'react'
import './FamilyTree.css'
import AddMember from './AddMember'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api'

function FamilyTree() {
  const [familyData, setFamilyData] = useState([])
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showAddMember, setShowAddMember] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFamilyMembers()
  }, [])

  const fetchFamilyMembers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/family`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setFamilyData(data)
    } catch (error) {
      console.error('Error fetching family:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchInTree = (members, term) => {
    return members.filter(member => member.name.includes(term))
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
    if (term.trim()) {
      const results = searchInTree(familyData, term)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleAddMember = async (memberData) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/family`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
      })

      if (response.ok) {
        await fetchFamilyMembers()
        setShowAddMember(false)
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const renderPerson = (person) => (
    <div key={person.id} className="person-node">
      <div
        className="person-card"
        onClick={() => setSelectedPerson(person)}
      >
        {person.image ? (
          <img src={person.image} alt={person.name} className="person-image" />
        ) : (
          <div className="person-avatar">👤</div>
        )}
        <div className="person-name">{person.name}</div>
      </div>
    </div>
  )

  if (loading) {
    return <div className="loading">جاري التحميل...</div>
  }

  return (
    <div className="family-tree-container">
      <div className="tree-header">
        <h2>شجرة العائلة</h2>
        <div className="header-actions">
          <input
            type="text"
            placeholder="🔍 ابحث عن شخص..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="add-member-btn" onClick={() => setShowAddMember(true)}>+ إضافة فرد جديد</button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>نتائج البحث ({searchResults.length})</h3>
          <div className="results-list">
            {searchResults.map((person, index) => (
              <div
                key={index}
                className="result-item"
                onClick={() => {
                  setSelectedPerson(person)
                  setSearchTerm('')
                  setSearchResults([])
                }}
              >
                <span>👤 {person.name}</span>
                <span className="generation-badge">الجيل {person.generation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tree-view">
        {familyData.map(person => renderPerson(person))}
      </div>

      {selectedPerson && (
        <div className="person-details">
          <h3>معلومات الشخص</h3>
          {selectedPerson.image && (
            <img src={selectedPerson.image} alt={selectedPerson.name} className="detail-image" />
          )}
          <p><strong>الاسم:</strong> {selectedPerson.name}</p>
          <p><strong>الجيل:</strong> {selectedPerson.generation}</p>
          {selectedPerson.age && <p><strong>العمر:</strong> {selectedPerson.age}</p>}
          {selectedPerson.phone && <p><strong>الهاتف:</strong> {selectedPerson.phone}</p>}
          {selectedPerson.email && <p><strong>البريد:</strong> {selectedPerson.email}</p>}
          <p><strong>عدد الأبناء:</strong> {selectedPerson.children.length}</p>
          <button onClick={() => setSelectedPerson(null)}>إغلاق</button>
        </div>
      )}

      {showAddMember && (
        <AddMember
          onAddMember={handleAddMember}
          onClose={() => setShowAddMember(false)}
        />
      )}
    </div>
  )
}

export default FamilyTree
