import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function AttackScatterChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid />
        <XAxis dataKey="attack" name="Attack" />
        <YAxis dataKey="hp" name="HP" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default AttackScatterChart