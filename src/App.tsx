import { useState } from 'react'

interface ICountry {
  label: string;
  checked: boolean;
  trigger?: boolean;
}

function App() {
  const [countries, setCountries] = useState<ICountry[]>([
    { label: 'Select All', checked: false, trigger: true },
    { label: 'India', checked: false },
    { label: 'USA', checked: false },
    { label: 'France', checked: false },
  ])

  const handleTriggerAll = (checked: boolean) => {
    const updateCountries = countries.map(country => {
      country.checked = checked
      return country
    })
    setCountries(updateCountries)
  }

  const handleCheckCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const index = parseInt(value)

    if (!countries[index].trigger) {
      const updateCountries = [...countries]
      updateCountries[index].checked = checked
      updateCountries[0].checked = updateCountries.filter(country => !country.trigger).every(country => country.checked === checked && checked !== false)
      setCountries(updateCountries)
    } else {
      handleTriggerAll(checked)
    }
  }

  return (
    <div className='mx-2 my-2'>
      {
        countries.map(
          (country, index) =>
            <div key={`checkbox-${index}-${country.label}`} className="form-check">
              <input className="form-check-input" id={`inputcheck-${index}-${country.label}`} type="checkbox" value={index} checked={country.checked} onChange={handleCheckCountry} />
              <label className="form-check-label" htmlFor={`inputcheck-${index}-${country.label}`}>
                {country.label}
              </label>
            </div>
        )
      }
    </div>
  )
}

export default App
