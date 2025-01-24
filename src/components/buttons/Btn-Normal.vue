<template>
  <button :class="btnClass" :type="btnType">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BtnNormal",
  props: ["type", "class"],
  setup(props) {
    const defaultClass = "btn btn-outline-secondary";
    const btnType = props.type ? props.type : "button";
    const btnClass = props.class
      ? defaultClass + " " + props.class
      : defaultClass;

    return {
      btnType,
      btnClass
    };
  }
};
</script>

<style></style>
