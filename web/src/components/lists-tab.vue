<template>
  <va-accordion>
    <va-accordion-item
        v-for="list in lists"
        :key="list.id"
        :title="`${list.title}, ${list.access}`"
    >
      <va-editable-list :items="list.wishes"/>
    </va-accordion-item>
  </va-accordion>
</template>

<script>
import VaAccordion from "@/modules/va-lib/va-accordion";
import VaAccordionItem from "@/modules/va-lib/va-accordion-item";
import VaEditableList from "@/modules/va-lib/va-editable-list";
export default {
  name: "lists-tab",
  components: {VaEditableList, VaAccordionItem, VaAccordion},
  props: {
    lists: Array
  }
}
</script>

<style scoped>

</style>
