export async function getAllCountry() {
    const resp = await fetch("/api/v1/country/all")
    return resp.json()
}

export async function getSpecificCountry(id) {
    const resp = await fetch(`/api/v1/country/id/${id}`)
    return resp.json()
}