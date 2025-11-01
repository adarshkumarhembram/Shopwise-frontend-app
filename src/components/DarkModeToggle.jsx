import React, { useEffect, useState } from 'react'


export default function DarkModeToggle() {
const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))
useEffect(() => {
if (dark) document.documentElement.classList.add('dark')
else document.documentElement.classList.remove('dark')
}, [dark])
return (
<button onClick={() => setDark((d) => !d)} className="p-2 rounded border">
{dark ? '🌙' : '☀️'}
</button>
)
}