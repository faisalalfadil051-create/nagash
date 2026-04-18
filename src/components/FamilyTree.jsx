import { useState } from 'react'
import './FamilyTree.css'
import AddMember from './AddMember'

function FamilyTree() {
  const [familyData, setFamilyData] = useState({
    name: 'محمد أحمد',
    generation: 1,
    image: null,
    children: [
      {
        name: 'أحمد محمد',
        generation: 2,
        image: null,
        children: [
          { name: 'علي أحمد', generation: 3, image: null, children: [] },
          { name: 'فاطمة أحمد', generation: 3, image: null, children: [] }
        ]
      },
      {
        name: 'خالد محمد',
        generation: 2,
        image: null,
        children: [
          { name: 'سارة خالد', generation: 3, image: null, children: [] }
        ]
      }
    ]
  })

  const [selectedPerson, setSelectedPerson] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showAddMember, setShowAddMember] = useState(false)

  const searchInTree = (person, term) => {
    let results = []
    if (person.name.includes(term)) {
      results.push(person)
    }
    person.children.forEach(child => {
      results = results.concat(searchInTree(child, term))
    })
    return results
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

  const handleAddMember = (memberData) => {
    const newMember = {
      name: memberData.name,
      generation: 3,
      image: memberData.image,
      age: memberData.age,
      phone: memberData.phone,
      email: memberData.email,
      relation: memberData.relation,
      children: []
    }

    setFamilyData({
      ...familyData,
      children: [...familyData.children, newMember]
    })
    setShowAddMember(false)
  }

  const renderPerson = (person) => (
    <div key={person.name} className="person-node">
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
      {person.children.length > 0 && (
        <div className="children-container">
          {person.children.map(child => renderPerson(child))}
        </div>
      )}
    </div>
  )

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
        {renderPerson(familyData)}
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
