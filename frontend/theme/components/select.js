export const selectStyles = {
  components: {
    Select: {
      variants: {
        outlineNew: {
          field: {
            borderRadius: "4px",
            borderColor: "gray.400",
            borderWidth: 1,
          },
        },
      },
      defaultProps: {
        variant: "outlineNew",
      },
    },
  },
};
