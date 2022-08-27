import { useRef } from 'react'
import { useEffect, useState } from 'react'

const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  // Use useRef to wrap an object/array argument wich is a useEffect dependency
  const options = useRef(_options).current

  useEffect(() => {
    console.log(options)
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)
      
      try {
        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const json = await response.json()
        
        setIsPending(false)
        setData(json)
        setError(null)
      } catch (error) {
        setIsPending(false)

        if (error?.name === "AbortError") {
          console.log('The fetch was aborted')
        } else {
          setError('Could not fetch the data')
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url, options]);

  return { data, isPending, error }
}

export { useFetch }