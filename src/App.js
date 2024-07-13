import { useState } from "react"
export default function App() {
  const [items, setItems] = useState([])
  function handelAddItem(newItem) {
    setItems((item) => [
      ...item,
      newItem
    ])
  }
  function handelDeleteItem(itemId) {
    setItems((items) => items.filter((item) => item.id !== itemId))
  }
  function isPacked(id) {
    setItems((items) => items.map((item) => (item.id === id ?
      {
        ...item,
        packed: !item.packed
      } : item
    )))
  }
  return (
    <div className="app">
      <Logo />
      <Form handelAddItem={handelAddItem} />
      <PackingList items={items} handelDeleteItem={handelDeleteItem} isPacked={isPacked} />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return (<h1>🌴Far Away💼</h1>)
}
function Form({ handelAddItem }) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)
  const newItem = {
    id: Date.now(),
    quantity,
    description,
    packed: false
  }
  function handelSubmit(event) {
    event.preventDefault()
    if (description.trim()) {
      handelAddItem(newItem)
      setDescription("")
      setQuantity(1)
    } else return null
  }
  function handelChangeItem(event) {
    setDescription(event.target.value)
  }
  function handelChangeQuantity(event) {
    setQuantity(event.target.value)
  }
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
function PackingList({ items, handelDeleteItem, isPacked }) {
  return <div className="list">
    <ul>
      {items.map((item) => <Item key={item.id} item={item} handelDeleteItem={handelDeleteItem} isPacked={isPacked} />)}
    </ul>
  </div>
}
function Item({ item, isPacked, handelDeleteItem }) {
  return <li>
    <input type="checkbox" value={item.packed} onChange={() => isPacked(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => handelDeleteItem(item.id)}>❌</button>
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