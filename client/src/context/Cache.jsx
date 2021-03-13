import { createContext, useContext, useState, useRef, useEffect } from 'react'

class DefaultMap extends Map {
  constructor(f, entries) {
    super(entries)
    this.default = f
  }

  get(k) {
    if (this.has(k)) return super.get(k)
    else {
      const v = this.default(k)
      this.set(k, v)
      return v
    }
  }
}

export class CacheEntry {
  constructor(p) {
    this.awaiting = new Set()
    this.isPending = true
    p.then((v) => this.resolve(v))
  }

  use(f) {
    if (this.isPending) this.awaiting.add(f)
    else f(this.val)
  }

  resolve(val) {
    if (this.isPending) {
      this.isPending = false
      this.awaiting.forEach((f) => f(val))
      this.val = val
    }
  }
}

const cacheContext = createContext()

export const CacheProvider = ({ children, resolve }) => {
  const store = useRef(new DefaultMap((k) => new CacheEntry(resolve(k))))

  return <cacheContext.Provider value={store}>{children}</cacheContext.Provider>
}

export const useCache = (ids) => {
  const cache = useContext(cacheContext)
  const [resolved, setResolved] = useState({})
  useEffect(() => {
    ids.forEach((id) =>
      cache.current.get(id).use((val) =>
        setResolved((old) => {
          if (old.id === val) return old
          return { ...old, [id]: val }
        })
      )
    )
  }, [ids, cache])
  return resolved
}
