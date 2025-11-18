const API_BASE = ''

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url =
        path.startsWith('http')
            ? path
            : `${API_BASE}${path}`

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP error ${res.status}`)
    }

    return res.json() as Promise<T>
}

export const http = {
    get<T>(path: string) {
        return request<T>(path)
    },
    post<T>(path: string, body?: unknown) {
        return request<T>(path, {
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        })
    }
}
