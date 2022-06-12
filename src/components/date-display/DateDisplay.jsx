import React, {useEffect, useState} from 'react'
const months = [
  'Jan.',
  'Feb.',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Jul.',
  'Août',
  'Sep.',
  'Oct.',
  'Nov.',
  'Dec.'
]
const days = [
  'Dim.',
  'Lun.', 
  'Mar.',
  'Mer.', 
  'Jeu.', 
  'Ven.', 
  'Sam.'
]
function DateDisplay({entry}) {
  const [formattedDate, setFormattedDate] = useState('')
  useEffect(() => {
    const date = new Date(entry);
    
    const year = date.getFullYear()

    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const dayIndex = date.getDay()
    const dayName = days[dayIndex]

    const day = date.getDate() 

    const dateAstring = `${dayName} ${day < 10 ? `0${day}`: day} ${monthName} ${year}`;
    setFormattedDate(dateAstring);
  }, [entry])
  return (
    <>
      {formattedDate}
    </>
  )
}

export default DateDisplay