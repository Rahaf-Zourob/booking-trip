import { useState } from "react"
const initialItems = [
  {
    id: 1,
    description: "Passports",
    quantity: 2,
    packed: true
  },
  {
    id: 2,
    description: "socks",
    quantity: 12,
    packed: true
  },
]
export default function App() {
  const [items, setItems] = useState(initialItems)
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  function handelChangeItem(event) {
    setDescription(event.target.value)
  }
  function handelChangeQuantity(event) {
    setQuantity(event.target.value)
  }
  function handelAddItem() {
    setItems((item) => [
      ...item,
      {
        id: Date.now(),
        description,
        quantity,
        packed: false
      }
    ])
  }
  function handelSubmit(event) {
    event.preventDefault()
    if (description) {
      handelAddItem()
      setDescription("")
      setQuantity(1)
    } else return null
  }
  return (
    <div className="app">
      <Logo />
      <Form handelSubmit={handelSubmit} item={items} handelAddItem={handelAddItem} handelChangeItem={handelChangeItem} handelChangeQuantity={handelChangeQuantity} quantity={quantity} description={description} />
      <PackingList items={items} />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return (<h1>🌴Far Away💼</h1>)
}
function Form({ handelAddItem, item, handelSubmit, handelChangeQuantity, quantity, description, handelChangeItem }) {
  return (
    <form className="add-form" onSubmit={handelSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={handelChangeQuantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <input value={description} type="text" placeholder="Item..." onChange={handelChangeItem} />
      <button>Add</button>
    </form>
  )
}
function PackingList({ items }) {
  return <div className="list">
    <ul>
      {items.map((item) => <Item key={item.id} item={item} />)}
    </ul>
  </div>
}
function Item({ item }) {
  return <li>
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button>❌</button>
  </li>
}
function Stats({ items }) {
  const packedNum = items.filter((packed) => packed.packed).length
  return <footer className="stats">
    <em>
      💼You have {items.length} item in your list, and tou already packed {packedNum}
    </em>
  </footer>
}