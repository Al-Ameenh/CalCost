
import { useState } from 'react'
import './App.css'

type FoodEntry = {
  id: number
  food: string
  calories: number
  protein: number
  carbs: number
  fat: number
  cost: number
}

function App() {
  const [food, setFood] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [cost, setCost] = useState('')
  const [entries, setEntries] = useState<FoodEntry[]>([])

  const totalCalories = entries.reduce((sum, item) => sum + item.calories, 0)
  const totalProtein = entries.reduce((sum, item) => sum + item.protein, 0)
  const totalCarbs = entries.reduce((sum, item) => sum + item.carbs, 0)
  const totalFat = entries.reduce((sum, item) => sum + item.fat, 0)
  const totalCost = entries.reduce((sum, item) => sum + item.cost, 0)

  function addFood() {
    if (!food.trim() || !calories || !protein || !carbs || !fat || !cost) {
      return
    }

    const values = [calories, protein, carbs, fat, cost].map(Number)

    if (values.some(value => !Number.isFinite(value) || value < 0)) {
      return
    }

    setEntries([
      ...entries,
      {
        id: Date.now(),
        food: food.trim(),
        calories: Number(calories),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        cost: Number(cost),
      },
    ])

    setFood('')
    setCalories('')
    setProtein('')
    setCarbs('')
    setFat('')
    setCost('')
  }

  return (
    <main className="app">
      <header className="header">
        <h1>CalCost<span>.</span></h1>
        <p>Your nutrition. Your budget. One dashboard.</p>
      </header>

      <section className="summary">
        <div className="stat-card">
          <p>Calories consumed</p>
          <h2>{totalCalories.toLocaleString()} <small>kcal</small></h2>
        </div>

        <div className="stat-card">
          <p>Money spent</p>
          <h2>₹{totalCost.toLocaleString('en-IN')}</h2>
        </div>

        <div className="stat-card">
          <p>Food entries</p>
          <h2>{entries.length}</h2>
        </div>

        <div className="stat-card">
          <p>Protein consumed</p>
          <h2>{totalProtein.toFixed(1)} <small>g</small></h2>
        </div>

        <div className="stat-card">
          <p>Carbohydrates</p>
          <h2>{totalCarbs.toFixed(1)} <small>g</small></h2>
        </div>

        <div className="stat-card">
          <p>Fat consumed</p>
          <h2>{totalFat.toFixed(1)} <small>g</small></h2>
        </div>
      </section>

      <section className="food-form">
        <h2>Add your meal</h2>
        <p>Record your food and its nutritional information.</p>

        <input
          type="text"
          placeholder="Food name (e.g. Chicken biryani)"
          value={food}
          onChange={e => setFood(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Calories (kcal)"
          value={calories}
          onChange={e => setCalories(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Protein (g)"
          value={protein}
          onChange={e => setProtein(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Carbohydrates (g)"
          value={carbs}
          onChange={e => setCarbs(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Fat (g)"
          value={fat}
          onChange={e => setFat(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Cost (₹)"
          value={cost}
          onChange={e => setCost(e.target.value)}
        />

        <button onClick={addFood}>+ Add food</button>
      </section>

      <section className="food-list">
        <h2>Today's food log</h2>

        {entries.length === 0 ? (
          <p className="empty">No meals recorded yet. Add your first meal!</p>
        ) : (
          entries.map(item => (
            <div className="food-item" key={item.id}>
              <div>
                <strong>{item.food}</strong>
                <p>
                  {item.calories} kcal · P: {item.protein}g ·
                  C: {item.carbs}g · F: {item.fat}g
                </p>
              </div>
              <strong>₹{item.cost.toLocaleString('en-IN')}</strong>
            </div>
          ))
        )}
      </section>

      <footer>
        <p>CalCost — Eat smart. Spend smart.</p>
      </footer>
    </main>
  )
}

export default App

