type CustomDate = string | number | Date

export const formatToIsoDate = (date: CustomDate) => new Date(date).toISOString().split('T')[0]
export const formatToIsoDateAndTime = (date: CustomDate) => new Date(date).toISOString().split('T')[0] + ' at ' + new Date(date).toISOString().split('T')[1].substring(0, 5)
