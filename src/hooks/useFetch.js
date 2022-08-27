import { useEffect, useState } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url)
      const json = await response.json()
      
      setData(json)
    }

    fetchData()
  }, [url]);

  return { data }
}

export { useFetch }