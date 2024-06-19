interface Example {}

const getPath = () => '/example'

async function getExample (...restParams: Array<object>): Promise<Example> {
  const { data, pending, error, refresh } = await useApi(getPath(), {
    ...restParams
  })

  return { data, pending, error, refresh }
}

export default {
  getExample
}
