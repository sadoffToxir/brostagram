<template>
  <Example
    data-test="example"
    title="Example"
    :items="8"
  >
    <template #default="{ item }">
      <v-img
        width="300"
        height="300"
        :src="`https://picsum.photos/id/${item+10}/300/300`"
      />
    </template>
  </Example>
</template>
